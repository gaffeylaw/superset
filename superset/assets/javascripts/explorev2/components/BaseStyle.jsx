import React from 'react';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import ColStyle from './ColStyle';

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
    const localMessage = this.props.form_data.localeMessage;
    return (
        <div>
          <div className="col-lg-12">
            <div className="col-lg-2">
              <span>
               {localMessage.header_style}
              </span>          
            </div>
            <div className="col-lg-10">
              <input
                type="text"
                onChange={this.changeHeaderValue.bind(this, this.props.baseStyle)}
                value={this.props.baseStyle.headerValue}
                className="form-control input-sm"
                placeholder={localMessage.header_style}
              />
            </div>
          </div>

          <div className="col-lg-12" style={{ marginTop: '20px' }}>
            <div className="col-lg-2">
              <span>
                {localMessage.table_style}
              </span>
            </div>
            <div className="col-lg-10">
              <input
                type="text"
                onChange={this.changeBodyValue.bind(this, this.props.baseStyle)}
                value={this.props.baseStyle.bodyValue}
                className="form-control input-sm"
                placeholder={localMessage.table_style}
              />
            </div>
          </div>

          <div className="col-lg-12" style={{ marginTop: '10px' }}>
            <hr style={{ height: '1px', border: 'none', borderTop: '1px solid #555555' }} />
            <span style={{ fontSize: '14px' }}>
             {localMessage.col_style}
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
                  <i className="fa fa-plus" />  &nbsp; {localMessage.add_col_style}
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

BaseStyle.propTypes = propTypes;
