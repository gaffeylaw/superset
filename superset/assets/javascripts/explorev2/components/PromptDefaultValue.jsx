import React from 'react';
// import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from 'react-bootstrap';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  defaultValue: React.PropTypes.object.isRequired,
};

export default class PromptDefaultValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldChoices: this.props.form_data.groupby,
      localMessage: this.props.form_data.localeMessage,
      type: props.defaultValue.type === 'true' ? true : false,
    };
  }
  changeField(defaultValue, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changePromptDefaultValue(defaultValue, 'field', val);
  }
  changeType(defaultValue, col) {
    const val = (col) ? col.value : null;
    if (val === 'true') {
      this.setState({ type: true });
    } else {
      this.setState({ type: false });
    }
    this.props.actions.changePromptDefaultValue(defaultValue, 'type', val);
  }
  changeValue1(defaultValue, event) {
    this.props.actions.changePromptDefaultValue(defaultValue, 'value1', event.target.value);
  }
  changeValue2(defaultValue, event) {
    this.props.actions.changePromptDefaultValue(defaultValue, 'value2', event.target.value);
  }
  removePromptDefaultValue(defaultValue) {
    this.props.actions.removePromptDefaultValue(defaultValue);
  }
  render() {
    return (
      <div>
        <div className="row space-1">
          <div style={{ width: 40, marginLeft: 20, float: 'left' }}>
            <span>{this.state.localMessage.field}:</span>
          </div>
          <Select
            className="col-lg-4"
            multi={false}
            name="select-column"
            placeholder={this.state.localMessage.field}
            options={this.state.fieldChoices.map((o) => ({ value: o, label: o }))}
            value={this.props.defaultValue.field}
            autosize={false}
            onChange={this.changeField.bind(this, this.props.defaultValue)}
          />
          <div style={{ width: 40, float: 'left', marginLeft: 20 }}>
            <span>{this.state.localMessage.type}:</span>
          </div>
          <Select
            className="col-lg-5"
            multi={false}
            name="select-column"
            placeholder={this.state.localMessage.choose_default_value}
            options={this.state.localMessage.typeChoices.map((o) =>
              ({ value: o.value, label: o.key }))}
            value={this.props.defaultValue.type}
            autosize={false}
            onChange={this.changeType.bind(this, this.props.defaultValue)}
          />
        </div>
        <div className="row space-1">
          {this.state.type &&
            <div className="col-lg-10">
              <div className="col-lg-2">
                <span>{this.state.localMessage.default_value}:</span>
              </div>
              <textarea
                style={{ width: 370, height: 100 }}
                type="text"
                onChange={this.changeValue1.bind(this, this.props.defaultValue)}
                value={this.props.defaultValue.value1}
                className="form-control input-sm"
                placeholder={this.state.localMessage.default_value_desc}
              />
            </div>
          }
          {!this.state.type &&
            <div className="col-lg-10">
              <div className="col-lg-2">
                <span>{this.state.localMessage.sql}:</span>
              </div>
              <textarea
                style={{ width: 370, height: 100 }}
                type="text"
                onChange={this.changeValue2.bind(this, this.props.defaultValue)}
                value={this.props.defaultValue.value2}
                className="form-control input-sm"
                placeholder={this.state.localMessage.default_sql}
              />
            </div>
          }
          <div className="col-lg-2">
            <Button
              id="remove-button"
              bsSize="small"
              onClick={this.removePromptDefaultValue.bind(this, this.props.defaultValue)}
            >
              <i className="fa fa-minus" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

PromptDefaultValue.propTypes = propTypes;
