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
            <span className="col-lg-2" style={{ marginTop: '5px' }}>分组:</span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder="选择 groupby 项"
              options={this.props.form_data.groupby.map((o) => ({ value: o, label: o }))}
              value={this.props.form_data.pivotSetting.groupby}
              autosize={false}
              onChange={this.changeGroupBy.bind(this)}
            />
          </div>
          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <span className="col-lg-2" style={{ marginTop: '5px' }}>列:</span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder="选择 column 项"
              options={this.props.form_data.groupby.map((o) => ({ value: o, label: o }))}
              value={this.props.form_data.pivotSetting.columns}
              autosize={false}
              onChange={this.changeColumns.bind(this)}
            />
          </div>
          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <span className="col-lg-2" style={{ marginTop: '5px' }}>度量:</span>
            <Select
              className="col-lg-10"
              multi
              simpleValue
              placeholder="选择 value 项"
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
