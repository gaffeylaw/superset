const $ = window.$ = require('jquery');

import React from 'react';

import { ButtonGroup } from 'react-bootstrap';
import Button from '../../components/Button';
import CssEditor from './CssEditor';
import RefreshIntervalModal from './RefreshIntervalModal';
import SaveModal from './SaveModal';
import CodeModal from './CodeModal';
import SliceAdder from './SliceAdder';

const propTypes = {
  dashboard: React.PropTypes.object.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      css: props.dashboard.css,
      cssTemplates: [],
    };
  }
  refresh() {
    this.props.dashboard.sliceObjects.forEach((slice) => {
      slice.render(true);
    });
  }
  componentWillMount() {
    $.get('/csstemplateasyncmodelview/api/read', (data) => {
      const cssTemplates = data.result.map((row) => ({
        value: row.template_name,
        css: row.css,
        label: row.template_name,
      }));
      this.setState({ cssTemplates });
    });
  }
  changeCss(css) {
    this.setState({ css });
    this.props.dashboard.onChange();
  }
  render() {
    const dashboard = this.props.dashboard;
    const canSave = dashboard.context.dash_save_perm;
    return (
      <ButtonGroup>
        <Button
          tooltip={this.props.localMessage.force_refresh_dashboard}
          onClick={this.refresh.bind(this)}
        >
          <i className="fa fa-refresh" />
        </Button>
        <SliceAdder
          dashboard={dashboard}
          triggerNode={
            <i className="fa fa-plus" />
          }
          localMessage={this.props.localMessage}
        />
        <RefreshIntervalModal
          onChange={refreshInterval => dashboard.startPeriodicRender(refreshInterval * 1000)}
          triggerNode={
            <i className="fa fa-clock-o" />
          }
          localMessage={this.props.localMessage}
        />
        <CodeModal
          codeCallback={dashboard.readFilters.bind(dashboard)}
          triggerNode={<i className="fa fa-filter" />}
          localMessage={this.props.localMessage}
        />
        <CssEditor
          dashboard={dashboard}
          triggerNode={
            <i className="fa fa-css3" />
          }
          initialCss={dashboard.css}
          templates={this.state.cssTemplates}
          onChange={this.changeCss.bind(this)}
          localMessage={this.props.localMessage}
        />
        <Button
          disabled={!canSave}
          onClick={() => {
            window.location = `/dashboardmodelview/edit/${dashboard.id}`;
          }}
          tooltip={this.props.localMessage.edit_dashboard_property}
        >
          <i className="fa fa-edit" />
        </Button>
        <SaveModal
          dashboard={dashboard}
          css={this.state.css}
          triggerNode={
            <i className="fa fa-save" />
          }
          localMessage={this.props.localMessage}
        />
      </ButtonGroup>
    );
  }
}
Controls.propTypes = propTypes;

export default Controls;
