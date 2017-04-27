import React from 'react';
import moment from 'moment';
import TableLoader from './TableLoader';

const propTypes = {
  user: React.PropTypes.object.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};

export default class Favorites extends React.PureComponent {
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
      data[this.props.localMessage.slice] =  <a href={slice.url}>{slice.title}</a>;
      data[this.props.localMessage.creator] = <a href={slice.creator_url}>{slice.creator}</a>;
      data[this.props.localMessage.favorited] = moment.utc(slice.dttm).fromNow();
      // _favorited: slice.dttm;
      return data;
    });
    return (
      <TableLoader
        dataEndpoint={`/superset/fave_slices/${this.props.user.userId}/`}
        className="table table-condensed"
        columns={this.props.localMessage.slc_fav_column}
        mutator={mutator}
        noDataText={this.props.localMessage.no_fav_slice}
        sortable
      />
    );
  }
  renderDashboardTable() {
    const mutator = (data) => data.map(dash => {
      const data = {};
      data[this.props.localMessage.dashboard] = <a href={dash.url}>{dash.title}</a>;
      data[this.props.localMessage.creator] = <a href={dash.creator_url}>{dash.creator}</a>;
      data[this.props.localMessage.favorited] = moment.utc(dash.dttm).fromNow();
      return data;
    });
    return (
      <TableLoader
        className="table table-condensed"
        mutator={mutator}
        dataEndpoint={`/superset/fave_dashboards/${this.props.user.userId}/`}
        noDataText={this.props.localMessage.no_fav_dash}
        columns={this.props.localMessage.dash_fav_column}
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
Favorites.propTypes = propTypes;
