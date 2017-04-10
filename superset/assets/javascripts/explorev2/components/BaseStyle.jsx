import React from 'react';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import ColStyle from './ColStyle';
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
  baseStyle: React.PropTypes.object.isRequired,
  colStyles: React.PropTypes.array.isRequired,
};

export default class BaseStyle extends React.Component {
  changeHeaderValue(baseStyle, event) {
    this.props.actions.changeBaseStyle(baseStyle, 'headerValue', event.target.value);
  }
  changeBodyValue(baseStyle, event) {
    this.props.actions.changeBaseStyle(baseStyle, 'bodyValue', event.target.value);
  }
  addColStyle() {
    this.props.actions.addColStyle({
      id: shortid.generate(),
      metric: null,
      value: null,
    });
  }
  render() { 
    const colStylesDiv = [];
    let i = 0;
    this.props.colStyles.forEach((colStyle) => {
      i++;
      colStylesDiv.push(
        <ColStyle
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          colStyle={colStyle}
        />
      );
    });
    return (
      <IntlProvider 
        locale={ chooseLocale() } 
        messages={ chooseMessage() }
       >
        <div>
          <div className="col-lg-12">
            <div className="col-lg-2">
              <span>
               <FormattedMessage id = 'header_style'/>
              </span>          
            </div>
            <div className="col-lg-10">
              <FormattedMessage
                id="header_style"
              >
                {(message) => <input type="text" placeholder={ message } 
                onChange={this.changeHeaderValue.bind(this, this.props.baseStyle)}
                value={this.props.baseStyle.headerValue}
                className="form-control input-sm"                 
                />}
              </FormattedMessage>
             
            </div>
          </div>

          <div className="col-lg-12" style={{ marginTop: '20px' }}>
            <div className="col-lg-2">
              <span>
                <FormattedMessage
                  id = 'table_style'
                />
              </span>
            </div>
            <div className="col-lg-10">
              <FormattedMessage
                  id="table_style"
              >
                {(message) => <input type="text" placeholder={ message }
                  onChange={this.changeBodyValue.bind(this, this.props.baseStyle)}
                  value={this.props.baseStyle.bodyValue}
                  className="form-control input-sm"                 
                />}
              </FormattedMessage>
            </div>
          </div>

          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <hr style={{ height: '1px', border: 'none', borderTop: '1px solid #555555' }} />
            <span style={{ fontSize: '14px' }}>
              <FormattedMessage id = 'col_style'/>
            </span>
            <div style={{ marginTop: '10px' }}>
              {colStylesDiv}
            </div>
            <div className="row space-2">
              <div className="col-lg-2">
                <Button
                  id="add-button"
                  bsSize="sm"
                  onClick={this.addColStyle.bind(this)}
                >
                  <i className="fa fa-plus" > 
                  <FormattedMessage id = 'add_col_style'/>
                  </i>
                </Button>
              </div>
            </div>
          </div>
        </div>
    </IntlProvider>
    );
  }
}

BaseStyle.propTypes = propTypes;
