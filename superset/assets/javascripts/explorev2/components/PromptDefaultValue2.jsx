import React from 'react';
const DatePicker = require('react-datepicker');
const moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
};

export default class PromptDefaultValue2 extends React.Component {
  constructor(props) {
    super(props);
    const from = props.form_data.promptDateFrom;
    const to = props.form_data.promptDateTo;
    this.state = {
      startDate: (from === null || from === '') ? null : moment(from),
      endDate: (to === null || to === '') ? null : moment(to),
    };
  }
  changePromptDateFilter(field, date) {
    if (date !== null) {
      this.props.actions.changePromptDateFilter(field, date.format('YYYY/MM/DD'));
    } else {
      this.props.actions.changePromptDateFilter(field, date);
    }
    if (field === 'promptDateFrom') {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
  }
  render() {
    // console.info(this.props.form_data);
    return (
      <div>
        <div className="row space-1">
          <div className="col-lg-2">
            <span>from:</span>
          </div>
          <DatePicker
            className="datePicker"
            selected={this.state.startDate}
            onChange={this.changePromptDateFilter.bind(this, 'promptDateFrom')}
            dateFormat="YYYY/MM/DD"
            maxDate={moment()}
            showMonthDropdown
            showYearDropdown
            isClearable={true}
          />
        </div>
        <div className="row space-1">
          <div className="col-lg-2">
            <span>to:</span>
          </div>
          <DatePicker
            className="datePicker"
            selected={this.state.endDate}
            onChange={this.changePromptDateFilter.bind(this, 'promptDateTo')}
            dateFormat="YYYY/MM/DD"
            maxDate={moment()}
            showMonthDropdown
            showYearDropdown
            isClearable={true}
          />
        </div>
      </div>
    );
  }
}

PromptDefaultValue2.propTypes = propTypes;
