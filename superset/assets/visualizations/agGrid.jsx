const $ = require('jquery');
import d3 from 'd3';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {AgGridReact} from 'ag-grid-react';
import "ag-grid-enterprise";

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import 'ag-grid/dist/styles/theme-dark.css';
import 'ag-grid/dist/styles/theme-bootstrap.css';
import 'ag-grid/dist/styles/theme-material.css';
import 'ag-grid/dist/styles/theme-blue.css';

const propTypes = {
    form_data: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
};

let allOfTheData = [];
class AgGrid extends React.Component {
  constructor(props) {
    super(props);
    allOfTheData = this.props.data.records;
    this.state = {
        gridTheme: 'ag-blue',
        showToolPanel: false,
        quickFilterText: null,
    };
    this.gridOptions = {
        paginationPageSize: "15",
        onModelUpdated: function () {
            console.log('event onModelUpdated received');
        },
        rowBuffer: 10, // no need to set this, the default is fine for almost all scenarios
        floatingTopRowData: [],
        floatingBottomRowData: [],
        columnDefs: this.initColumnDefs(),
        rowGroupPanelShow: 'always',
        enableColResize: true,
    }
  }

  getAllRecordsByColumnName(columnName) {
      const data = [];
      this.props.data.records.forEach(r => {
          data.push(r[columnName]);
      });
      return data;
  }

  initColumnDefs() {
    var fd = this.props.form_data;

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

    var columnDefs = [];
    var columnNames = this.props.data.columns;
    columnNames.forEach(columnName => {
        var props = {
            headerName: columnName,
            field: columnName,
            enablePivot: true,
        }

        // set group
        fd['groupby'].forEach(m => {
            if (m === columnName) {
                props.enableRowGroup = true;
                // props.pinned = true;
                return;
            }
        });

        // set aggregation
        fd['metrics'].forEach(m => {
            if (m === columnName) {
                props.enableValue = true;
                return;
            }
        });
        
        props.cellStyle = function(params) {

            let styleJson = {};

            // add body style
            const style = fd.bodyValue;
            const array = style.split(";");
            let json = {};
            array.forEach(a => {
                const k = a.split(":");
                json[k[0]] = k[1];
            });
            $.extend(styleJson, json);

            // add column style
            for (let i = 1; i < 10; i++) {
                if (fd['colStyle_value_' + i] !== '') {
                    if (columnName === fd['colStyle_metric_' + i]) {
                        const style = fd['colStyle_value_' + i];
                        const array = style.split(";");
                        let json = {};
                        array.forEach(a => {
                            const k = a.split(":");
                            json[k[0]] = k[1];
                        });
                        $.extend(styleJson, json);
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
                            const style = fd['style_value_' + i];
                            const array = style.split(";");
                            let json = {};
                            array.forEach(a => {
                                const k = a.split(":");
                                json[k[0]] = k[1];
                            });
                            $.extend(styleJson, json);
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
                        const style = compareValues[i];
                        const array = style.split(";");
                        let json = {};
                        array.forEach(a => {
                            const k = a.split(":");
                            json[k[0]] = k[1];
                        });
                        $.extend(styleJson, json);
                    }
                    // delete the first element
                    compareMetricLefts[i].splice(0, 1);
                    compareMetricRights[i].splice(0, 1);
                    break;
                }
            }
            console.log(styleJson);
            return styleJson;
        };

        columnDefs.push(props);
    });

    // set parentHeader
    var data = [
        {
            parentName: 'book_details',
            children: ['book_type', 'book_author', 'book_name'],
        },
        {
            parentName: 'count_details',
            children: ['count', 'sum__id'],
        }
    ]
    
    for(let i=0; i<data.length; i++) {
        let parentProps = {};
        parentProps.headerName = data[i].parentName;
        parentProps.marryChildren = true;
        parentProps.children = [];
        let k = 0;
        for (let j=0; j<columnDefs.length; j++) {
            if ($.inArray(columnDefs[j-k].headerName, data[i].children) != -1) {
                parentProps.children.push(columnDefs[j-k]);
                columnDefs.splice(j-k, 1);
                k++;
            }
        }
        columnDefs.push(parentProps);
    }
    // console.log("==============");
    // console.log(columnDefs);
    return columnDefs;
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.createNewDatasource();
  }

  onThemeChanged(selected){
    let themeSelected = selected.currentTarget.value;
    this.setState({gridTheme: themeSelected});
  }

  onPageSizeChanged(selected) {
    this.gridOptions.paginationPageSize = new Number(selected.currentTarget.value);
    this.createNewDatasource();
  }

  onQuickFilterText(event) {
    this.setState({quickFilterText: event.target.value});
  }

  createNewDatasource() {
    if (!allOfTheData) {
        return;
    }
    let rowsThisPage = [];
    let dataSource = {
        getRows: function (params) {
            setTimeout( function() {
                rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                var lastRow = -1;
                if (allOfTheData.length <= params.endRow) {
                    lastRow = allOfTheData.length;
                }
                params.successCallback(rowsThisPage, lastRow);
            }, 500);
        }
    };
    this.setState({rowData: this.dataSource});
    this.gridOptions.api.setDatasource(dataSource);
  }

  render() {
    var themeTemplate = (
      <div style={{height: '30px', float: 'left' }}>
          Theme:
          <select onChange={this.onThemeChanged.bind(this)}>
              <option value="ag-blue" selected>blue</option>
              <option value="ag-bootstrap">bootstrap</option>
              <option value="ag-dark">dark</option>
              <option value="ag-fresh">fresh</option>
          </select>
      </div>
    );

    var pageSizeTemplate = (
        <div style={{height: '30px', marginLeft: '30px', float: 'left' }}>
            Page Size:
            <select onChange={this.onPageSizeChanged.bind(this)}>
                <option value="15" selected>15</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="100000000">all</option>
            </select>
        </div>
    );

    var filterTemplate = (
         <div style={{height: '30px', marginLeft: '30px', float: 'left' }}>
            filter:
            <input type="text" onChange={this.onQuickFilterText.bind(this)}
                placeholder="Type text to filter..." style={{height: '22px'}} />
        </div>
    );

    var gridTemplate = (
        <div  style={{height: this.props.height-30, width: '100%', textAlign: 'left'}} className={this.state.gridTheme}>
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

                rowSelection="multiple"     // 
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

                // all values as React props
                gridOptions={this.gridOptions}

                // listening for events
                onGridReady={this.onGridReady.bind(this)}
            />
        </div>
    );

    return (
        <div>
            <div style={{marginTop: '2px', overflow: 'hidden'}}>
                {themeTemplate}
                {pageSizeTemplate}
                {filterTemplate}
            </div>
            {gridTemplate}
        </div>
    )
  }
}
AgGrid.propTypes = propTypes;

function agGridVis(slice) {
    const refresh = function () {
        function onSuccess(json) {
            const data = json.data;
            const fd = json.form_data;
            slice.container.html('');
            ReactDOM.render(
                <AgGrid 
                    form_data= {json.form_data}
                    data={json.data}
                    height={slice.height()}
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
    }
  return {
    render: refresh,
    resize() {},
  };
}

module.exports = agGridVis;
