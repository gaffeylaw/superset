import React from 'react';
// import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from 'react-bootstrap';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  navigate: React.PropTypes.object.isRequired,
  slices: React.PropTypes.array.isRequired,
  dashboards: React.PropTypes.array.isRequired,
};

export default class Navigate extends React.Component {
  constructor(props) {
    super(props);
    const localeMessage = this.props.form_data.localeMessage;
    const navigateChoices = localeMessage.navigateChoices;
    const openChoices = localeMessage.openChoices;
    this.state = {
      openChoices,
      navigateChoices,
      localeMessage,
    };
  }
  changeMetric(navigate, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeNavigate(navigate, 'metric', val);
  }
  changeExpr(navigate, event) {
    this.props.actions.changeNavigate(navigate, 'expr', event.target.value);
  }
  changeWidth(navigate, event) {
    this.props.actions.changeNavigate(navigate, 'width', event.target.value);
  }
  changeHeight(navigate, event) {
    this.props.actions.changeNavigate(navigate, 'height', event.target.value);
  }
  changeSlice(navigate, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeNavigate(navigate, 'slice', val);
  }
  changeDashboard(navigate, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeNavigate(navigate, 'dashboard', val);
  }
  changeOpen(navigate, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeNavigate(navigate, 'open', val);
  }
  changeType(navigate, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeNavigate(navigate, 'type', val);
  }
  removeNavigate(navigate) {
    this.props.actions.removeNavigate(navigate);
  }

  renderNavType() {
    if (this.props.navigate.type === 'slice') {
      return (
        <Select
          className="col-lg-6"
          multi={false}
          name="select-column"
          placeholder={this.state.localeMessage.navigate_slice}
          options={this.props.slices.map((o) => ({ value: o[0] + '', label: o[1] }))}
          value={this.props.navigate.slice}
          autosize={false}
          onChange={this.changeSlice.bind(this, this.props.navigate)}
        />
      );
    }
    return (
      <Select
        className="col-lg-6"
        multi={false}
        name="select-column"
        placeholder={this.state.localeMessage.navigate_dashboard}
        options={this.props.dashboards.map((o) => ({ value: o[0] + '', label: o[1] }))}
        value={this.props.navigate.dashboard}
        autosize={false}
        onChange={this.changeDashboard.bind(this, this.props.navigate)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="row space-1">
          <Select
            className="col-lg-6"
            multi={false}
            name="select-column"
            placeholder={this.state.localeMessage.metric}
            options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
            value={this.props.navigate.metric}
            autosize={false}
            onChange={this.changeMetric.bind(this, this.props.navigate)}
          />
          <div className="col-lg-6">
            <input
              type="text"
              onChange={this.changeExpr.bind(this, this.props.navigate)}
              value={this.props.navigate.expr}
              className="form-control input-sm"
              placeholder={this.state.localeMessage.threshold}
            />
          </div>
        </div>
        <div className="row space-1">
          <div className="col-lg-6">
            <input
              type="text"
              onChange={this.changeWidth.bind(this, this.props.navigate)}
              value={this.props.navigate.width}
              className="form-control input-sm"
              placeholder={this.state.localeMessage.width}
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              onChange={this.changeHeight.bind(this, this.props.navigate)}
              value={this.props.navigate.height}
              className="form-control input-sm"
              placeholder={this.state.localeMessage.height}
            />
          </div>
        </div>
        <div className="row space-1">
          <Select
            className="col-lg-6"
            multi={false}
            name="select-column"
            placeholder={this.state.localeMessage.navigate_type}
            options={this.state.navigateChoices.map((o) => ({ value: o.value + '', label: o.key }))}
            value={this.props.navigate.type}
            autosize={false}
            onChange={this.changeType.bind(this, this.props.navigate)}
          />
          <Select
            className="col-lg-6"
            multi={false}
            name="select-column"
            placeholder={this.state.localeMessage.open_type}
            options={this.state.openChoices.map((o) => ({ value: o.value + '', label: o.key }))}
            value={this.props.navigate.open}
            autosize={false}
            onChange={this.changeOpen.bind(this, this.props.navigate)}
          />
        </div>
        <div className="row space-1">
          {this.renderNavType()}
          <div className="col-lg-2">
            <Button
              id="remove-button"
              bsSize="small"
              onClick={this.removeNavigate.bind(this, this.props.navigate)}
            >
              <i className="fa fa-minus" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Navigate.propTypes = propTypes;
