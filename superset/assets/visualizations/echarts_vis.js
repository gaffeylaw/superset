// JS
const d3 = require('d3');
const echarts = require('echarts');
const $ = require('jquery');

require('./dark.js');
require('./macarons.js');
require('./vintage.js');
require('./roma.js');
require('./infographic.js');
require('./shine.js');

// CSS

const minBarWidth = 15;
const animationTime = 1000;

function echartsVis(slice) {
  let chart;
  let colorKey = 'key';
  
  const render = function () {
    // $.getJSON(slice.jsonEndpoint(), function (payload) {
    d3.json(slice.jsonEndpoint(), function (error, payload) {
      slice.container.html('')
      // init the echarts
      let height = slice.height() - 15;
      let width = slice.width();
      chart = echarts.init(document.getElementById(slice.containerId),'macarons');
     
      slice.clearError();

      // let width = slice.width();
      const fd = payload.form_data;
      const dt = payload.data;

      const vizType = fd.viz_type;

      const f = d3.format('.3s');
      let steps = 30;
      let legend = [];
      let xAxis = [];
      let yAxis = [];
      let series = [];

      let y_metrics = [];
      let only_left = false;
      let is_avg = false;
      let is_max_min = false;
      let is_bar_value = false;
      let y_axis_name = '';
      let y_degree = '';
      let y_format = '';
      let y_left_metrics = [];
      let y_right_metrics = [];
      let y_left_format = [];
      let y_right_format = [];
      let y_left_degree = [];
      let y_right_degree = [];

      let x_metrics = [];
      let only_bottom = false;
      let x_axis_name = '';
      let x_degree = '';
      let x_format = '';
      let x_bottom_metrics = [];
      let x_top_metrics = [];
      let x_bottom_format = [];
      let x_top_format = [];
      let x_bottom_degree = [];
      let x_top_degree = [];

      let line_choice = [];
      let bar_choice = [];

      const drawGraph = function () {
        switch (vizType) {
        
          case 'echarts_bar':
            y_metrics = fd.y_metrics;
            only_left = fd.only_left;
            is_avg = fd.is_avg;
            is_max_min = fd.is_max_min;
            is_bar_value = fd.is_bar_value;
            y_axis_name = fd.y_axis_name;
            y_degree = fd.y_degree;
            y_format = fd.y_format;
            y_left_metrics = fd.y_left_metrics;
            y_right_metrics = fd.y_right_metrics;
            y_left_format = [];
            y_right_format = [];
            y_left_degree = [];
            y_right_degree = [];

            if ($.trim(fd.y_left_format)) {
              try{
                y_left_format = $.trim(fd.y_left_format).split(';');
              } catch(err){
                alert('Invalid format of y_left_format!')
              }
            }

            if ($.trim(fd.y_right_format)) {
              try{
                y_right_format = $.trim(fd.y_right_format).split(';');
              } catch(err){
                alert('Invalid format of y_right_format!')
              }
            }

            if ($.trim(fd.y_left_degree)) {
              try{
                y_left_degree = $.trim(fd.y_left_degree).split(';');
              } catch(err){
                alert('Invalid format of y_left_degree!')
              }
            }

            if ($.trim(fd.y_right_degree)) {
              try{
                y_right_degree = $.trim(fd.y_right_degree).split(';');
              } catch(err){
                alert('Invalid format of y_right_degree!')
              }
            }

            // set the height step
            if (height <= 200){
              steps = 40;
            } else if (height >200 && height <= 320) {
              steps = 30;
            } else {
              steps = 15;
            }

            // 1.setup the legend from fd.metrics
            if (y_metrics && only_left) {
              legend = y_metrics;
            }else if (!only_left){
              if (y_left_metrics && y_right_metrics) {
                legend = y_left_metrics.concat(y_right_metrics) ;
              } else if (y_right_metrics) {
                legend = y_right_metrics;
              } else if (y_left_metrics) {
                legend = y_left_metrics;
              } else {
                alert('Please select a metrics!')
              }
            }

            // 2.setup the xAxis from fd.groupby
            if (fd.groupby) {
              for (var i = 0; i < fd.groupby.length; i++) {
                const xAxisValue = [];
                dt.records.forEach(d => {
                  xAxisValue.push(d[fd.groupby[i]])
                })

                xAxis[i] = {
                  type: 'category',
                  data: xAxisValue,
                  position: 'bottom',
                  offset: 25 * i,
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              }
            }
            
            // 3.setup the yAxis from fd.metrics
            // 3.0.the Y axis
            if (y_metrics && only_left) {
              let y_degree_p = {};
              if (y_degree) {
                y_degree_p = $.parseJSON(y_degree);
              }
              yAxis.push({
                type: 'value',
                name: y_axis_name,
                position: 'left',
                axisLabel: {
                    formatter: y_format == null ? '{value}' : '{value} ' + y_format
                },
                min: y_degree_p.min,
                max: y_degree_p.max,
              })
                
            }
            // 3.1.left of the Y axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                let y_degree_p = {};
                if (y_left_degree[i]) {
                  y_degree_p = $.parseJSON(y_left_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_left_metrics[i],
                  offset: 80 * i,
                  position: 'left',
                  axisLabel: {
                      formatter: y_left_format[i] == null ? '{value}' : '{value} ' + y_left_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                  
              }
            }
            // 3.2.right of the Y axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                let y_degree_p = {};
                if (y_right_degree[i]) {
                  y_degree_p = $.parseJSON(y_right_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_right_metrics[i],
                  offset: 80 * i,
                  position: 'right',
                  axisLabel: {
                      formatter: y_right_format[i] == null ? '{value}' : '{value} ' + y_right_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                
              }
            }
            // 4.setup the series from the fd.metrics and dt.records
            // 4.0.the axis
            if (y_metrics && only_left) {
              for (var i = 0; i < y_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_metrics[i],
                    type: 'bar',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_metrics[i],
                    type: 'bar',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }
            // 4.1.left of the axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_left_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_left_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_left_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }

            // 4.2.right of the axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_right_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_right_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_right_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }

                
              }
            }

            var option = {
                height: height * 0.8 - steps,
                grid: {
                    right: fd.right_padding == null ? '0%' : fd.right_padding,
                    left: fd.left_padding == null ? '0%' : fd.left_padding,
                    top: fd.top_padding == null ? '0%' : fd.top_padding,
                    bottom: fd.bottom_padding == null ? '0%' : fd.bottom_padding,
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: legend
                },
                xAxis: xAxis,
                yAxis: yAxis,
                series: series
            };

            chart.setOption(option);

            break;

          case 'echarts_bar_h':
            x_metrics = fd.x_metrics;
            only_bottom = fd.only_bottom;
            is_avg = fd.is_avg;
            is_max_min = fd.is_max_min;
            is_bar_value = fd.is_bar_value;
            x_axis_name = fd.x_axis_name;
            x_degree = fd.x_degree;
            x_format = fd.x_format;
            x_bottom_metrics = fd.x_bottom_metrics;
            x_top_metrics = fd.x_top_metrics;
            x_bottom_format = [];
            x_top_format = [];
            x_bottom_degree = [];
            x_top_degree = [];

            if ($.trim(fd.x_bottom_format)) {
              try{
                x_bottom_format = $.trim(fd.x_bottom_format).split(';');
              } catch(err){
                alert('Invalid format of x_bottom_format!')
              }
            }

            if ($.trim(fd.x_top_format)) {
              try{
                x_top_format = $.trim(fd.x_top_format).split(';');
              } catch(err){
                alert('Invalid format of x_top_format!')
              }
            }

            if ($.trim(fd.x_bottom_degree)) {
              try{
                x_bottom_degree = $.trim(fd.x_bottom_degree).split(';');
              } catch(err){
                alert('Invalid format of x_bottom_degree!')
              }
            }

            if ($.trim(fd.x_top_degree)) {
              try{
                x_top_degree = $.trim(fd.x_top_degree).split(';');
              } catch(err){
                alert('Invalid format of x_top_degree!')
              }
            }

            // set the height step
            if (height <= 200){
              steps = 40;
            } else if (height >200 && height <= 320) {
              steps = 30;
            } else {
              steps = 15;
            }

            // 1.setup the legend from fd.metrics
            if (x_metrics && only_bottom) {
              legend = x_metrics;
            }else if (!only_bottom){
              if (x_bottom_metrics && x_top_metrics) {
                legend = x_bottom_metrics.concat(x_top_metrics) ;
              } else if (x_top_metrics) {
                legend = x_top_metrics;
              } else if (x_bottom_metrics) {
                legend = x_bottom_metrics;
              } else {
                alert('Please select a metrics!')
              }
            }

            // 2.setup the xAxis from fd.groupby
            if (fd.groupby) {
              for (var i = 0; i < fd.groupby.length; i++) {
                const yAxisValue = [];
                dt.records.forEach(d => {
                  yAxisValue.push(d[fd.groupby[i]])
                })

                yAxis[i] = {
                  type: 'category',
                  data: yAxisValue,
                  position: 'bottom',
                  offset: 25 * i,
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              }
            }
            
            // 3.setup the xAxis from fd.metrics
            // 3.0.the X axis
            if (x_metrics && only_bottom) {
              let x_degree_p = {};
              if (x_degree) {
                x_degree_p = $.parseJSON(x_degree);
              }
              xAxis.push({
                type: 'value',
                name: x_axis_name,
                position: 'left',
                axisLabel: {
                    formatter: x_format == null ? '{value}' : '{value} ' + x_format
                },
                min: x_degree_p.min,
                max: x_degree_p.max,
              })
                
            }
            // 3.1.left of the X axis
            if (x_bottom_metrics && !only_bottom) {
              for (var i = 0; i < x_bottom_metrics.length; i++) {
                let x_degree_p = {};
                if (x_bottom_degree[i]) {
                  x_degree_p = $.parseJSON(x_bottom_degree[i]);
                }
                xAxis.push({
                  type: 'value',
                  name: x_bottom_metrics[i],
                  offset: 80 * i,
                  position: 'left',
                  axisLabel: {
                      formatter: x_bottom_format[i] == null ? '{value}' : '{value} ' + x_bottom_format[i]
                  },
                  min: x_degree_p == {} ? 'null' : x_degree_p.min,
                  max: x_degree_p == {} ? 'null' : x_degree_p.max,
                })
                  
              }
            }
            // 3.2.right of the X axis
            if (x_top_metrics && !only_bottom) {
              for (var i = 0; i < x_top_metrics.length; i++) {
                let x_degree_p = {};
                if (x_top_degree[i]) {
                  x_degree_p = $.parseJSON(x_top_degree[i]);
                }
                xAxis.push({
                  type: 'value',
                  name: x_top_metrics[i],
                  offset: 80 * i,
                  position: 'right',
                  axisLabel: {
                      formatter: x_top_format[i] == null ? '{value}' : '{value} ' + x_top_format[i]
                  },
                  min: x_degree_p == {} ? 'null' : x_degree_p.min,
                  max: x_degree_p == {} ? 'null' : x_degree_p.max,
                })
                
              }
            }
            // 4.setup the series from the fd.metrics and dt.records
            // 4.0.the axis
            if (x_metrics && only_bottom) {
              for (var i = 0; i < x_metrics.length; i++) {
                const xAxisValue = [];

                dt.records.forEach(d => {
                  xAxisValue.push(d[x_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: x_metrics[i],
                    type: 'bar',
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'inside'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: x_metrics[i],
                    type: 'bar',
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'inside'
                        }
                    },
                  })
                }
                
              }
            }
            // 4.1.left of the axis
            if (x_bottom_metrics && !only_bottom) {
              for (var i = 0; i < x_bottom_metrics.length; i++) {
                const xAxisValue = [];

                dt.records.forEach(d => {
                  xAxisValue.push(d[x_bottom_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: x_bottom_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'inside'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: x_bottom_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'inside'
                        }
                    },
                  })
                }
                
              }
            }

            // 4.2.right of the axis
            if (x_top_metrics && !only_bottom) {
              for (var i = 0; i < x_top_metrics.length; i++) {
                const xAxisValue = [];

                dt.records.forEach(d => {
                  xAxisValue.push(d[x_top_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: x_top_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: x_top_metrics[i],
                    type: 'bar',
                    yAxisIndex: i,
                    data: xAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'inside'
                        }
                    },
                  })
                }

                
              }
            }

            var option = {
                height: height * 0.8 - steps,
                grid: {
                    right: fd.right_padding == null ? '0%' : fd.right_padding,
                    left: fd.left_padding == null ? '0%' : fd.left_padding,
                    top: fd.top_padding == null ? '0%' : fd.top_padding,
                    bottom: fd.bottom_padding == null ? '0%' : fd.bottom_padding,
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {show: false, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: legend
                },
                xAxis: xAxis,
                yAxis: yAxis,
                series: series
            };

            chart.setOption(option);

            break;

          case 'echarts_line':
            y_metrics = fd.y_metrics;
            only_left = fd.only_left;
            is_avg = fd.is_avg;
            is_max_min = fd.is_max_min;
            is_bar_value = fd.is_bar_value;
            y_axis_name = fd.y_axis_name;
            y_degree = fd.y_degree;
            y_format = fd.y_format;
            y_left_metrics = fd.y_left_metrics;
            y_right_metrics = fd.y_right_metrics;
            y_left_format = [];
            y_right_format = [];
            y_left_degree = [];
            y_right_degree = [];

            if ($.trim(fd.y_left_format)) {
              try{
                y_left_format = $.trim(fd.y_left_format).split(';');
              } catch(err){
                alert('Invalid format of y_left_format!')
              }
            }

            if ($.trim(fd.y_right_format)) {
              try{
                y_right_format = $.trim(fd.y_right_format).split(';');
              } catch(err){
                alert('Invalid format of y_right_format!')
              }
            }

            if ($.trim(fd.y_left_degree)) {
              try{
                y_left_degree = $.trim(fd.y_left_degree).split(';');
              } catch(err){
                alert('Invalid format of y_left_degree!')
              }
            }

            if ($.trim(fd.y_right_degree)) {
              try{
                y_right_degree = $.trim(fd.y_right_degree).split(';');
              } catch(err){
                alert('Invalid format of y_right_degree!')
              }
            }

            // set the height step
            if (height <= 200){
              steps = 40;
            } else if (height >200 && height <= 320) {
              steps = 30;
            } else {
              steps = 15;
            }

            // 1.setup the legend from fd.metrics
            if (y_metrics && only_left) {
              legend = y_metrics;
            }else if (!only_left){
              if (y_left_metrics && y_right_metrics) {
                legend = y_left_metrics.concat(y_right_metrics) ;
              } else if (y_right_metrics) {
                legend = y_right_metrics;
              } else if (y_left_metrics) {
                legend = y_left_metrics;
              } else {
                alert('Please select a metrics!')
              }
            }

            // 2.setup the xAxis from fd.groupby
            if (fd.groupby) {
              for (var i = 0; i < fd.groupby.length; i++) {
                const xAxisValue = [];
                dt.records.forEach(d => {
                  xAxisValue.push(d[fd.groupby[i]])
                })

                xAxis[i] = {
                  type: 'category',
                  data: xAxisValue,
                  position: 'bottom',
                  offset: 25 * i,
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              }
            }
            
            // 3.setup the yAxis from fd.metrics
            // 3.0.the Y axis
            if (y_metrics && only_left) {
              let y_degree_p = {};
              if (y_degree) {
                y_degree_p = $.parseJSON(y_degree);
              }
              yAxis.push({
                type: 'value',
                name: y_axis_name,
                position: 'left',
                axisLabel: {
                    formatter: y_format == null ? '{value}' : '{value} ' + y_format
                },
                min: y_degree_p.min,
                max: y_degree_p.max,
              })
                
            }
            // 3.1.left of the Y axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                let y_degree_p = {};
                if (y_left_degree[i]) {
                  y_degree_p = $.parseJSON(y_left_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_left_metrics[i],
                  offset: 80 * i,
                  position: 'left',
                  axisLabel: {
                      formatter: y_left_format[i] == null ? '{value}' : '{value} ' + y_left_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                  
              }
            }
            // 3.2.right of the Y axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                let y_degree_p = {};
                if (y_right_degree[i]) {
                  y_degree_p = $.parseJSON(y_right_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_right_metrics[i],
                  offset: 80 * i,
                  position: 'right',
                  axisLabel: {
                      formatter: y_right_format[i] == null ? '{value}' : '{value} ' + y_right_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                
              }
            }
            // 4.setup the series from the fd.metrics and dt.records
            // 4.0.the axis
            if (y_metrics && only_left) {
              for (var i = 0; i < y_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_metrics[i],
                    type: 'line',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_metrics[i],
                    type: 'line',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }
            // 4.1.left of the axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_left_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_left_metrics[i],
                    type: 'line',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_left_metrics[i],
                    type: 'line',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }

            // 4.2.right of the axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_right_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_right_metrics[i],
                    type: 'line',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_right_metrics[i],
                    type: 'line',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }

                
              }
            }

            var option = {
                height: height * 0.8 - steps,
                grid: {
                    right: fd.right_padding == null ? '0%' : fd.right_padding,
                    left: fd.left_padding == null ? '0%' : fd.left_padding,
                    top: fd.top_padding == null ? '0%' : fd.top_padding,
                    bottom: fd.bottom_padding == null ? '0%' : fd.bottom_padding,
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: legend
                },
                xAxis: xAxis,
                yAxis: yAxis,
                series: series
            };

            chart.setOption(option);

            break;

          case 'echarts_line_bar':
            y_metrics = fd.y_metrics;
            only_left = fd.only_left;
            is_avg = fd.is_avg;
            is_max_min = fd.is_max_min;
            is_bar_value = fd.is_bar_value;
            y_axis_name = fd.y_axis_name;
            y_degree = fd.y_degree;
            y_format = fd.y_format;
            y_left_metrics = fd.y_left_metrics;
            y_right_metrics = fd.y_right_metrics;
            y_left_format = [];
            y_right_format = [];
            y_left_degree = [];
            y_right_degree = [];
            line_choice = fd.line_choice;
            bar_choice = fd.bar_choice;

            if ($.trim(fd.y_left_format)) {
              try{
                y_left_format = $.trim(fd.y_left_format).split(';');
              } catch(err){
                alert('Invalid format of y_left_format!')
              }
            }

            if ($.trim(fd.y_right_format)) {
              try{
                y_right_format = $.trim(fd.y_right_format).split(';');
              } catch(err){
                alert('Invalid format of y_right_format!')
              }
            }

            if ($.trim(fd.y_left_degree)) {
              try{
                y_left_degree = $.trim(fd.y_left_degree).split(';');
              } catch(err){
                alert('Invalid format of y_left_degree!')
              }
            }

            if ($.trim(fd.y_right_degree)) {
              try{
                y_right_degree = $.trim(fd.y_right_degree).split(';');
              } catch(err){
                alert('Invalid format of y_right_degree!')
              }
            }

            // set the height step
            if (height <= 200){
              steps = 40;
            } else if (height >200 && height <= 320) {
              steps = 30;
            } else {
              steps = 15;
            }

            // 1.setup the legend from fd.metrics
            if (y_metrics && only_left) {
              legend = y_metrics;
            }else if (!only_left){
              if (y_left_metrics && y_right_metrics) {
                legend = y_left_metrics.concat(y_right_metrics) ;
              } else if (y_right_metrics) {
                legend = y_right_metrics;
              } else if (y_left_metrics) {
                legend = y_left_metrics;
              } else {
                alert('Please select a metrics!')
              }
            }

            // 2.setup the xAxis from fd.groupby
            if (fd.groupby) {
              for (var i = 0; i < fd.groupby.length; i++) {
                const xAxisValue = [];
                dt.records.forEach(d => {
                  xAxisValue.push(d[fd.groupby[i]])
                })

                xAxis[i] = {
                  type: 'category',
                  data: xAxisValue,
                  position: 'bottom',
                  offset: 25 * i,
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              }
            }
            
            // 3.setup the yAxis from fd.metrics
            // 3.0.the Y axis
            if (y_metrics && only_left) {
              let y_degree_p = {};
              if (y_degree) {
                y_degree_p = $.parseJSON(y_degree);
              }
              yAxis.push({
                type: 'value',
                name: y_axis_name,
                position: 'left',
                axisLabel: {
                    formatter: y_format == null ? '{value}' : '{value} ' + y_format
                },
                min: y_degree_p.min,
                max: y_degree_p.max,
              })
                
            }
            // 3.1.left of the Y axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                let y_degree_p = {};
                if (y_left_degree[i]) {
                  y_degree_p = $.parseJSON(y_left_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_left_metrics[i],
                  offset: 80 * i,
                  position: 'left',
                  axisLabel: {
                      formatter: y_left_format[i] == null ? '{value}' : '{value} ' + y_left_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                  
              }
            }
            // 3.2.right of the Y axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                let y_degree_p = {};
                if (y_right_degree[i]) {
                  y_degree_p = $.parseJSON(y_right_degree[i]);
                }
                yAxis.push({
                  type: 'value',
                  name: y_right_metrics[i],
                  offset: 80 * i,
                  position: 'right',
                  axisLabel: {
                      formatter: y_right_format[i] == null ? '{value}' : '{value} ' + y_right_format[i]
                  },
                  min: y_degree_p == {} ? 'null' : y_degree_p.min,
                  max: y_degree_p == {} ? 'null' : y_degree_p.max,
                })
                
              }
            }
            // 4.setup the series from the fd.metrics and dt.records
            // 4.0.the axis
            if (y_metrics && only_left) {
              for (var i = 0; i < y_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_metrics[i],
                    type: $.inArray(y_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_metrics[i],
                    type: $.inArray(y_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }
            // 4.1.left of the axis
            if (y_left_metrics && !only_left) {
              for (var i = 0; i < y_left_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_left_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_left_metrics[i],
                    type: $.inArray(y_left_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_left_metrics[i],
                    type: $.inArray(y_left_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }
                
              }
            }

            // 4.2.right of the axis
            if (y_right_metrics && !only_left) {
              for (var i = 0; i < y_right_metrics.length; i++) {
                const yAxisValue = [];

                dt.records.forEach(d => {
                  yAxisValue.push(d[y_right_metrics[i]])
                })
                
                if (is_avg) {
                  series.push({
                    name: y_right_metrics[i],
                    type: $.inArray(y_right_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                } else {
                  series.push({
                    name: y_right_metrics[i],
                    type: $.inArray(y_right_metrics[i], line_choice) !== -1 ? 'line' : 'bar',
                    yAxisIndex: i,
                    data: yAxisValue,
                    markPoint: {
                        data: [
                           { 
                             type: is_max_min == false ? 'null':'max', 
                             name: '最大值'
                           },
                           { type: is_max_min == false ? 'null':'min', 
                             name: '最小值'
                           }
                        ]
                    },
                    label: {
                        normal: {
                            show: is_bar_value,
                            position: 'top'
                        }
                    },
                  })
                }

                
              }
            }

            var option = {
                height: height * 0.8 - steps,
                grid: {
                    right: fd.right_padding == null ? '0%' : fd.right_padding,
                    left: fd.left_padding == null ? '0%' : fd.left_padding,
                    top: fd.top_padding == null ? '0%' : fd.top_padding,
                    bottom: fd.bottom_padding == null ? '0%' : fd.bottom_padding,
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: legend
                },
                xAxis: xAxis,
                yAxis: yAxis,
                series: series
            };

            chart.setOption(option);

            break;


          default:
            throw new Error('Unrecognized visualization for echarts' + vizType);
        }

        slice.container.css('height', height + 'px');

        return chart;
      };
       
      const graph = drawGraph();

      slice.done(payload);
    });
  };

  const update = function () {
    if (chart && chart.resize) {
      chart.resize();
    }
  }; 


  return {
    render,
    resize: update,
  };
}

module.exports = echartsVis;
