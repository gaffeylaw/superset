const $ = require('jquery');
import d3 from 'd3';
import React, { Component } from 'react';

import {AgGridReact} from 'ag-grid-react';
import "ag-grid-enterprise";

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import 'ag-grid/dist/styles/theme-dark.css';
import 'ag-grid/dist/styles/theme-bootstrap.css';
import 'ag-grid/dist/styles/theme-material.css';
import 'ag-grid/dist/styles/theme-blue.css';



function tableVis(slice) {

    let count = 0;
    function init() {
        function onSuccess(json) {
            const data = json.data;
            const fd = json.form_data;
            console.log(data);
            console.log(fd);
        }
        function onError(json) {
            slice.error(xhr.responseText, xhr);
            return;
        }
        $.getJSON(slice.jsonEndpoint(), onSuccess).fail(onError);

        var div = d3.select(slice.selector);
        div.html (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">hello world</p>
            </div>
        );
    }
  return {
    render: init,
    resize() {},
  };
}

module.exports = tableVis;
