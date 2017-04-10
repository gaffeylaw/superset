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
  style: React.PropTypes.object.isRequired,
};

export default class Style extends React.Component {
  constructor(props) {
    super(props);
    const iconChoices = chooseLocale == 'cn' ? zh_CN.iconChoices : en_US.iconChoices;
    this.state = {
      iconChoices,
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
      <IntlProvider 
        locale={ chooseLocale() } 
        messages={ chooseMessage() }
       >
        <div>
          <div className="row space-1">
            <FormattedMessage
              id = 'metric'
            >
              {(message) =><Select
                className="col-lg-7"
                multi={false}
                name="select-column"
                placeholder={message}
                options={this.props.form_data.metrics.map((o) => ({ value: o, label: o }))}
                value={this.props.style.metric}
                autosize={false}
                onChange={this.changeMetric.bind(this, this.props.style)}
              />}
            </FormattedMessage>
            <div className="col-lg-5">
              <FormattedMessage
                id = 'threshold'
              >
              {(message) => 
                <input tyle = "text" placeholder={ message }
                onChange={this.changeExpr.bind(this, this.props.style)}
                value={this.props.style.expr}
                className="form-control input-sm"
              />}
              </FormattedMessage>
            </div>
          </div>
          <div className="row space-1">
            <div className="col-lg-7">
              <FormattedMessage
                id = 'style'
              >
              {(message) => 
                <input tyle = "text" placeholder={ message }
                onChange={this.changeValue.bind(this, this.props.style)}
                value={this.props.style.value}
                className="form-control input-sm"
              />}
              </FormattedMessage>
            </div>
            <FormattedMessage
              id = 'icon'
            >
              {(message) =><Select
                className="col-lg-4"
                multi={false}
                name="select-column"
                placeholder={message}
                options={this.state.iconChoices.map((o) => ({ label: o.key, value: o.value }))}
                optionRenderer={this.renderOption.bind(this)}
                value={this.props.style.icon}
                autosize={false}
                onChange={this.changeIcon.bind(this, this.props.style)}
              />}
            </FormattedMessage>
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
        </IntlProvider>
    );
  }
}

Style.propTypes = propTypes;
