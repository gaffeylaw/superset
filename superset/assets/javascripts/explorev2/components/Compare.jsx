import React from 'react';
// import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import zh_CN from '../stores/zh_CN';
import en_US from '../stores/en_US';
import intl from 'intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { injectIntl, intlShape, defineMessages, IntlProvider,
  FormattedMessage, addLocaleData } from 'react-intl';
import { chooseMessage, chooseLocale} from '../stores/language';
addLocaleData([...en, ...zh]);

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  compare: React.PropTypes.object.isRequired,
};

const LocaleMessage = chooseMessage();

export default class Compare extends React.Component {
  changeMetricLeft(compare, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeCompare(compare, 'metricLeft', val);
  }
  changeMetricRight(compare, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeCompare(compare, 'metricRight', val);
  }
  changeExpr(compare, event) {
    this.props.actions.changeCompare(compare, 'expr', event.target.value);
  }
  changeValue(compare, event) {
    this.props.actions.changeCompare(compare, 'value', event.target.value);
  }
  removeCompare(compare) {
    this.props.actions.removeCompare(compare);
  }
  render() {
    return (
      <div>
        <div className="row space-1">
          <Select
            className="col-lg-6"
            multi={false}
            name="select-column"
            placeholder={LocaleMessage.metric1}
            options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
            value={this.props.compare.metricLeft}
            autosize={false}
            onChange={this.changeMetricLeft.bind(this, this.props.compare)}
          />
          <Select
            className="col-lg-6"
            multi={false}
            name="select-column"
            placeholder={LocaleMessage.metric2}
            options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
            value={this.props.compare.metricRight}
            autosize={false}
            onChange={this.changeMetricRight.bind(this, this.props.compare)}
          />
        </div>
        <div className="row space-1">
          <div className="col-lg-6">
            <input
              type="text"
              onChange={this.changeExpr.bind(this, this.props.compare)}
              value={this.props.compare.expr}
              className="form-control input-sm"
              placeholder={LocaleMessage.compare_expressoin}
            />
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              onChange={this.changeValue.bind(this, this.props.compare)}
              value={this.props.compare.value}
              className="form-control input-sm"
              placeholder={LocaleMessage.style}
            />
          </div>
          <div className="col-lg-1">
            <Button
              id="remove-button"
              bsSize="small"
              onClick={this.removeCompare.bind(this, this.props.compare)}
            >
              <i className="fa fa-minus" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Compare.propTypes = propTypes;
