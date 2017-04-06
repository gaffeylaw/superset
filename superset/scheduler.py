from superset import app
from superset import db, models
from flask import request, g

scheduler = app.config.get('scheduler')


class Scheduler:

    "use to start, resume, add, pause job"

    def start():
        s = app.config.get('scheduler')
        try:
            s.start()
        except Exception:
            print('the scheduler has started...')

    def add(id):
        if scheduler.get_job('job' + str(id)) is None:
            s = db.session.query(models.Scheduler).filter_by(id=id).one()
            userId = g.user.get_id()
            cookies = request.cookies
            from superset.mail import Mail
            if s.mode == 'date':
                scheduler.add_job(Mail.findSliceException, 'date', run_date=s.date_run_date, args=[s, cookies, userId], id='job' + str(id))
            elif s.mode == 'interval':
                key = s.interval_expr.split('=')[0].strip()
                value = int(s.interval_expr.split('=')[1].strip())
                if key == 'weeks':
                    scheduler.add_job(Mail.findSliceException, 'interval', weeks=value, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))
                elif key == 'days':
                    scheduler.add_job(Mail.findSliceException, 'interval', days=value, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))
                elif key == 'hours':
                    scheduler.add_job(Mail.findSliceException, 'interval', hours=value, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))
                elif key == 'minutes':
                    scheduler.add_job(Mail.findSliceException, 'interval', minutes=value, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))
                elif key == 'seconds':
                    scheduler.add_job(Mail.findSliceException, 'interval', seconds=value, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))
            elif s.mode == 'cron':
                scheduler.add_job(Mail.findSliceException, 'cron',  year=s.cron_year, month=s.cron_month, day=s.cron_day, week=s.cron_week, day_of_week=s.cron_day_of_week,
                        hour=s.cron_hour, minute=s.cron_minute, second=s.cron_second, start_date=s.start_date, end_date=s.end_date, args=[s, cookies, userId], id='job' + str(id))

    def delete(id):
        scheduler.remove_job('job' + str(id))

    def resume(id):
        scheduler.resume_job('job' + str(id))

    def pause(id):
        scheduler.pause_job('job' + str(id))