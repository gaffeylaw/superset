// JS
const $ = require('jquery');
import d3 from 'd3';

import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import '../stylesheets/react-select/select.less';
import './filter_box.css';
import { chooseMessage } from '../javascripts/explorev2/stores/language';
import zh_CN from '../javascripts/explorev2/stores/zh_CN';
import en_US from '../javascripts/explorev2/stores/en_US';
// import { TIME_CHOICES } from './constants.js';
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

const propTypes = {
  origSelectedValues: React.PropTypes.object,
  filtersChoices: React.PropTypes.object,
  onChange: React.PropTypes.func,
  showDateFilter: React.PropTypes.bool,
  filtersStyles: React.PropTypes.array,
};

const localMessage = chooseMessage();

const defaultProps = {
  origSelectedValues: {},
  onChange: () => {},
  showDateFilter: false,
};

class FilterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.origSelectedValues,
    };
  }
  changeFilter(filter, isDateFilter, options) {
    let vals = null;
    if (!isDateFilter) {
      // string filter
      if (options) {
        if (Array.isArray(options)) {
          vals = options.map((opt) => opt.value);
        } else {
          vals = [options.value];
        }
      }
    } else {
      // date filter
      if (options !== null) {
        vals = options.format("YYYY/MM/DD");
      } else {
        vals = options;
      }
    }
    const selectedValues = Object.assign({}, this.state.selectedValues);
    selectedValues[filter] = vals;
    this.setState({ selectedValues });
    this.props.onChange(filter, vals);
  }
  render() {
    let dateFilter;
    if (this.props.showDateFilter) {
      dateFilter = ['__from', '__to'].map((field) => {
        // const val = this.state.selectedValues[field];
        // const choices = TIME_CHOICES.slice();
        // if (!choices.includes(val)) {
        //   choices.push(val);
        // }
        // const options = choices.map((s) => ({ value: s, label: s }));
        // let filterValue = this.state.selectedValues[field];
        // return (
        //   <div className="m-b-5" style={{ float: 'left', paddingLeft: '15px' }}>
        //     {field.replace('__', '')}
        //     <Select.Creatable
        //       style={{ width: 200 }}
        //       options={options}
        //       value={filterValue}
        //       onChange={this.changeFilter.bind(this, field, true)}
        //     />
        //   </div>
        // );
        const filterValue = this.state.selectedValues[field] == undefined ? null: this.state.selectedValues[field];
        const momentValue = filterValue === null ? null : moment(filterValue);
        // console.info(momentValue);
        return (
          <div className="m-b-5" style={{ float: 'left', paddingLeft: '15px' }}>
            {field.replace('__', '')} <br/>
            <DatePicker
              className="datePicker"
              selected={momentValue}
              onChange={ this.changeFilter.bind(this, field, true) }
              dateFormat="YYYY/MM/DD"
              maxDate={moment()}
              showMonthDropdown 
              showYearDropdown
              isClearable={true}
              placeholderText={'  [' + field.replace('__', '') + ']'}
            />
          </div>
        )
      });
    }
    const filters = Object.keys(this.props.filtersChoices).map((filter) => {
      const data = this.props.filtersChoices[filter];
      let styles = {
        id: '',
        field: '',
        multi: 'true',
        width: '100%',
      };
      for (const i in this.props.filtersStyles) {
        if (this.props.filtersStyles[i].field === filter) {
          styles = this.props.filtersStyles[i];
          break;
        }
      }
      let multi = false;
      if (styles.multi === 'true') {
        multi = true;
      }
      const maxes = {};
      maxes[filter] = d3.max(data, function (d) {
        return d.metric;
      });
      let filterValue = this.state.selectedValues[filter];
      if (!multi) {
        if (this.state.selectedValues[filter] != undefined) {
          filterValue = this.state.selectedValues[filter][0];
        }
      }
      return (
        <div key={filter} className="m-b-5" style={{ width: `${styles.width}`,
        float: 'left', paddingLeft: '15px' }}>
          {filter}
          <Select
            placeholder={`[${filter}]`}
            noResultsText={localMessage.no_result}
            key={filter}
            multi={multi}
            value={filterValue}
            options={data.map((opt) => {
              const perc = Math.round((opt.metric / maxes[opt.filter]) * 100);
              const backgroundImage = (
                'linear-gradient(to right, lightgrey, ' +
                `lightgrey ${perc}%, rgba(0,0,0,0) ${perc}%`
              );
              const style = {
                backgroundImage,
                padding: '2px 5px',
              };
              return { value: opt.id, label: opt.id, style };
            })}
            onChange={this.changeFilter.bind(this, filter, false)}
          />
        </div>
      );
    });
    return (
      <div>
        {dateFilter}
        {filters}
      </div>
    );
  }
}
FilterBox.propTypes = propTypes;
FilterBox.defaultProps = defaultProps;

function filterBox(slice) {
  const d3token = d3.select(slice.selector);

  const refresh = function () {
    d3token.selectAll('*').remove();

    // filter box should ignore the dashboard's filters
    const url = slice.jsonEndpoint({ extraFilters: false });
    $.getJSON(url, (payload) => {
      const fd = payload.form_data;
      const filtersChoices = {};
      const filtersStyles = [];
      for (let i = 0; i < 10; i++) {
        if (fd[`promptColStyle_id_${i}`]) {
          filtersStyles.push({
            id: fd[`promptColStyle_id_${i}`],
            field: fd[`promptColStyle_field_${i}`],
            multi: fd[`promptColStyle_multi_${i}`],
            width: fd[`promptColStyle_width_${i}`],
          });
        }
      }
      // Making sure the ordering of the fields matches the setting in the
      // dropdown as it may have been shuffled while serialized to json
      payload.form_data.groupby.forEach((f) => {
        filtersChoices[f] = payload.data[f];
      });
      ReactDOM.render(
        <FilterBox
          filtersChoices={filtersChoices}
          onChange={slice.setFilter}
          showDateFilter={fd.date_filter}
          origSelectedValues={slice.getFilters() || {}}
          filtersStyles={filtersStyles}
          floatLayout={fd.float_layout}
        />,
        document.getElementById(slice.containerId)
      );
      slice.done(payload);
    })
    .fail(function (xhr) {
      slice.error(xhr.responseText, xhr);
    });
  };
  return {
    render: refresh,
    resize: () => {},
  };
}

module.exports = filterBox;
