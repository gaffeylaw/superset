import React from 'react';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import PromptColStyle from './PromptColStyle';

const propTypes = {
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  promptColStyles: React.PropTypes.array.isRequired,
};

export default class PromptBaseStyle extends React.Component {
  addColStyle() {
    this.props.actions.addPromptColStyle({
      id: shortid.generate(),
      field: null,
      multi: 'true',
      width: '200px',
    });
  }
  render() {
    const colStylesDiv = [];
    let i = 0;
    this.props.promptColStyles.forEach((colStyle) => {
      i++;
      colStylesDiv.push(
        <PromptColStyle
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          promptColStyle={colStyle}
        />
      );
    });
    return (
      <div>
        <div className="col-lg-12">
          <div>
            {colStylesDiv}
          </div>
          <div className="row space-2">
            <div className="col-lg-2">
              <Button
                id="add-button"
                bsSize="sm"
                onClick={this.addColStyle.bind(this)}
              >
                <i className="fa fa-plus" /> &nbsp; 添加字段样式
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PromptBaseStyle.propTypes = propTypes;
