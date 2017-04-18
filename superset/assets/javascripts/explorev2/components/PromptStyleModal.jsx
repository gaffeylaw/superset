const $ = window.$ = require('jquery');
import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import shortid from 'shortid';
import PromptBaseStyle from './PromptBaseStyle';
import PromptDefaultValue from './PromptDefaultValue';
import PromptDefaultValue2 from './PromptDefaultValue2';

const propTypes = {
  onHide: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  promptColStyles: React.PropTypes.array.isRequired,
  promptDefaultValues: React.PropTypes.array.isRequired,
};

const defaultProps = {
  promptColStyles: [],
};

class PromptStyleModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      flag2: false,
      localMessage: this.props.form_data.localeMessage,
    };
  }

  changeModal(type) {
    if (type === 1) {
      this.setState({ flag: true, flag2: false, flag3: false });
      $('ul li').attr('style', '');
      $('#li').attr('style', 'background: #ccc');
    } else if (type === 2) {
      this.setState({ flag: false, flag2: true, flag3: false });
      $('ul li').attr('style', '');
      $('#li2').attr('style', 'background: #ccc');
    } else if (type === 3) {
      this.setState({ flag: false, flag2: false, flag3: true });
      $('ul li').attr('style', '');
      $('#li3').attr('style', 'background: #ccc');
    }
  }

  addPromptDefaultValue() {
    this.props.actions.addPromptDefaultValue({
      id: shortid.generate(),
      field: null,
      type: 'true',
      value1: '',
      value2: '',
    });
  }

  render() {
    // console.info(this.props.form_data);
    // console.info(this.props.promptDefaultValues);
    const defaultValueDiv = [];
    let i = 0;
    this.props.promptDefaultValues.forEach((defaultValue) => {
      i++;
      defaultValueDiv.push(
        <PromptDefaultValue
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          defaultValue={defaultValue}
          />
      );
    });

    return (
      <Modal
        show
        onHide={this.props.onHide}
        bsStyle="large"
        >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <ul className="nav navbar-nav" style={{ fontSize: '14px' }}>
                <li id="li" className="active" style={{ backgroundColor: '#ccc' }}>
                  <a onClick={this.changeModal.bind(this, 1)}>
                    {this.state.localMessage.base_setting}
                  </a>
                </li>
                <li id="li2"><a onClick={this.changeModal.bind(this, 2)}>
                  {this.state.localMessage.field_default}
                </a></li>
                <li id="li2"><a onClick={this.changeModal.bind(this, 3)}>
                  {this.state.localMessage.date_default}
                </a></li>
              </ul>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: '300px' }}>
          {this.state.flag &&
            <div>
              <PromptBaseStyle
                actions={this.props.actions}
                form_data={this.props.form_data}
                promptColStyles={this.props.promptColStyles}
                />
            </div>
          }
          {this.state.flag2 &&
            <div className="col-lg-12">
              <div>
                {defaultValueDiv}
              </div>
              <div className="row space-2">
                <div className="col-lg-2">
                  <Button
                    id="add-button"
                    bsSize="sm"
                    onClick={this.addPromptDefaultValue.bind(this)}
                    >
                    <i className="fa fa-plus" /> &nbsp; {this.state.localMessage.add_default}
                  </Button>
                </div>
              </div>
            </div>
          }
          {this.state.flag3 &&
            <div>
              <PromptDefaultValue2
                actions={this.props.actions}
                form_data={this.props.form_data}
                />
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

PromptStyleModal.propTypes = propTypes;
PromptStyleModal.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    promptColStyles: state.viz.form_data.promptColStyles,
  };
}

export { PromptStyleModal };
export default connect(mapStateToProps, () => ({}))(PromptStyleModal);
