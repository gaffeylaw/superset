import React from 'react';
import { Alert, Button, Col, Modal } from 'react-bootstrap';

import Select from 'react-select';
import { Table } from 'reactable';
import shortid from 'shortid';
import { chooseMessage } from '../../explorev2/stores/language';
import zh_CN from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';


const propTypes = {
  onHide: React.PropTypes.func,
  query: React.PropTypes.object,
  show: React.PropTypes.bool,
};
const defaultProps = {
  show: false,
  query: {},
  onHide: () => { },
};

const localMessage = chooseMessage();

const CHART_TYPES = [
  { value: 'dist_bar', label: localMessage.dist_bar_viz, requiresTime: false },
  { value: 'pie', label: localMessage.pie_viz, requiresTime: false },
  { value: 'line', label: localMessage.line_viz, requiresTime: true },
  { value: 'bar', label: localMessage.bar_viz, requiresTime: true },
];
class VisualizeModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const uniqueId = shortid.generate();
    this.state = {
      chartType: CHART_TYPES[0],
      datasourceName: uniqueId,
      columns: {},
      hints: [],
    };
  }
  componentDidMount() {
    this.validate();
  }
  componentWillReceiveProps(nextProps) {
    this.setStateFromProps(nextProps);
  }
  setStateFromProps(props) {
    if (
      !props.query ||
      !props.query.results ||
      !props.query.results.columns) {
      return;
    }
    const columns = {};
    props.query.results.columns.forEach((col) => {
      columns[col.name] = col;
    });
    this.setState({ columns });
  }
  validate() {
    const hints = [];
    const cols = this.mergedColumns();
    const re = /^\w+$/;
    Object.keys(cols).forEach((colName) => {
      if (!re.test(colName)) {
        hints.push(
          <div>
            "{colName}" is not right as a column name, please alias it
            (as in SELECT count(*) <strong>AS my_alias</strong>) using only
            alphanumeric characters and underscores
          </div>);
      }
    });
    if (this.state.chartType === null) {
      hints.push(localMessage.pick_chart_type);
    } else if (this.state.chartType.requiresTime) {
      let hasTime = false;
      for (const colName in cols) {
        const col = cols[colName];
        if (col.hasOwnProperty('is_date') && col.is_date) {
          hasTime = true;
        }
      }
      if (!hasTime) {
        hints.push(localMessage.need_data_column);
      }
    }
    this.setState({ hints });
  }
  changeChartType(option) {
    this.setState({ chartType: option }, this.validate);
  }
  mergedColumns() {
    const columns = Object.assign({}, this.state.columns);
    if (this.props.query && this.props.query.results.columns) {
      this.props.query.results.columns.forEach((col) => {
        if (columns[col.name] === undefined) {
          columns[col.name] = col;
        }
      });
    }
    return columns;
  }
  visualize() {
    const vizOptions = {
      chartType: this.state.chartType.value,
      datasourceName: this.state.datasourceName,
      columns: this.state.columns,
      sql: this.props.query.sql,
      dbId: this.props.query.dbId,
    };
    window.open('/superset/sqllab_viz/?data=' + JSON.stringify(vizOptions));
  }
  changeDatasourceName(event) {
    this.setState({ datasourceName: event.target.value });
    this.validate();
  }
  changeCheckbox(attr, columnName, event) {
    let columns = this.mergedColumns();
    const column = Object.assign({}, columns[columnName], { [attr]: event.target.checked });
    columns = Object.assign({}, columns, { [columnName]: column });
    this.setState({ columns }, this.validate);
  }
  changeAggFunction(columnName, option) {
    let columns = this.mergedColumns();
    const val = (option) ? option.value : null;
    const column = Object.assign({}, columns[columnName], { agg: val });
    columns = Object.assign({}, columns, { [columnName]: column });
    this.setState({ columns }, this.validate);
  }
  render() {
    if (!(this.props.query) || !(this.props.query.results) || !(this.props.query.results.columns)) {
      return (
        <div className="VisualizeModal">
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Body>
              {localMessage.no_result_avaliable}
            </Modal.Body>
          </Modal>
        </div>
      );
    }
    const tableData = this.props.query.results.columns.map((col) => {
      const header = {};
      header[localMessage.vis_column] = col.name;
      header[localMessage.vis_is_dimension] = (
        <input
          type="checkbox"
          onChange={this.changeCheckbox.bind(this, 'is_dim', col.name)}
          checked={(this.state.columns[col.name]) ? this.state.columns[col.name].is_dim : false}
          className="form-control"
          />
      );
      header[localMessage.vis_is_date] = (
        <input
          type="checkbox"
          className="form-control"
          onChange={this.changeCheckbox.bind(this, 'is_date', col.name)}
          checked={(this.state.columns[col.name]) ? this.state.columns[col.name].is_date : false}
          />
      ),
        header[localMessage.vis_agg_func] = (
          <Select
            options={localMessage.agg_func_options}
            onChange={this.changeAggFunction.bind(this, col.name)}
            value={(this.state.columns[col.name]) ? this.state.columns[col.name].agg : null}
            />
        );
      return header;
    });
    const alerts = this.state.hints.map((hint, i) => (
      <Alert bsStyle="warning" key={i}>{hint}</Alert>
    ));
    const modal = (
      <div className="VisualizeModal">
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{localMessage.visualize}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alerts}
            <div className="row">
              <Col md={6}>
                {localMessage.vis_chart_type}
                <Select
                  name="select-chart-type"
                  placeholder={localMessage.chart_type}
                  options={CHART_TYPES}
                  value={(this.state.chartType) ? this.state.chartType.value : null}
                  autosize={false}
                  onChange={this.changeChartType.bind(this)}
                  />
              </Col>
              <Col md={6}>
                {localMessage.vis_datasource_name}
                <input
                  type="text"
                  className="form-control input-sm"
                  placeholder={localMessage.datasource_name}
                  onChange={this.changeDatasourceName.bind(this)}
                  value={this.state.datasourceName}
                  />
              </Col>
            </div>
            <hr />
            <Table
              className="table table-condensed"
              columns={localMessage.vis_columns}
              data={tableData}
              />
            <Button
              onClick={this.visualize.bind(this)}
              bsStyle="primary"
              disabled={(this.state.hints.length > 0)}
              >
              {localMessage.visualize}
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
    return modal;
  }
}
VisualizeModal.propTypes = propTypes;
VisualizeModal.defaultProps = defaultProps;

export default VisualizeModal;