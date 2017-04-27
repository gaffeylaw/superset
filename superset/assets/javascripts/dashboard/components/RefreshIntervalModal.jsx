import React from 'react';

import ModalTrigger from '../../components/ModalTrigger';
import Select from 'react-select';

const propTypes = {
  triggerNode: React.PropTypes.node.isRequired,
  initialRefreshFrequency: React.PropTypes.number,
  onChange: React.PropTypes.func,
  localMessage: React.PropTypes.object.isRequired,
};

const defaultProps = {
  initialRefreshFrequency: 0,
  onChange: () => {},
};


class RefreshIntervalModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshFrequency: props.initialRefreshFrequency,
      options: props.localMessage.refresh_options.map(o => ({ value: o[0], label: o[1] })),
    };
  }
  render() {
    return (
      <ModalTrigger
        triggerNode={this.props.triggerNode}
        isButton
        modalTitle={this.props.localMessage.refresh_interval}
        modalBody={
          <div>
            {this.props.localMessage.choose_refresh_desc}
            <Select
              options={this.state.options}
              value={this.state.refreshFrequency}
              onChange={(opt) => {
                this.setState({ refreshFrequency: opt.value });
                this.props.onChange(opt.value);
              }}
            />
          </div>
        }
      />
    );
  }
}
RefreshIntervalModal.propTypes = propTypes;
RefreshIntervalModal.defaultProps = defaultProps;

export default RefreshIntervalModal;
