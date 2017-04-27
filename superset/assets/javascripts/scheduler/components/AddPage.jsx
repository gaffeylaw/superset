const $ = window.$ = require('jquery');
import React from 'react';
import Select from 'react-select';
import { chooseMessage } from '../../explorev2/stores/language';
import zh_CN from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';

const localMessage = chooseMessage();

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
          alert(localMessage.save_success);
          thisState.setState({
            schedulerDisabled: true,
            conditionDisabled: false,
            schedulerId: data.schedulerId,
          });
        } else {
          alert(localMessage.save_failed);
        }
      },
      error: function () {
        alert(localMessage.unknown_error);
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
          alert(localMessage.save_success);
          location.href = '/superset/mySchedulers/list/1';
        } else {
          alert(localMessage.save_failed);
        }
      },
      error: function () {
        alert(localMessage.unknown_error);
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
            <legend>{localMessage.schedule_settings}</legend>
            <div className="col-lg-12">
              <div className="col-lg-4 text-right">{localMessage.select_scheduling}:
              </div>
              <div className="col-lg-8">
                <select id="mode">
                  <option selected value="interval">{localMessage.interval}</option>
                  <option value="cron">{localMessage.cron}</option>
                  <option value="date">{localMessage.date}</option>
                </select>
              </div>
            </div>
            <div className="col-lg-12" style={{ height: '120px' }}>
              <div className="col-lg-4 text-right">{localMessage.schedule_expression}:
              </div>
              <div className="col-lg-8">
                <textarea id="expr" cols="15" rows="4" required></textarea>
              </div>
            </div>
            <div className="col-lg-12" style={{ height: '80px' }}>
              <p style={{ marginLeft: '35px' }}>
                {localMessage.schedule_tooltip}
              </p>
              <a
                style={{ marginLeft: '200px' }}
                target="_blank" href="http://debugo.com/apscheduler/"
                >
                {localMessage.cron_help_href}
              </a>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary" type="submit">{localMessage.save}
              </button>
            </div>
          </fieldset>
        </form>

        <form onSubmit={this.submitCondition.bind(this)}>
          <fieldset id="conditionFieldSet" disabled style={{ width: '600px' }}>
            <legend>{localMessage.condition_setting}</legend>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.monitor_dashboard}:
              </div>
              <div className="col-lg-9">
                <Select
                  multi={false}
                  name="select-column"
                  placeholder={localMessage.choose_dash}
                  options={this.state.dashboards.map((m) => ({ value: m.id, label: m.name }))}
                  value={this.state.dashboard}
                  autosize={false}
                  onChange={this.changeDashboard.bind(this)}
                  />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.monitor_slice}:</div>
              <div className="col-lg-9">
                <Select
                  multi={false}
                  name="select-column"
                  placeholder={localMessage.choose_monitor_slice}
                  options={this.state.slices.map((m) => ({ value: m.id, label: m.name }))}
                  value={this.state.slice}
                  autosize={false}
                  onChange={this.changeSlice.bind(this)}
                  />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.monitor_metric}:</div>
              <div className="col-lg-9">
                <Select
                  multi={false}
                  name="select-column"
                  placeholder={localMessage.choose_metric}
                  options={this.state.metrics.map((m) => ({ value: m, label: m }))}
                  value={this.state.metric}
                  autosize={false}
                  onChange={this.changeMetric.bind(this)}
                  />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.specifies_expression}:
              </div>
              <div className="col-lg-9">
                <input id="conditionExpr" type="text" required style={{ width: '413px' }} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.mail_send_slice}:</div>
              <div className="col-lg-9">
                <Select
                  multi={false}
                  name="select-column"
                  placeholder={localMessage.choose_send_slice}
                  options={this.state.sendSlices.map((m) => ({ value: m.id, label: m.name }))}
                  value={this.state.sendSlice}
                  autosize={false}
                  onChange={this.changeSendSlice.bind(this)}
                  />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="col-lg-3 text-right">{localMessage.receiver_address}:
              </div>
              <div className="col-lg-9">
                <input id="receiveAddress" type="text" required style={{ width: '413px' }} />
              </div>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary" type="submit">{localMessage.save}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddPage.propTypes = propTypes;
