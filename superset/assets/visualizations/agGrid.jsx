const $ = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
// import d3 from 'd3';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import 'ag-grid/dist/styles/theme-dark.css';
import 'ag-grid/dist/styles/theme-bootstrap.css';
import 'ag-grid/dist/styles/theme-material.css';
import 'ag-grid/dist/styles/theme-blue.css';

const Table = require('./table.js');

const propTypes = {
  form_data: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  height: React.PropTypes.number.isRequired,
  slice: React.PropTypes.object.isRequired,
};

let allOfTheData = [];
class AgGrid extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.form_data);
    allOfTheData = this.props.data.records;
    this.state = {
      gridTheme: 'ag-' + this.props.form_data.theme,
      showToolPanel: false,
      quickFilterText: null,
    };
    this.gridOptions = {
      paginationPageSize: this.props.form_data.pageSize,
      rowBuffer: 10, // no need to set this, the default is fine for almost all scenarios
      floatingTopRowData: [],
      floatingBottomRowData: [],
      // columnDefs: this.initColumnDefs(),
      // rowGroupPanelShow: 'always',
      enableColResize: true,
      // pivotPanelShow: 'always',
    };
    if (this.props.form_data.isPivot !== 'true') {
      // table
      this.gridOptions.pivotMode = false;
      this.gridOptions.columnDefs = this.initTableColumnDefs();
    } else {
      // pivot table
      this.gridOptions.pivotMode = true;
      this.gridOptions.functionsReadOnly = true;
      this.gridOptions.columnDefs = this.initPivotTableColumnDefs();
    }
  }

  getAllRecordsByColumnName(columnName) {
    const data = [];
    this.props.data.records.forEach(r => {
      data.push(r[columnName]);
    });
    return data;
  }

  initTableColumnDefs() {
    const fd = this.props.form_data;
    const TableFunctions = Table(this.props.slice, 'false').params;
    const slice = this.props.slice;

    // get compare info from form_data
    const compareMetricLefts = [];
    const compareMetricRights = [];
    const compareExprs = [];
    const compareValues = [];
    for (let i = 1; i < 10; i++) {
      if (fd['compare_expr_' + i] !== '') {
        compareMetricLefts.push(this.getAllRecordsByColumnName(fd['compare_metricLeft_' + i]));
        compareMetricRights.push(this.getAllRecordsByColumnName(fd['compare_metricRight_' + i]));
        compareExprs.push(fd['compare_expr_' + i]);
        compareValues.push(fd['compare_value_' + i]);
      }
    }

    const columnDefs = [];
    const columnNames = this.props.data.columns;
    columnNames.forEach(columnName => {
      const props = {
        headerName: columnName,
        field: columnName,
        enablePivot: true,
      };

      // set pinned
      if ($.inArray(columnName, fd.pinned_left.split(',')) !== -1) {
        props.pinned = 'left';
      }

      if ($.inArray(columnName, fd.pinned_right.split(',')) !== -1) {
        props.pinned = 'right';
      }

      // set group
      fd.groupby.forEach(m => {
        if (m === columnName) {
          props.enableRowGroup = true;
          // props.pinned = true;
          return;
        }
      });

      // set aggregation
      fd.metrics.forEach(m => {
        if (m === columnName) {
          props.enableValue = true;
          return;
        }
      });

      // set header width
      for (let i = 1; i < 50; i++) {
        if (fd['colStyle_value_' + i] !== '') {
          if (columnName === fd['colStyle_metric_' + i]) {
            const columnStyleArray = fd['colStyle_value_' + i].split(';');
            columnStyleArray.forEach(a => {
              const k = a.split(':');
              if (k[0] === 'width') {
                props.width = parseInt(k[1].substring(0, k[1].length - 2));
              }
            });
            break;
          }
        } else {
          break;
        }
      }

      props.cellStyle = function (params) {
        const styleJson = {};

        // add body style
        const bodyStyleArray = fd.bodyValue.split(';');
        const bodyStyleJson = {};
        bodyStyleArray.forEach(a => {
          const k = a.split(':');
          bodyStyleJson[k[0]] = k[1];
        });
        $.extend(styleJson, bodyStyleJson);

        // add column style
        for (let i = 1; i < 50; i++) {
          if (fd['colStyle_value_' + i] !== '') {
            if (columnName === fd['colStyle_metric_' + i]) {
              const columnStyleArray = fd['colStyle_value_' + i].split(';');
              const columnStyleJson = {};
              columnStyleArray.forEach(a => {
                const k = a.split(':');
                if (k[0] !== 'width') {
                  columnStyleJson[k[0]] = k[1];
                }
              });
              $.extend(styleJson, columnStyleJson);
              break;
            }
          } else {
            break;
          }
        }

        // add condition style
        for (let i = 1; i < 10; i++) {
          if (fd['style_expr_' + i] !== '') {
            if (columnName === fd['style_metric_' + i]) {
              let expr = fd['style_expr_' + i].replace(/x/g, params.value);
              // make '=' to '=='
              expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
              if ((expr.indexOf('$.inArray') === -1 && eval(expr))
                  || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1)) {
                // style(str to json)
                const conditionStyleArray = fd['style_value_' + i].split(';');
                const conditionStylejson = {};
                conditionStyleArray.forEach(a => {
                  const k = a.split(':');
                  conditionStylejson[k[0]] = k[1];
                });
                $.extend(styleJson, conditionStylejson);
              }
            }
          } else {
            break;
          }
        }

        // add two colums compare style
        for (let i = 0; i < compareExprs.length; i++) {
          if (columnName === fd['compare_metricLeft_' + (i + 1)]) {
            const expr = compareExprs[i].replace('x', compareMetricLefts[i][0])
                        .replace('y', compareMetricRights[i][0]).replace(/=/g, '==')
                        .replace(/>==/g, '>=').replace(/<==/g, '<=');
            // console.log(expr);
            if (params.value === compareMetricLefts[i][0] && eval(expr)) {
              // style(str to json)
              const compareStyleArray = compareValues[i].split(';');
              const compareStyleJson = {};
              compareStyleArray.forEach(a => {
                const k = a.split(':');
                compareStyleJson[k[0]] = k[1];
              });
              $.extend(styleJson, compareStyleJson);
            }
            // delete the first element
            compareMetricLefts[i].splice(0, 1);
            compareMetricRights[i].splice(0, 1);
            break;
          }
        }
        // console.log(styleJson);
        return styleJson;
      };

      props.cellRenderer = function (params) {
        // format number
        // let value = slice.d3format(columnName, params.value);
        let value = params.value;
        if ($.inArray(columnName, fd.metrics) !== -1 && !isNaN(value)) {
          value = slice.d3format(columnName, params.value)
        }
        // set link style
        for (let i = 1; i < 10; i++) {
          if (params.value === undefined || params.value === null) {
            return null;
          } else if (fd['navigate_expr_' + i] !== '') {
            if (columnName === fd['navigate_metric_' + i]) {
              let expr = fd['navigate_expr_' + i].replace(/x/g, params.value);
              // make '=' to '=='
              expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
              if ((expr.indexOf('$.inArray') === -1 && eval(expr))
                || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1)) {
                return '<a href="#">' + value + '</a>';
                break;
              }
            }
          } else {
            return value;
          }
        }
      };

      props.onCellClicked = function (params) {
        // console.log(params)
        // get groupby's value
        const groupby = [];
        for (let j = 0; j < fd.groupby.length; j++) {
          groupby.push(params.data[fd.groupby[j]]);
        }
        let navCount = 0;
        const navigates = [];
        for (let i = 1; i <= 10; i++) {
          if (fd['navigate_expr_' + i] !== '') {
            if (columnName === fd['navigate_metric_' + i]) {
              let expr = fd['navigate_expr_' + i].replace(/x/g, params.value);
              // make '=' to '=='
              expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
              if (((expr.indexOf('$.inArray') === -1 && eval(expr))
              || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1))) {
                navCount++;
                const openType = fd['navigate_open_' + i];
                const navHeight = (fd['navigate_height_' + i] === '') ? 300 :
                fd['navigate_height_' + i];
                const navWidth = (fd['navigate_width_' + i] === '') ? 300 :
                fd['navigate_width_' + i];
                const navType = fd['navigate_type_' + i];
                // navigate to dashboard
                if (navType === 'dashboard') {
                  const dash = JSON.parse(
                    TableFunctions.dashboardUrl(fd['navigate_dashboard_' + i]));
                  let url = dash.url;
                  const title = dash.title;
                  if (url) {
                    url = TableFunctions.convertDashUrl(dash, fd.groupby, null, groupby);
                    const postData = {
                      url: url,
                      title: title,
                      type: openType,
                      navHeight: navHeight,
                      navWidth: navWidth,
                      isDash: true,
                    };
                    navigates.push(postData);
                    // window.parent.postMessage(postData, '*');  // send message to navigate
                  }
                } else {
                  // navigate to slice
                  const slc = JSON.parse(TableFunctions.sliceUrl(fd['navigate_slice_' + i]));
                  let url = slc.url;
                  const title = slc.title;
                  if (url) {
                    const standalone = TableFunctions.GetQueryString(url, 'standalone', []);
                    const navGroupby = TableFunctions.GetQueryString(url, 'groupby', []);
                    if (standalone.length === 0) {
                      if (url.indexOf('standalone') !== -1) {
                        url = url.replace(/standalone=/, 'standalone=true');
                      } else {
                        url += '&standalone=true';
                      }
                    }
                    const sourceGroupby = fd.groupby;
                    url = TableFunctions.addFilter(url, sourceGroupby, navGroupby, null, groupby);
                    const postData = {
                      url: url,
                      title: title,
                      type: openType,
                      navHeight: navHeight,
                      navWidth: navWidth,
                    };
                    navigates.push(postData);
                    // window.parent.postMessage(postData, '*');  // send message to navigate
                  }
                }
              }
            }
            // check navigates and send message to navigate
            TableFunctions.handleNavigate(i, navigates);
          }
        }
      };

      columnDefs.push(props);
    });

    // set parentHeader
    const data = [];
    for (let i = 1; i < 20; i++) {
      if (fd['headerSetting_id_' + i] !== '' && fd['headerSetting_parentName_' + i] !== '') {
        data.push({
          parentName: fd['headerSetting_parentName_' + i],
          children: fd['headerSetting_children_' + i].split(',').map(a => { return a.toLowerCase() }),
          items: fd['headerSetting_items_' + i].split(',').map(a => { return a.toLowerCase() }),
        });
      } else {
        break;
      }
    }
    for (let i = 0; i < data.length; i++) {
      const parentProps = {};
      parentProps.headerName = data[i].parentName;
      parentProps.marryChildren = true;
      parentProps.children = [];
      let k = 0;
      const len = columnDefs.length;
      for (let j = 0; j < len; j++) {
        if ($.inArray(columnDefs[j - k].headerName.toLowerCase(), data[i].children) !== -1) {
          if ($.inArray(columnDefs[j - k].headerName.toLowerCase(), data[i].items) !== -1) {
            columnDefs[j - k].columnGroupShow = 'closed';
            parentProps.children.push(columnDefs[j - k]);
            // give close column another open column
            const openColumnObj = {};
            $.extend(openColumnObj, columnDefs[j - k]);
            openColumnObj.columnGroupShow = 'open';
            parentProps.children.push(openColumnObj);
          } else {
            columnDefs[j - k].columnGroupShow = 'open';
            parentProps.children.push(columnDefs[j - k]);
          }
          columnDefs.splice(j - k, 1);
          k++;
        }
      }
      columnDefs.push(parentProps);
    }
    // console.info(columnDefs);
    return columnDefs;
  }

  initPivotTableColumnDefs() {
    const fd = this.props.form_data;
    const columnDefs = [];
    fd.pivotSetting_groupby.split(',').forEach(function(val, index) {
      const props = {
        headerName: val,
        field: val,
      };
      props.rowGroupIndex = index;
      columnDefs.push(props);
    });
    fd.pivotSetting_columns.split(',').forEach(function(val, index) {
      const props = {
        headerName: val,
        field: val,
      };
      props.pivotIndex = index;
      columnDefs.push(props);
    });
    fd.pivotSetting_values.split(',').forEach(function(val) {
      const props = {
        headerName: val,
        field: val,
      };
      
      props.aggFunc = 'sum';
      columnDefs.push(props);
    });
    return columnDefs;
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.createNewDatasource();
  }

  onThemeChanged(selected) {
    const themeSelected = selected.currentTarget.value;
    this.setState({ gridTheme: themeSelected });
  }

  onPageSizeChanged(selected) {
    this.gridOptions.paginationPageSize = new Number(selected.currentTarget.value);
    this.createNewDatasource();
  }

  onQuickFilterText(event) {
    this.setState({ quickFilterText: event.target.value });
  }

  createNewDatasource() {
    if (!allOfTheData) {
      return;
    }
    let rowsThisPage = [];
    const dataSource = {
      getRows: function (params) {
        setTimeout (function () {
          rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
          let lastRow = -1;
          if (allOfTheData.length <= params.endRow) {
            lastRow = allOfTheData.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      },
    };
    this.setState({ rowData: this.dataSource });
    this.gridOptions.api.setDatasource(dataSource);
  }

  render() {
    const themeTemplate = (
      <div style={{ height: '30px', float: 'left' }}>
        主题:
        <select onChange={this.onThemeChanged.bind(this)} value={this.state.gridTheme}>
          <option value="ag-blue">blue</option>
          <option value="ag-bootstrap">bootstrap</option>
          <option value="ag-dark">dark</option>
          <option value="ag-fresh">fresh</option>
        </select>
      </div>
    );

    const pageSizeTemplate = (
      <div style={{ height: '30px', marginLeft: '30px', float: 'left' }}>
        页大小:
        <select
          onChange={this.onPageSizeChanged.bind(this)}
          value={this.gridOptions.paginationPageSize}
        >
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="100000000">all</option>
        </select>
      </div>
    );

    const filterTemplate = (
      <div style={{ height: '30px', marginLeft: '30px', float: 'left' }}>
        筛选:
        <input
          type="text"
          onChange={this.onQuickFilterText.bind(this)}
          placeholder="Type text to filter..." style={{ height: '22px' }}
        />
      </div>
    );

    const gridTemplate = (
      <div
        style={{ height: this.props.height - 30, width: '100%', textAlign: 'left' }}
        className={this.state.gridTheme}
      >
        <AgGridReact
          // binding to simple properties
          columnDefs={this.gridOptions.columnDefs}
          rowData={this.state.rowData}

          // binding to simple properties
          showToolPanel={this.state.showToolPanel}
          quickFilterText={this.state.quickFilterText}

          // group properties
          suppressRowClickSelection="false"
          groupDefaultExpanded="1"
          groupIncludeFooter="true"
          groupUseEntireRow="false"

          rowSelection="multiple"
          enableColResize="true"      // 列大小调整
          enableSorting="true"        // 排序
          enableFilter="true"         // 筛选
          groupHeaders="true"         // 列groupby header
          rowHeight="22"              // 行高
          debug="true"
          enableStatusBar="true"      // 状态
          enableRangeSelection="true" // 多选
          groupIncludeFooter="true"   // footer
          rowModelType="pagination"
          suppressAutoSize="true"

          // all values as React props
          gridOptions={this.gridOptions}

          // listening for events
          onGridReady={this.onGridReady.bind(this)}
        />
      </div>
    );

    return (
      <div>
        <div style={{ marginTop: '2px', overflow: 'hidden' }}>
          {themeTemplate}
          {pageSizeTemplate}
          {filterTemplate}
        </div>
        {gridTemplate}
      </div>
    );
  }
}
AgGrid.propTypes = propTypes;

function agGridVis(slice) {
  const refresh = function () {
    function onSuccess(json) {
      slice.container.html('');
      ReactDOM.render(
        <AgGrid
          form_data={json.form_data}
          data={json.data}
          height={slice.height()}
          slice={slice}
        />,
        document.getElementById(slice.containerId)
      );
      slice.done(json);
    }

    function onError(xhr) {
      slice.error(xhr.responseText, xhr);
      return;
    }

    $.getJSON(slice.jsonEndpoint(), onSuccess).fail(onError);
  };
  return {
    render: refresh,
    resize() {},
  };
}

module.exports = agGridVis;
