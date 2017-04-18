import React from 'react';
// import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from 'react-bootstrap';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  style: React.PropTypes.object.isRequired,
};

export default class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconChoices:this.props.form_data.localeMessage.iconChoices,
      localMessage: this.props.form_data.localeMessage,
    };
  }
  changeMetric(style, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeStyle(style, 'metric', val);
  }
  changeExpr(style, event) {
    this.props.actions.changeStyle(style, 'expr', event.target.value);
  }
  changeValue(style, event) {
    this.props.actions.changeStyle(style, 'value', event.target.value);
  }
  changeIcon(style, icon) {
    const val = (icon) ? icon.value : null;
    this.props.actions.changeStyle(style, 'icon', val);
  }
  removeStyle(style) {
    this.props.actions.removeStyle(style);
  }
  renderOption(opt) {
    return (
      <div>
        <i className={opt.value} />
        <span style={{ marginLeft: '10px' }}>{opt.label}</span>
      </div>
      );
  }
  render() {
    return (
        <div>
          <div className="row space-1">
            <Select
              className="col-lg-7"
              multi={false}
              name="select-column"
              placeholder={this.state.localMessage.metric}
              options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
              value={this.props.style.metric}
              autosize={false}
              onChange={this.changeMetric.bind(this, this.props.style)}
            />
            <div className="col-lg-5">
              <input
                type="text"
                onChange={this.changeExpr.bind(this, this.props.style)}
                value={this.props.style.expr}
                className="form-control input-sm"
                placeholder={this.state.localMessage.threshold}
              />
            </div>
          </div>
          <div className="row space-1">
            <div className="col-lg-7">
              <input
                type="text"
                onChange={this.changeValue.bind(this, this.props.style)}
                value={this.props.style.value}
                className="form-control input-sm"
                placeholder={this.state.localMessage.style}
              />
            </div>
            <Select
              className="col-lg-4"
              multi={false}
              name="select-column"
              placeholder={this.state.localMessage.icon}
              options={this.state.iconChoices.map((o) => ({ label: o.key, value: o.value }))}
              optionRenderer={this.renderOption.bind(this)}
              value={this.props.style.icon}
              autosize={false}
              onChange={this.changeIcon.bind(this, this.props.style)}
            />
            <div className="col-lg-1">
              <Button
                id="remove-button"
                bsSize="small"
                onClick={this.removeStyle.bind(this, this.props.style)}
              >
                <i className="fa fa-minus" />
              </Button>
            </div>
          </div>
        </div>
    );
  }
}

Style.propTypes = propTypes;
