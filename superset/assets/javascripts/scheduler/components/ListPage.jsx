const $ = window.$ = require('jquery');
import React from 'react';
import { chooseMessage } from '../../explorev2/stores/language';
import zh_CN from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';

const localMessage = chooseMessage();

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
          alert(localMessage.done_success);
          location.href = '/superset/mySchedulers/list/1';
        } else {
          alert(localMessage.done_fail);
        }
      },
      error: function () {
        alert(localMessage.unknown_error);
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
          <td>{localMessage[s.mode]}</td>
          <td>{thisState.parseExpr(s)}</td>
          <td>{s.start_date}</td>
          <td>{s.end_date}</td>
          <td>
            {flag1 && localMessage.yes}
            {flag2 && localMessage.closed}
            {s.isActive !== true &&
              <button
                className="btn btn-success"
                onClick={thisState.operateJob.bind(this, s.id, 'add')}
              >
                {localMessage.activation}
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
                  {localMessage.stop}
                </button>
                <button
                  className="btn btn-success"
                  disabled="disabled"
                  style={{ marginLeft: '20px' }}
                >
                  {localMessage.start_up}
                </button>
              </div>
            }
            {(s.isRunning !== true && flag1) &&
              <div>
                <button className="btn btn-danger" disabled="disabled">
                {localMessage.stop}
                </button>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: '20px' }}
                  onClick={thisState.operateJob.bind(this, s.id, 'resume')}
                >
                  {localMessage.start_up}
                </button>
              </div>
            }
            {(s.isActive !== true || flag2) &&
              <div>
                <button className="btn btn-danger" disabled="disabled">
                  {localMessage.stop}
                </button>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: '20px' }}
                  disabled="disabled"
                >
                  {localMessage.start_up}
                </button>
              </div>
            }
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={thisState.modifyScheduler.bind(this, s.id)}
            >
              {localMessage.modify}
            </button>
            <button
              className="btn btn-danger"
              style={{ marginLeft: '20px' }}
              onClick={thisState.operateJob.bind(this, s.id, 'delete')}
            >
              {localMessage.delete}
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
          {localMessage.add_schedule}
        </button>
        <table className="table table-striped" style={{ width: '95%' }}>
          <thead>
            <tr>
              <th>{localMessage.serial_number}</th>
              <th>{localMessage.scheduling_method}</th>
              <th>{localMessage.schedule_expression}</th>
              <th>{localMessage.start_time}</th>
              <th>{localMessage.end_time}</th>
              <th>{localMessage.is_active}</th>
              <th>{localMessage.status}</th>
              <th>{localMessage.actions}</th>
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
