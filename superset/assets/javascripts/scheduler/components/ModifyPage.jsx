const $ = window.$ = require('jquery');
import React from 'react';
import Select from 'react-select';

const propTypes = {
  form_data: React.PropTypes.object.isRequired,
};

export default class ModifyPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      scheduler: this.props.form_data.scheduler,
      // set condition
      dashboards: this.props.form_data.dashboards,
      slices: null,
      metrics: null,
      dashboard: this.props.form_data.condition.dashboard_id,
      slice: this.props.form_data.condition.slice_id,
      metric: this.props.form_data.condition.metric,
      expr: '',
      sendSlices: this.props.form_data.slices,
      sendSlice: this.props.form_data.condition.send_slice_id,
      schedulerDisabled: false,
    };
    // init slices and metrics
    this.state.dashboards.forEach(d => {
      if (d.id === this.props.form_data.condition.dashboard_id) {
        this.state.slices = d.slices;
        return false;
      }
    });

    this.state.slices.forEach(s => {
      if (s.id === this.props.form_data.condition.slice_id) {
        this.state.metrics = s.metrics.split(',');
      }
    });

    // parse cron expr
    const scheduler = props.form_data.scheduler;
    if (scheduler.mode === 'interval') {
      this.state.expr += scheduler.interval_expr + ' && ';
      if (scheduler.start_date != null) {
        this.state.expr += "start_date='" + scheduler.start_date + "' && ";
      }
      if (scheduler.end_date != null) {
        this.state.expr += "end_date='" + scheduler.end_date + "' && ";
      }
    } else if (scheduler.mode === 'date') {
      this.state.expr += "run_date='" + scheduler.date_run_date + "' && ";
    } else {
      // parse cron
      if (scheduler.cron_year != null) {
        this.state.expr += "year='" + scheduler.cron_year + "' && ";
      }
      if (scheduler.cron_month != null) {
        this.state.expr += "month='" + scheduler.cron_month + "' && ";
      }
      if (scheduler.cron_day != null) {
        this.state.expr += "day='" + scheduler.cron_day + "' && ";
      }
      if (scheduler.cron_week != null) {
        this.state.expr += "week='" + scheduler.cron_week + "' && ";
      }
      if (scheduler.cron_day_of_week != null) {
        this.state.expr += "day_of_week='" + scheduler.cron_day_of_week + "' && ";
      }
      if (scheduler.cron_hour != null) {
        this.state.expr += "hour='" + scheduler.cron_hour + "' && ";
      }
      if (scheduler.cron_minute != null) {
        this.state.expr += "minute='" + scheduler.cron_minute + "' && ";
      }
      if (scheduler.cron_second != null) {
        this.state.expr += "second='" + scheduler.cron_second + "' && ";
      }
      if (scheduler.start_date != null) {
        this.state.expr += "start_date='" + scheduler.start_date + "' && ";
      }
      if (scheduler.end_date != null) {
        this.state.expr += "end_date='" + scheduler.end_date + "' && ";
      }
    }
    this.state.expr = this.state.expr.substring(0, this.state.expr.length - 4);
  }

  modifyScheduler(e) {
    e.preventDefault();
    const thisState = this;
    $.ajax({
      type: 'POST',
      url: '/superset/insertOrModifyScheduler/modify',
      data: {
        'id': thisState.state.scheduler.id,
        'mode': $('#mode').val(),
        'expr': $('#expr').val(),
      },
      dataType: 'json',
      success: function (data) {
        if (data.status === 'true') {
          alert('modify success!');
        } else {
          alert('modify failed');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }

  modifyCondition(e) {
    e.preventDefault();
    const thisState = this;
    $.ajax({
      type: 'POST',
      url: '/superset/insertOrModifyCondition/modify',
      data: {
        'id': thisState.props.form_data.condition.id,
        'dashboardId': thisState.state.dashboard,
        'sliceId':  thisState.state.slice,
        'metric': thisState.state.metric,
        'expr': $('#conditionExpr').val(),
        'receiveAddress': $('#receiveAddress').val(),
        'sendSliceId': this.state.sendSlice,
      },
      dataType: 'json',
      success: function (data) {
        if (data.status === 'true') {
          alert('modify success!');
        } else {
          alert('modify failed');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }

  changeDashboard(event) {
    this.setState({ dashboard: event.value });
    this.props.form_data.dashboards.forEach(d => {
      if (d.id === event.value) {
        this.setState({
          slices: d.slices,
          slice: d.slices[0].id,
          metrics: d.slices[0].metrics.split(','),
          metric: d.slices[0].metrics.split(',')[0],
        });
        return false;
      }
    });
  }

  changeSlice(event) {
    this.setState({ slice: event.value });
    this.state.slices.forEach(s => {
      if (s.id === event.value) {
        this.setState({
          metrics: s.metrics.split(','),
          metric: s.metrics.split(',')[0],
        });
        return false;
      }
    });
  }

  changeMetric(event) {
    this.setState({ metric: event.value });
  }

  changeSendSlice(event) {
    this.setState({ sendSlice: event.value });
  }

  componentDidMount() {
    if (this.state.scheduler.is_active) {
      $('#schedulerField').attr('disabled', 'disabled');
    }
  }

  back() {
    location.href = '/superset/mySchedulers/list/1';
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          style={{ marginLeft: '50px' }}
          onClick={this.back.bind(this)}
        >
          返回
        </button>
        <div className="addDiv">
          <form onSubmit={this.modifyScheduler.bind(this)} >
            <fieldset id="schedulerField">
              <legend>调度设置</legend>
              <div className="col-lg-12">
                <div className="col-lg-4 text-right">选择调度方式:</div>
                <div className="col-lg-8">
                  <select id="mode" defaultValue={this.props.form_data.scheduler.mode}>
                    <option>interval</option>
                    <option>cron</option>
                    <option>date</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12" style={{ height: '120px' }}>
                <div className="col-lg-4 text-right">调度表达式:</div>
                <div className="col-lg-8">
                  <textarea id="expr" defaultValue={this.state.expr} cols="15" rows="4" required>
                  </textarea>
                </div>
              </div>
              <div className="col-lg-12" style={{ height: '80px' }}>
                <p style={{ marginLeft: '35px' }}>
                  注: 时间用 'YYYY-MM-DD hh:mm:ss'' 或者 'YYYY-MM-DD' 字符串表示, 多个条件用&&连接
                </p>
                <a
                  style={{ marginLeft: '200px' }}
                  target="_blank"
                  href="http://debugo.com/apscheduler/"
                >
                  cron表达式详情链接
                </a>
              </div>
              <div className="col-lg-12">
                <button className="btn btn-primary" type="submit">修改</button>
              </div>
            </fieldset>
          </form>

          <form onSubmit={this.modifyCondition.bind(this)}>
            <fieldset style={{ width: '600px' }}>
              <legend>条件设置</legend>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">监测仪表盘:</div>
                <div className="col-lg-9">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder="选择仪表盘"
                    options={this.state.dashboards.map((m) => ({ value: m.id, label: m.name }))}
                    value={this.state.dashboard}
                    autosize={false}
                    onChange={this.changeDashboard.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">监测切片:</div>
                <div className="col-lg-9">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder="选择切片"
                    options={this.state.slices.map((m) => ({ value: m.id, label: m.name }))}
                    value={this.state.slice}
                    autosize={false}
                    onChange={this.changeSlice.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">监测指标:</div>
                <div className="col-lg-9">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder="选择指标"
                    options={this.state.metrics.map((m) => ({ value: m, label: m }))}
                    value={this.state.metric}
                    autosize={false}
                    onChange={this.changeMetric.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">指定表达式:</div>
                <div className="col-lg-9">
                  <input
                    id="conditionExpr"
                    defaultValue={this.props.form_data.condition.expr}
                    type="text"
                    required
                    style={{ width: '413px' }}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">邮件发送切片:</div>
                <div className="col-lg-9">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder="选择发送切片"
                    options={this.state.sendSlices.map((m) => ({ value: m.id, label: m.name }))}
                    value={this.state.sendSlice}
                    autosize={false}
                    onChange={this.changeSendSlice.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-3 text-right">收件人地址:</div>
                <div className="col-lg-9">
                  <input
                    id="receiveAddress"
                    defaultValue={this.props.form_data.condition.receive_address}
                    type="text"
                    required
                    style={{ width: '413px' }}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button style={{ marginRight: '10px' }} className="btn btn-primary" type="submit">
                  修改
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

ModifyPage.propTypes = propTypes;
