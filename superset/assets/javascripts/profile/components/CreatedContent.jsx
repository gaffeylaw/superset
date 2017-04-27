import React from 'react';
import moment from 'moment';
import TableLoader from './TableLoader';

const propTypes = {
  user: React.PropTypes.object.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};

class CreatedContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dashboardsLoading: true,
      slicesLoading: true,
      dashboards: [],
      slices: [],
    };
  }
  renderSliceTable() {
    const mutator = (data) => data.map(slice => {
      const data = {};
      data[this.props.localMessage.slice] = <a href={slice.url}>{slice.title}</a>;
      data[this.props.localMessage.favorited] = moment.utc(slice.dttm).fromNow();
      // _favorited: slice.dttm;
      return data;
    });
    return (
      <TableLoader
        dataEndpoint={`/superset/created_slices/${this.props.user.userId}/`}
        className="table table-condensed"
        columns={this.props.localMessage.slc_create_column}
        mutator={mutator}
        noDataText={this.props.localMessage.no_slices}
        sortable
      />
    );
  }
  renderDashboardTable() {
    const mutator = (data) => data.map(dash => {
      const data = {};
      data[this.props.localMessage.dashboard] = <a href={dash.url}>{dash.title}</a>;
      data[this.props.localMessage.favorited] = moment.utc(dash.dttm).fromNow();
      _favorited: dash.dttm;
      return data;
    });
    return (
      <TableLoader
        className="table table-condensed"
        mutator={mutator}
        dataEndpoint={`/superset/created_dashboards/${this.props.user.userId}/`}
        noDataText={this.props.localMessage.no_dashboards}
        columns={this.props.localMessage.dash_create_column}
        sortable
      />
    );
  }
  render() {
    return (
      <div>
        <h3>{this.props.localMessage.dashboard}</h3>
        {this.renderDashboardTable()}
        <hr />
        <h3>{this.props.localMessage.slice}</h3>
        {this.renderSliceTable()}
      </div>
    );
  }
}
CreatedContent.propTypes = propTypes;

export default CreatedContent;
