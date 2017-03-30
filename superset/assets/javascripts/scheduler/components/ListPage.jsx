const $ = window.$ = require('jquery');
import React from 'react';

const propTypes = {
  form_data: React.PropTypes.object.isRequired,
};

export default class ListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  parseExpr(s) {
    if (s.mode === 'interval') {
      return s.interval_expr;
    } else if (s.mode === 'date') {
      return "run_time='" + s.date_run_date + "'";
    }
    // cron
    let str = '';
    if (s.cron_year != null) {
      str += "cron_year='" + s.cron_year + "',";
    }
    if (s.cron_month != null) {
      str += "cron_month='" + s.cron_month + "',";
    }
    if (s.cron_day != null) {
      str += "cron_day='" + s.cron_day + "',";
    }
    if (s.cron_week != null) {
      str += "cron_week='" + s.cron_week + "',";
    }
    if (s.cron_day_of_week != null) {
      str += "cron_day_of_week='" + s.cron_day_of_week + "',";
    }
    if (s.cron_hour != null) {
      str += "cron_hour='" + s.cron_hour + "',";
    }
    if (s.cron_minute != null) {
      str += "cron_minute='" + s.cron_minute + "',";
    }
    if (s.cron_second != null) {
      str += "cron_second='" + s.cron_second + "',";
    }
    return str.substring(0, str.length - 1);
  }

  addScheduler() {
    location.href = '/superset/mySchedulers/add/1';
  }

  modifyScheduler(id) {
    location.href = '/superset/mySchedulers/modify/' + id;
  }

  operateJob(id, operate) {
    // alert(id + '    ' + operate);
    $.ajax({
      type: 'get',
      url: '/superset/job/' + operate + '/' + id,
      dataType: 'json',
      success: function (data) {
        if (data) {
          alert('操作成功');
          location.href = '/superset/mySchedulers/list/1';
        } else {
          alert('操作失败');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }


  render() {
    const bodyDiv = [];
    const thisState = this;
    this.props.form_data.schedulers.forEach(function (s, index) {
      const timeStamp = Date.parse(s.date_run_date);
      const now = new Date().getTime();
      // active and valid
      const flag1 = (s.isActive === true &&
        (s.mode !== 'date' || (s.mode === 'date' && timeStamp > now))) ? true : false;
      // active but invalid
      const flag2 = (s.isActive === true && (s.mode === 'date' && timeStamp < now)) ? true : false;
      bodyDiv.push(
        <tr>
          <td>{index + 1}</td>
          <td>{s.mode}</td>
          <td>{thisState.parseExpr(s)}</td>
          <td>{s.start_date}</td>
          <td>{s.end_date}</td>
          <td>
            {flag1 && '是'}
            {flag2 && '已关闭'}
            {s.isActive !== true &&
              <button
                className="btn btn-success"
                onClick={thisState.operateJob.bind(this, s.id, 'add')}
              >
                激活
              </button>
            }
          </td>
          <td>
            {(s.isRunning === true && flag1) &&
              <div>
                <button
                  className="btn btn-danger"
                  onClick={thisState.operateJob.bind(this, s.id, 'pause')}
                >
                  停止
                </button>
                <button
                  className="btn btn-success"
                  disabled="disabled"
                  style={{ marginLeft: '20px' }}
                >
                  启动
                </button>
              </div>
            }
            {(s.isRunning !== true && flag1) &&
              <div>
                <button className="btn btn-danger" disabled="disabled">停止</button>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: '20px' }}
                  onClick={thisState.operateJob.bind(this, s.id, 'resume')}
                >
                  启动
                </button>
              </div>
            }
            {(s.isActive !== true || flag2) &&
              <div>
                <button className="btn btn-danger" disabled="disabled">
                  停止
                </button>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: '20px' }}
                  disabled="disabled"
                >
                  启动
                </button>
              </div>
            }
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={thisState.modifyScheduler.bind(this, s.id)}
            >
              修改
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: '20px' }}
              onClick={thisState.operateJob.bind(this, s.id, 'delete')}
            >
              删除
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <button
          className="btn btn-success"
          style={{ marginLeft: '50px' }}
          onClick={this.addScheduler.bind(this)}
        >
          添加调度
        </button>
        <table className="table table-striped" style={{ width: '95%' }}>
          <thead>
            <tr>
              <th>序号</th>
              <th>调度方式</th>
              <th>调度表达式</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>是否激活</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {bodyDiv}
          </tbody>
        </table>
      </div>
    );
  }
}

ListPage.propTypes = propTypes;
