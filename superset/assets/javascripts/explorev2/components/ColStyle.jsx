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
  colStyle: React.PropTypes.object.isRequired,
};

export default class ColStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metricChoices: this.props.form_data.groupby.concat(this.props.form_data.metrics),
    };
  }
  changeMetric(colStyle, col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeColStyle(colStyle, 'metric', val);
  }
  changeValue(colStyle, event) {
    this.props.actions.changeColStyle(colStyle, 'value', event.target.value);
  }
  removeColStyle(colStyle) {
    this.props.actions.removeColStyle(colStyle);
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
              {(message) => <Select  
                className="col-lg-6"
                multi={false}
                name="select-column"
                placeholder={ message }
                options={this.state.metricChoices.map((o) => ({ value: o, label: o }))}
                value={this.props.colStyle.metric}
                autosize={false}
                onChange={this.changeMetric.bind(this, this.props.colStyle)}
              />}
            </FormattedMessage>
            <div className="col-lg-5">
              <FormattedMessage
                id = 'style'
              >
                {(message) => 
                  <input tyle = "text" placeholder={ message }
                  onChange={this.changeValue.bind(this, this.props.colStyle)}
                  value={this.props.colStyle.value}
                  className="form-control input-sm"
                />}
              </FormattedMessage>
             
            </div>

            <div className="col-lg-1">
              <Button
                id="remove-button"
                bsSize="small"
                onClick={this.removeColStyle.bind(this, this.props.colStyle)}
              >
                <i className="fa fa-minus" />
              </Button>
            </div>
          </div>
        </div>
      </IntlProvider >
    );
  }
}

ColStyle.propTypes = propTypes;
