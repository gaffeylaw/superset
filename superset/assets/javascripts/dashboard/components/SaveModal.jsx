const $ = window.$ = require('jquery');

import React from 'react';
import { Button, FormControl, FormGroup, Radio } from 'react-bootstrap';
import { getAjaxErrorMsg, showModal } from '../../modules/utils';

import ModalTrigger from '../../components/ModalTrigger';

const propTypes = {
  css: React.PropTypes.string,
  dashboard: React.PropTypes.object.isRequired,
  triggerNode: React.PropTypes.node.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};

class SaveModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: props.dashboard,
      css: props.css,
      saveType: 'overwrite',
      newDashName: '',
    };
    this.modal = null;
    this.handleSaveTypeChange = this.handleSaveTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveDashboard = this.saveDashboard.bind(this);
  }
  handleSaveTypeChange(event) {
    this.setState({
      saveType: event.target.value,
    });
  }
  handleNameChange(event) {
    this.setState({
      newDashName: event.target.value,
      saveType: 'newDashboard',
    });
  }
  saveDashboardRequest(data, url, saveType, localMessage) {
    const dashboard = this.props.dashboard;
    const saveModal = this.modal;
    $.ajax({
      type: 'POST',
      url,
      data: {
        data: JSON.stringify(data),
      },
      success(resp) {
        saveModal.close();
        dashboard.onSave();
        if (saveType === 'newDashboard') {
          window.location = '/superset/dashboard/' + resp.id + '/';
        } else {
          showModal({
            title: localMessage.success,
            body: localMessage.success_save_dashboard,
          });
        }
      },
      error(error) {
        saveModal.close();
        const errorMsg = getAjaxErrorMsg(error);
        showModal({
          title: localMessage.error,
          body: localMessage.error_add_dashboard + ': </ br>' + errorMsg,
        });
      },
    });
  }
  saveDashboard(saveType, newDashboardTitle) {
    const dashboard = this.props.dashboard;
    const expandedSlices = {};
    $.each($('.slice_info'), function () {
      const widget = $(this).parents('.widget');
      const sliceDescription = widget.find('.slice_description');
      if (sliceDescription.is(':visible')) {
        expandedSlices[$(widget).attr('data-slice-id')] = true;
      }
    });
    const positions = dashboard.reactGridLayout.serialize();
    const data = {
      positions,
      css: this.props.css,
      expanded_slices: expandedSlices,
    };
    let url = null;
    if (saveType === 'overwrite') {
      url = '/superset/save_dash/' + dashboard.id + '/';
      this.saveDashboardRequest(data, url, saveType, this.props.localMessage);
    } else if (saveType === 'newDashboard') {
      if (!newDashboardTitle) {
        this.modal.close();
        showModal({
          title: this.props.localMessage.error,
          body: this.props.localMessage.error_add_dashboard,
        });
      } else {
        data.dashboard_title = newDashboardTitle;
        url = '/superset/copy_dash/' + dashboard.id + '/';
        this.saveDashboardRequest(data, url, saveType);
      }
    }
  }
  render() {
    return (
      <ModalTrigger
        ref={(modal) => { this.modal = modal; }}
        triggerNode={this.props.triggerNode}
        isButton
        modalTitle={this.props.localMessage.save_dashboard}
        modalBody={
          <FormGroup>
            <Radio
              value="overwrite"
              onChange={this.handleSaveTypeChange}
              checked={this.state.saveType === 'overwrite'}
            >
              {this.props.localMessage.overwrite_dashboard}
              [{this.props.dashboard.dashboard_title}]
            </Radio>
            <Radio
              value="newDashboard"
              onChange={this.handleSaveTypeChange}
              checked={this.state.saveType === 'newDashboard'}
            >
              {this.props.localMessage.save_as}:
            </Radio>
            <FormControl
              type="text"
              placeholder={this.props.localMessage.dashboard_name}
              onFocus={this.handleNameChange}
              onChange={this.handleNameChange}
            />
          </FormGroup>
        }
        modalFooter={
          <div>
            <Button
              bsStyle="primary"
              onClick={() => { this.saveDashboard(this.state.saveType, this.state.newDashName); }}
            >
              {this.props.localMessage.save}
            </Button>
          </div>
        }
      />
    );
  }
}
SaveModal.propTypes = propTypes;

export default SaveModal;
