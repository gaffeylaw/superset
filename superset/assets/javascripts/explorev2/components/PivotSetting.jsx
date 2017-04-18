import React from 'react';
import Select from 'react-select';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
};

export default class PivotSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localMessage: this.props.form_data.localeMessage,
    };
  }
  changeGroupBy(val) {
    this.props.actions.changePivotSetting('groupby', val);
  }
  changeColumns(val) {
    this.props.actions.changePivotSetting('columns', val);
  }
  changeValues(val) {
    this.props.actions.changePivotSetting('values', val);
  }
  render() {
    return (
      <div>
        <div className="row space-1">
          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <span className="col-lg-2" style={{ marginTop: '5px' }}>
              {this.state.localMessage.groupby}:
            </span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder={this.state.localMessage.choose_groupby_option}
              options={this.props.form_data.groupby.map((o) => ({ value: o, label: o }))}
              value={this.props.form_data.pivotSetting.groupby}
              autosize={false}
              onChange={this.changeGroupBy.bind(this)}
            />
          </div>
          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <span className="col-lg-2" style={{ marginTop: '5px' }}>
              {this.state.localMessage.columns}:
            </span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder={this.state.localMessage.choose_column_option}
              options={this.props.form_data.groupby.map((o) => ({ value: o, label: o }))}
              value={this.props.form_data.pivotSetting.columns}
              autosize={false}
              onChange={this.changeColumns.bind(this)}
            />
          </div>
          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <span className="col-lg-2" style={{ marginTop: '5px' }}>
              {this.state.localMessage.measure}:
            </span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder={this.state.localMessage.choose_value_option}
              options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
              value={this.props.form_data.pivotSetting.values}
              autosize={false}
              onChange={this.changeValues.bind(this)}
            />
          </div>

        </div>
      </div>
    );
  }
}

PivotSetting.propTypes = propTypes;
