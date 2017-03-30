const $ = window.$ = require('jquery');
import React from 'react';
import Select from 'react-select';

require('../app.css');

const propTypes = {
  form_data: React.PropTypes.object.isRequired,
};

export default class AddPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      schedulerDisabled: false,
      conditionDisabled: true,
      schedulerId: null,
      // set condition
      dashboards: this.props.form_data.dashboards,
      slices: this.props.form_data.dashboards[0].slices,
      metrics: this.props.form_data.dashboards[0].slices[0].metrics.split(','),
      dashboard: this.props.form_data.dashboards[0].id,
      slice: this.props.form_data.dashboards[0].slices[0].id,
      metric: this.props.form_data.dashboards[0].slices[0].metrics.split(',')[0],
      sendSlices: this.props.form_data.slices,
      sendSlice: this.props.form_data.slices[0].id,
    };
  }

  submitScheduler(e) {
    e.preventDefault();
    const thisState = this;
    $.ajax({
      type: 'POST',
      url: '/superset/insertOrModifyScheduler/insert',
      data: {
        'mode': $('#mode').val(),
        'expr': $('#expr').val(),
      },
      dataType: 'json',
      success: function (data) {
        if (data.status === 'true') {
          alert('save success!');
          thisState.setState({
            schedulerDisabled: true,
            conditionDisabled: false,
            schedulerId: data.schedulerId,
          });
        } else {
          alert('save failed');
        }
      },
      error: function () {
        alert('unknown error');
      },
    });
  }

  submitCondition(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/superset/insertOrModifyCondition/insert',
      data: {
        'schedulerId': this.state.schedulerId,
        'dashboardId': this.state.dashboard,
        'sliceId': this.state.slice,
        'metric': this.state.metric,
        'expr': $('#conditionExpr').val(),
        'receiveAddress': $('#receiveAddress').val(),
        'sendSliceId': this.state.sendSlice,
      },
      dataType: 'json',
      success: function (data) {
        if (data.status === 'true') {
          alert('save success!');
          location.href = '/superset/mySchedulers/list/1';
        } else {
          alert('save failed');
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

  render() {
    if (this.state.schedulerDisabled) {
      $('#schedulerFieldSet').attr('disabled', 'disabled');
    } else {
      $('#schedulerFieldSet').removeAttr('disabled');
    }

    if (this.state.conditionDisabled) {
      $('#conditionFieldSet').attr('disabled', 'disabled');
    } else {
      $('#conditionFieldSet').removeAttr('disabled');
    }

    return (
      <div className="addDiv">
        <form onSubmit={this.submitScheduler.bind(this)}>
          <fieldset id="schedulerFieldSet">
            <legend>调度设置</legend>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">选择调度方式:</div>
              <div className="col-lg-8">
                <select id="mode">
                  <option selected>interval</option>
                  <option>cron</option>
                  <option>date</option>
                </select>
              </div>
            </div>
            <div className="col-lg-12" style={{ height: '120px' }}>
              <div className="col-lg-4 text-right">调度表达式:</div>
              <div className="col-lg-8">
                <textarea id="expr" cols="15" rows="4" required></textarea>
              </div>
            </div>
            <div className="col-lg-12" style={{ height: '80px' }}>
              <p style={{ marginLeft: '35px' }}>
                注: 时间用 'YYYY-MM-DD hh:mm:ss'' 或者 'YYYY-MM-DD' 字符串表示, 多个条件用&&连接
              </p>
              <a
                style={{ marginLeft: '200px' }}
                target="_blank" href="http://debugo.com/apscheduler/"
              >
                cron表达式详情链接
              </a>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary" type="submit">保存</button>
            </div>
          </fieldset>
        </form>

        <form onSubmit={this.submitCondition.bind(this)}>
          <fieldset id="conditionFieldSet" disabled style={{ width: '600px' }}>
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
                  placeholder="选择监测切片"
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
                <input id="conditionExpr" type="text" required style={{ width: '413px' }} />
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
                <input id="receiveAddress" type="text" required style={{ width: '413px' }} />
              </div>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary" type="submit">保存</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddPage.propTypes = propTypes;
