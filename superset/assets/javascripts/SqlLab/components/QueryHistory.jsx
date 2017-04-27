import React from 'react';

import QueryTable from './QueryTable';
import { Alert } from 'react-bootstrap';

const propTypes = {
  queries: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  localMessage: React.PropTypes.object.isRequired,
};

const QueryHistory = (props) => {
  if (props.queries.length > 0) {
    return (
      <QueryTable
        columns={props.localMessage.query_history_columns}
        queries={props.queries}
        actions={props.actions}
        localMessage={props.localMessage}
      />
    );
  }
  return (
    <Alert bsStyle="info">
      {props.localMessage.no_query_history}
    </Alert>
  );
};
QueryHistory.propTypes = propTypes;

export default QueryHistory;
