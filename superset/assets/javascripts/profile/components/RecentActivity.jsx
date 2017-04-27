import React from 'react';
import TableLoader from './TableLoader';
import moment from 'moment';
import $ from 'jquery';

const propTypes = {
  user: React.PropTypes.object,
  localMessage: React.PropTypes.object.isRequired,
};

export default class RecentActivity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recentActions: [],
    };
  }

  componentWillMount() {
    $.get(`/superset/recent_activity/${this.props.user.userId}/`, (data) => {
      this.setState({ recentActions: data });
    });
  }
  render() {
    const localMessage = this.props.localMessage;
    const mutator = function (data) {
      return data.map(row => {
        const data = {};
        data[localMessage.action] = row.action;
        data[localMessage.item] = <a href={row.item_url}>{row.item_title}</a>;
        data[localMessage.time] = moment.utc(row.time).fromNow();
        // _time = row.time;
        return data;
      });
    };
    return (
      <div>
        <TableLoader
          className="table table-condensed"
          mutator={mutator}
          sortable
          // columns={this.props.localMessage.recent_action_column}
          dataEndpoint={`/superset/recent_activity/${this.props.user.userId}/`}
          />
      </div>
    );
  }
}
RecentActivity.propTypes = propTypes;
