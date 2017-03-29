from superset import app, db, models
from flask_mail import Mail as FMail, Message
import dryscrape
from bs4 import BeautifulSoup
import json, datetime, time, cairosvg, base64, os

class Mail:

    def findSliceException(scheduler, cookies, userId):
        print('====== monitor slice =====')
        mail = db.session.query(models.Mail).filter_by(user_id=userId).one()
        condition = db.session.query(models.Condition).filter_by(warn_scheduler_id=scheduler.id).one()
        # get monitor slice json data
        monitorSlc = db.session.query(models.Slice).filter_by(id=condition.slice_id).one()
        monitorViz = json.loads(monitorSlc.get_viz().get_json())
        # get send slice json data
        sendSlc = db.session.query(models.Slice).filter_by(id=condition.send_slice_id).one()
        sendViz = json.loads(sendSlc.get_viz().get_json())
        viz_type = sendViz['form_data']['viz_type']
        standalone_endpoint = sendViz['standalone_endpoint']
        # print(standalone_endpoint)
        records = monitorViz['json_data']['records']
        # print(records)
        for record in records:
            expr = condition.expr.replace('x', str(record[condition.metric]))
            if eval(expr):
                print('==============exception has occured=================')
                # get html content
                address = 'http://' + app.config.get('SERVER_ADDRESS') +':' +app.config.get('SERVER_PORT')
                cookie = 'session=' + cookies['session'] +';domain=localhost'
                pageContent = Mail.getPageContent(cookie, address, standalone_endpoint, viz_type)
                htmlName = str(time.time()) + '.html'
                # write pageContent to a html file
                f = open('/' + htmlName, 'w')
                f.write(pageContent)
                f.close()
                # send mail and write mail log
                print('======== send mail =======')
                f2 = open(app.config.get('SEND_MAIL_LOG'), 'a')
                timeStr = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                subject = "仪表盘切片监控异常——" + sendSlc.slice_name
                sender = mail.send_address
                receiver = condition.receive_address
                f2.writelines(timeStr + '    ' + '邮件主题：' + subject + '    ' + '由 ' + sender + ' 开始发送给 ' + receiver + '\n')
                f2.close()
                Mail.send(mail, pageContent, sendSlc.slice_name, receiver, htmlName)
                break

    def getPageContent(cookie, address, standalone_endpoint, viz_type):
        sess = dryscrape.Session(base_url = address)
        sess.set_cookie(cookie)
        # print(sess.cookies())
        sess.visit(standalone_endpoint)
        time.sleep(5)
        # capture screen as a png image
        # imageName = str(time.time()) + 'capture.png'
        # sess.render(imageName, 1700, 700)
        if viz_type == 'table' or viz_type == 'ag_grid' or viz_type == 'pivot_table':
            pageContent = sess.body()
            # set charset
            pageContent = pageContent.replace('<head>', '<head><meta charset="utf-8"/>')
            pageContent = pageContent.replace('<body>','<body><div style="margin-bottom: 20px;"><a target="_blank" href="' + (address + standalone_endpoint) + '">查看详情</a></div>')
        else:
            # make svg to img and make img to base64
            soup = BeautifulSoup(sess.body(), 'html.parser')
            svgContent = str(soup.svg)
            timestamp = str(time.time())
            cairosvg.svg2png(bytestring=svgContent, write_to= '/' +timestamp + '.png')
            f = open('/' + timestamp + '.png', 'rb')  
            img = str(base64.b64encode(f.read()))
            f.close()
            try:
                if os.path.exists('/' + timestamp + '.png'):
                    os.remove('/' + timestamp + '.png')
            except Exception as e:
                print(e)
            svgBs64 = img[2:len(img)-1]
            pageContent = '<html><head><meta charset="utf-8"/></head> \
                            <body><div><a target="_blank" href="' + (address + standalone_endpoint) + '">查看详情</a></div> \
                            <img style="width:1100px;" src="data:image/png;base64,' + svgBs64 + '" /></body></html>'
        return pageContent

    def send(mailInfo, pageContent, sliceName, receive_address, htmlName):
        app.config.update(
            #EMAIL SETTINGS
            MAIL_SERVER=mailInfo.smtp_server,
            MAIL_PORT=mailInfo.port,
            MAIL_USE_SSL=True,
            MAIL_USE_SMTP=True,
            MAIL_USERNAME = mailInfo.username,
            MAIL_PASSWORD = mailInfo.password
        )
        sender = mailInfo.send_address
        receiver = receive_address.split(',')
        mail = FMail(app)

        msg = Message(
            subject="仪表盘切片监控异常——" + sliceName,
            sender=sender,
            recipients=receiver
        )
        
        msg.html = pageContent
        with app.open_resource('/' + htmlName) as fp:
            msg.attach("slice.html", "text/html", fp.read())
        print(pageContent)

        with app.app_context():
            f2 = open(app.config.get('SEND_MAIL_LOG'), 'a')
            try:
                mail.send(msg)
                # delete html file
                if os.path.exists('/' + htmlName):
                    os.remove('/' + htmlName)
                print('====================== mail has sended ! ========================')
                timeStr = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")) 
                f2.writelines(timeStr + '    ' + '邮件发送成功\n\n')
            except Exception as e:
                f2.writelines(timeStr + '    ' + '邮件发送失败, 原因：' + e + '\n\n')
            f2.close()
