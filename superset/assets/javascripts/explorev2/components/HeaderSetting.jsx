import React from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { chooseMessage } from '../stores/language';
import { zh_CN } from '../stores/zh_CN';
import { en_US } from '../stores/en_US';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  headerSetting: React.PropTypes.object.isRequired,
};

const localMessage = chooseMessage();

export default class HeaderSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  changeParentName(headerSetting, event) {
    this.props.actions.changeHeaderSetting(headerSetting, 'parentName', event.target.value);
  }
  changeChildren(headerSetting, val) {
    this.props.actions.changeHeaderSetting(headerSetting, 'children', val);
  }
  changeItems(headerSetting, val) {
    this.props.actions.changeHeaderSetting(headerSetting, 'items', val);
  }
  removeHeaderSetting(headerSetting) {
    this.props.actions.removeHeaderSetting(headerSetting);
  }
  render() {
    return (
      <div>
        <div className="row space-1">
          <div className="col-lg-12">
            <span className="col-lg-2" style={{ marginTop: '5px' }}>
              {localMessage.parent_node}:
            </span>
            <div className="col-lg-9">
              <input
                type="text"
                onChange={this.changeParentName.bind(this, this.props.headerSetting)}
                value={this.props.headerSetting.parentName}
                className="form-control input-sm"
                placeholder={localMessage.input_parent_node}
              />
            </div>
            <div className="col-lg-1">
              <Button
                id="remove-button"
                bsSize="small"
                onClick={this.removeHeaderSetting.bind(this, this.props.headerSetting)}
              >
                <i className="fa fa-minus" />
              </Button>
            </div>
          </div>
          <div className="col-lg-12">
            <span className="col-lg-2" style={{ marginTop: '15px' }}>
              {localMessage.child_node}:
            </span>
            <Select
              className="col-lg-4"
              style={{ marginTop: '10px' }}
              multi
              simpleValue
              placeholder={localMessage.choose_child_node}
              options={this.props.form_data.groupby.concat(this.props.form_data.metrics)
                          .map((o) => ({ value: o, label: o }))}
              value={this.props.headerSetting.children}
              autosize={false}
              onChange={this.changeChildren.bind(this, this.props.headerSetting)}
            />
            <span className="col-lg-2" style={{ marginTop: '15px' }}>
              {localMessage.show_option}:
            </span>
            <Select
              className="col-lg-4"
              style={{ marginTop: '10px' }}
              multi
              simpleValue
              placeholder={localMessage.choose_option}
              options={this.props.form_data.groupby.concat(this.props.form_data.metrics)
                          .map((o) => ({ value: o, label: o }))}
              value={this.props.headerSetting.items}
              autosize={false}
              onChange={this.changeItems.bind(this, this.props.headerSetting)}
            />
          </div>
        </div>
      </div>
    );
  }
}

HeaderSetting.propTypes = propTypes;
