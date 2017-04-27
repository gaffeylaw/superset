import React from 'react';

import moment from 'moment';
import { Table } from 'reactable';
import { Label, ProgressBar } from 'react-bootstrap';
import Link from './Link';
import VisualizeModal from './VisualizeModal';
import ResultSet from './ResultSet';
import ModalTrigger from '../../components/ModalTrigger';
import HighlightedSql from './HighlightedSql';
import { STATE_BSSTYLE_MAP } from '../constants';
import { fDuration } from '../../modules/dates';
import { getLink } from '../../../utils/common';

const propTypes = {
  columns: React.PropTypes.array,
  actions: React.PropTypes.object,
  queries: React.PropTypes.array,
  onUserClicked: React.PropTypes.func,
  onDbClicked: React.PropTypes.func,
  localMessage: React.PropTypes.object.isRequired,
};
const defaultProps = {
  columns: ['started', 'duration', 'rows'],
  queries: [],
  onUserClicked: () => {},
  onDbClicked: () => {},
};


class QueryTable extends React.PureComponent {
  constructor(props) {
    super(props);
    const uri = window.location.toString();
    const cleanUri = uri.substring(0, uri.indexOf('#'));
    this.state = {
      cleanUri,
      showVisualizeModal: false,
      activeQuery: null,
    };
  }
  getQueryLink(dbId, sql) {
    const params = ['dbid=' + dbId, 'sql=' + sql, 'title='+this.props.localMessage.untitled_query];
    const link = getLink(this.state.cleanUri, params);
    return encodeURI(link);
  }
  hideVisualizeModal() {
    this.setState({ showVisualizeModal: false });
  }
  showVisualizeModal(query) {
    this.setState({ activeQuery: query, showVisualizeModal: true });
  }
  restoreSql(query) {
    this.props.actions.queryEditorSetSql({ id: query.sqlEditorId }, query.sql);
  }

  openQueryInNewTab(query) {
    this.props.actions.cloneQueryToNewTab(query);
  }
  openAsyncResults(query) {
    this.props.actions.fetchQueryResults(query);
  }
  clearQueryResults(query) {
    this.props.actions.clearQueryResults(query);
  }
  removeQuery(query) {
    this.props.actions.removeQuery(query);
  }

  render() {
    const data = this.props.queries.map((query) => {
      const q = Object.assign({}, query);
      if (q.endDttm) {
        q[this.props.localMessage.duration] = fDuration(q.startDttm, q.endDttm);
      }
      if (this.props.localMessage.date)
      q[this.props.localMessage.date] = moment(q.startDttm).format('MMM Do YYYY');
      if (this.props.localMessage.user)
      q[this.props.localMessage.user] = (
        <button
          className="btn btn-link btn-xs"
          onClick={this.props.onUserClicked.bind(this, q.userId)}
        >
          {q.user}
        </button>
      );
      if (this.props.localMessage.db)
      q[this.props.localMessage.db] = (
        <button
          className="btn btn-link btn-xs"
          onClick={this.props.onDbClicked.bind(this, q.dbId)}
        >
          {q.db}
        </button>
      );
      if (this.props.localMessage.started)
      q[this.props.localMessage.started] = moment(q.startDttm).format('HH:mm:ss');
      if (this.props.localMessage.querylink)
      q[this.props.localMessage.querylink] = (
        <div style={{ width: '100px' }}>
          <a
            href={this.getQueryLink(q.dbId, q.sql)}
            className="btn btn-primary btn-xs"
          >
            <i className="fa fa-external-link" />{this.props.localMessage.open_in_sql_editor}
          </a>
        </div>
      );
      q.sql = (
        <HighlightedSql sql={q.sql} rawSql={q.executedSql} shrink maxWidth={60} 
        localMessage={this.props.localMessage}/>
      );
      if (q.resultsKey) {
        const localMessage = this.props.localMessage;
        q[this.props.localMessage.output] = (
          <ModalTrigger
            bsSize="large"
            className="ResultsModal"
            triggerNode={(
              <Label
                bsStyle="info"
                style={{ cursor: 'pointer' }}
              >
                {this.props.localMessage.view_results}
              </Label>
            )}
            modalTitle={this.props.localMessage.data_preview}
            beforeOpen={this.openAsyncResults.bind(this, query)}
            onExit={this.clearQueryResults.bind(this, query)}
            modalBody={<ResultSet showSql query={query} actions={this.props.actions} 
            localMessage={localMessage}/>}
          />
        );
      } else {
        q[this.props.localMessage.output] = [q.schema, q.tempTable].filter((v) => (v)).join('.');
      }
      q[this.props.localMessage.progress] = (
        <ProgressBar
          style={{ width: '75px' }}
          striped
          now={q.progress}
          label={`${q.progress}%`}
        />
      );
      let errorTooltip;
      if (q.errorMessage) {
        errorTooltip = (
          <Link tooltip={q.errorMessage}>
            <i className="fa fa-exclamation-circle text-danger" />
          </Link>
        );
      }
      q[this.props.localMessage.state] = (
        <div>
          <span className={'m-r-3 label label-' + STATE_BSSTYLE_MAP[q.state]}>
            {this.props.localMessage[q.state]}
          </span>
          {errorTooltip}
        </div>
      );
      if (this.props.localMessage.actions)
      q[this.props.localMessage.actions] = (
        <div style={{ width: '75px' }}>
          <Link
            className="fa fa-line-chart m-r-3"
            tooltip={this.props.localMessage.visualize_query_data}
            onClick={this.showVisualizeModal.bind(this, query)}
          />
          <Link
            className="fa fa-pencil m-r-3"
            onClick={this.restoreSql.bind(this, query)}
            tooltip={this.props.localMessage.overwrite_query_text}
            placement="top"
          />
          <Link
            className="fa fa-plus-circle m-r-3"
            onClick={this.openQueryInNewTab.bind(this, query)}
            tooltip={this.props.localMessage.run_query_new_tab}
            placement="top"
          />
          <Link
            className="fa fa-trash m-r-3"
            tooltip={this.props.localMessage.remove_query_from_log}
            onClick={this.removeQuery.bind(this, query)}
          />
        </div>
      );
      return q;
    }).reverse();
    return (
      <div className="QueryTable">
        <VisualizeModal
          show={this.state.showVisualizeModal}
          query={this.state.activeQuery}
          onHide={this.hideVisualizeModal.bind(this)}
        />
        <Table
          columns={this.props.columns}
          className="table table-condensed"
          data={data}
        />
      </div>
    );
  }
}
QueryTable.propTypes = propTypes;
QueryTable.defaultProps = defaultProps;

export default QueryTable;