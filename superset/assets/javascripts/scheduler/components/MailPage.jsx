const $ = window.$ = require('jquery');
import React from 'react';

const propTypes = {
  form_data: React.PropTypes.object.isRequired,
};

export default class MailPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.form_data.mail,
    };
    if (this.props.form_data.mail === null) {
      this.state.mail = {
        smtp_server: null,
        port: null,
        send_name: null,
        send_address: null,
        username: null,
        password: null,
      };
    }
    // console.log(this.state.mail);
  }

  testMail(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/superset/testMail',
      data: {
        'server': $('#server').val(),
        'port': $('#port').val(),
        'sendName': $('#sendName').val(),
        'sendAddress': $('#sendAddress').val(),
        'username': $('#username').val(),
        'password': $('#password').val(),
      },
      dataType: 'json',
      success: function (data) {
        if (data) {
          alert('connect success')
        } else {
          alert('connect failed');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }

  modifyMail(e) {
    e.preventDefault();
    let operate = 'modify';
    if (this.props.form_data.mail === null) {
      operate = 'add';
    }
    const thisState = this;
    $.ajax({
      type: 'POST',
      url: '/superset/myEmail/' + operate,
      data: {
        'id': thisState.state.mail.id,
        'server': $('#server').val(),
        'port': $('#port').val(),
        'sendName': $('#sendName').val(),
        'sendAddress': $('#sendAddress').val(),
        'username': $('#username').val(),
        'password': $('#password').val(),
      },
      dataType: 'json',
      success: function (data) {
        if (data.status === 'true') {
          alert('operate success!');
          if (operate === 'add') {
            location.href = '/superset/myEmail/show';
          }
        } else {
          alert('operate failed');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }

  render() {
    return (
      <div className="addDiv">
        <form onSubmit={this.modifyMail.bind(this)}>
          <fieldset>
            <legend>邮箱设置</legend>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">SMTP服务器:</div>
              <div className="col-lg-8">
                <input
                  id="server"
                  type="text"
                  defaultValue={this.state.mail.smtp_server}
                  required
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">端口:</div>
              <div className="col-lg-8">
                <input id="port" type="number" defaultValue={this.state.mail.port} required />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">发件人名称:</div>
              <div className="col-lg-8">
                <input
                  id="sendName"
                  type="text"
                  defaultValue={this.state.mail.send_name}
                  required
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">发件人地址:</div>
              <div className="col-lg-8">
                <input
                  id="sendAddress"
                  type="email"
                  defaultValue={this.state.mail.send_address}
                  required
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">用户名:</div>
              <div className="col-lg-8">
                <input
                  id="username"
                  type="text"
                  defaultValue={this.state.mail.username}
                  required
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">口令:</div>
              <div className="col-lg-8">
                <input
                  id="password"
                  type="password"
                  defaultValue={this.state.mail.password}
                  required
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div style={{ float: 'left' }}>
                <button
                  className="btn btn-success"
                  onClick={this.testMail.bind(this)}
                  style={{ marginLeft: '120px' }}
                >
                  测试连接
                </button>
              </div>
              <div>
                <button className="btn btn-primary" type="submit">修改</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

MailPage.propTypes = propTypes;
