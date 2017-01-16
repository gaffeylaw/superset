import d3 from 'd3';
import { fixDataTableBodyHeight } from '../javascripts/modules/utils';
import { timeFormatFactory, formatDate } from '../javascripts/modules/dates';

require('./table.css');
const $ = require('jquery');
require('jquery-ui');

require('datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.css');
import 'datatables.net';
import dt from 'datatables.net-bs';
dt(window, $);

function tableVis(slice) {
  let count = 0;
  const fC = d3.format('0,000');
  let timestampFormatter;
  const container = $(slice.selector);

  function refresh() {
    function onError(xhr) {
      slice.error(xhr.responseText, xhr);
      return;
    }


    // get slice by sliceId
    function sliceUrl(sliceId) {
      const navigateSlice = $.ajax({
        url: '/superset/rest/api/sliceUrl',
        async: false,
        data: { sliceId: sliceId },
        dataType: 'json',
      });
      return navigateSlice.responseText;
    }

    // add a modal
    function showModal(title, url) {
      let modals;
      if ($('#modals').attr('id') !== undefined) {
        modals = $('#modals');
      } else {
        modals = document.createElement('div');
        $(modals).attr('id', 'modals');
        document.body.append(modals);
      }
      const myModal = document.createElement('div');
      const modalCount = $('#modals').children().length;
      $(myModal).attr('id', modalCount)
      .attr('class', 'modal fade')
      .attr('role', 'dialog')
      .attr('aria-hidden', true)
      .attr('id', 'newSlice_' + modalCount);
      const modalDialog = document.createElement('div');
      $(modalDialog).attr('class', 'modal-dialog');
      const modalContent = document.createElement('div');
      $(modalContent).attr('class', 'modal-content');
      const modalHeader = document.createElement('div');
      $(modalHeader).attr('class', 'modal-header');
      const modalTitle = document.createElement('h4');
      $(modalTitle).attr('class', 'modal-title')
      .text(title);
      const modalBody = document.createElement('div');
      $(modalBody).attr('class', 'modal-body');
      const iframe = document.createElement('iframe');
      $(iframe).attr('id', 'iframe_' + modalCount)
      .attr('src', url)
      .attr('height', '50%')
      .attr('width', '100%')
      .attr('frameborder', 0);
      $(modalBody).append(iframe);
      $(modalContent).append(modalHeader);
      $(modalContent).append(modalBody);
      $(modalHeader).append(modalTitle);
      $(modalDialog).append(modalContent);
      $(myModal).append(modalDialog);
      $(modals).append(myModal);
      $(myModal).draggable({
        handle: '.modal-header',
      });
      $(myModal).modal({ show: true });
      // const myModal = $('#newSlice').clone();
      // const modalCount = $('#modals').children().length;
      // myModal.attr('id', 'newSlice_' + modalCount);
      // $('#modals').append(myModal);
      // $('#newSlice_' + modalCount + ' iframe').attr('src', url);
      // $('#newSlice_' + modalCount + ' iframe').attr('id', 'iframe_' + modalCount);
      // $('#newSlice_' + modalCount + ' .modal-title').text(title);
      // myModal.attr('display', 'block');
      // myModal.draggable({
      //   handle: '.modal-header',
      // });
      // myModal.modal({ show: true });
      // $('.modal-backdrop').each(function () {
      //   $(this).attr('id', 'id_' + Math.random());
      // });
    }

    let left = 10;
    const isIE = (document.all) ? true : false;
    const Extend = function(destination, source) {
      for (const property in source) {
        destination[property] = source[property];
      }
    };
    const Bind = function(object, fun, args) {
      return function() {
        return fun.apply(object, args || []);
      }
    };
    const BindAsEventListener = function(object, fun) {
       const args = Array.prototype.slice.call(arguments).slice(2);
       return function(event) {
         return fun.apply(object, [event || window.event].concat(args));
       }
    };
    const CurrentStyle = function(element) {
       return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    };
    function create(elm, parent, fn) {
      const element = document.createElement(elm);
      fn&&fn(element);
      parent&&parent.appendChild(element);
      return element;
    };
    function addListener(element, e, fn) {
      element.addEventListener ?
      element.addEventListener(e, fn, false) :
      element.attachEvent("on" + e, fn);
    };
    function removeListener(element, e, fn) {
      element.removeEventListener ?
      element.removeEventListener(e,fn , false) :
      element.detachEvent("on" + e,fn);
    };
    const Class = function(properties) {
      let _class = function() {
        return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ?
        this.initialize.apply(this, arguments) : this;
      };
      _class.prototype = properties;
      return _class;
    };

    let Dialog = new Class({
      options:{
        Width : 300, 
        Height : 300,
        Left : 100,
        Top : 100,
        Titleheight : 26,
        Minwidth : 200,
        Minheight : 200,
        CancelIco : true,
        ResizeIco : false,
        Info : "",
        Content : "",
        Zindex : 10,
      }, 
      initialize : function(options) {
        this._dragobj = null;
        this._resize = null;
        this._cancel = null;
        this._body = null;
        this._x = 0;
        this._y = 0;
        this._fM = BindAsEventListener(this, this.Move);
        this._fS = Bind(this, this.Stop);
        this._isdrag = null;
        this._Css = null;
        this.Width = this.options.Width;
        this.Height = this.options.Height;
        this.Left = this.options.Left;
        this.Top = this.options.Top;
        this.CancelIco = this.options.CancelIco;
        this.Info = this.options.Info;
        this.Content = this.options.Content;
        this.Minwidth = this.options.Minwidth;
        this.Minheight = this.options.Minheight;
        this.Titleheight= this.options.Titleheight;
        this.Zindex = this.options.Zindex;
        Extend(this,options);
        Dialog.Zindex = this.Zindex;
  // 构造dialog
        let obj = ['dialogcontainter', 'dialogtitle', 'dialogtitleinfo', 'dialogtitleico',
        'dialogbody', 'dialogbottom'];
        for(let i = 0;i < obj.length; i++) {
          obj[i] = create('div', null, function(elm) {
            elm.className = obj[i];
          });
        }
        obj[2].innerHTML = this.Info;
        obj[4].innerHTML = this.Content;
        obj[1].appendChild(obj[2]);
        obj[1].appendChild(obj[3]);
        obj[0].appendChild(obj[1]);
        obj[0].appendChild(obj[4]);
        obj[0].appendChild(obj[5]);
        document.body.appendChild(obj[0]);
        this._dragobj = obj[0];
        this._resize = obj[5];
        this._cancel = obj[3];
        this._body = obj[4];
    ////////////////////////////////////////////////////////////////////////////////o,x1,x2 
    ////设置Dialog的长 宽 ,left ,top 
    // with(this._dragobj.style){
    //      height = this.Height + "px";top = this.Top + "px";width = this.Width +"px";left = this.Left + "px";zIndex = this.Zindex; 
    // } 
        this._dragobj.style.height = this.Height + 'px';
        this._dragobj.style.top = this.Top + 'px';
        this._dragobj.style.width = this.Width + 'px';
        this._dragobj.style.left = this.Left + 'px';
        this._dragobj.style.zIndex = this.Zindex;
        this._body.style.height =
        this.Height - this.Titleheight-parseInt(CurrentStyle(this._body).paddingLeft)*2+'px'; 
        /////////////////////////////////////////////////////////////////////////////// 添加事件 
        addListener(this._dragobj, 'mousedown', BindAsEventListener(this, this.Start, true));
        addListener(this._cancel, 'mouseover', Bind(this,this.Changebg,
        [this._cancel, '0px 0px', '-21px 0px']));
        addListener(this._cancel, 'mouseout', Bind(this, this.Changebg,
        [this._cancel, '0px 0px', '-21px 0px']));
        addListener(this._cancel, 'mousedown' ,BindAsEventListener(this, this.Disappear));
        addListener(this._body, 'mousedown', BindAsEventListener(this, this.Cancelbubble));
        addListener(this._resize, 'mousedown', BindAsEventListener(this, this.Start, false));
        },
        Disappear : function(e) {
          this.Cancelbubble(e);
          document.body.removeChild(this._dragobj);
        },
        Cancelbubble : function(e) {
          this._dragobj.style.zIndex = ++Dialog.Zindex;
          document.all ? (e.cancelBubble = true) : (e.stopPropagation());
        },
        Changebg : function(o, x1, x2) {
          o.style.backgroundPosition = (o.style.backgroundPosition == x1) ? x2 : x1;
        },
        Start : function(e, isdrag) {
          if (!isdrag) {
            this.Cancelbubble(e);
          }
          this._Css = isdrag ? { x : "left", y : "top" } : { x : "width", y : "height" };
          this._dragobj.style.zIndex = ++Dialog.Zindex;
          this._isdrag = isdrag;
          this._x = isdrag ? (e.clientX - this._dragobj.offsetLeft || 0) :
          (this._dragobj.offsetLeft || 0);
          this._y = isdrag ? (e.clientY - this._dragobj.offsetTop || 0) :
          (this._dragobj.offsetTop || 0);
          if (isIE) {
            addListener(this._dragobj, "losecapture", this._fS);
            this._dragobj.setCapture();
          } else {
            e.preventDefault();
            addListener(window, "blur", this._fS);
          }
          addListener(document, 'mousemove', this._fM);
          addListener(document, 'mouseup', this._fS);
        },
        Move : function(e) {
          window.getSelection ? window.getSelection().removeAllRanges() :
          document.selection.empty();

          //here
          const i_x = e.clientX - this._x, i_y = e.clientY - this._y;
          this._dragobj.style[this._Css.x] = (this._isdrag ? Math.max(i_x, 0) :
          Math.max(i_x, this.Minwidth)) + 'px';
          this._dragobj.style[this._Css.y] = (this._isdrag ? Math.max(i_y, 0) :
          Math.max(i_y, this.Minheight)) + 'px';
          if (!this._isdrag) {
            this._body.style.height = Math.max(i_y - this.Titleheight, 
            this.Minheight - this.Titleheight) -
            2 * parseInt(CurrentStyle(this._body).paddingLeft) + 'px';
          }
        },
        Stop : function() {
          removeListener(document, 'mousemove', this._fM);
          removeListener(document, 'mouseup', this._fS);
          if (isIE) {
            removeListener(this._dragobj, "losecapture", this._fS); 
            this._dragobj.releaseCapture();
          } else {
            removeListener(window, "blur", this._fS);
          };
        }
    });
function creat(title, url){
      let modals;
      if ($('#modals').attr('id') !== undefined) {
        modals = $('#modals');
      } else {
        modals = document.createElement('div');
        $(modals).attr('id', 'modals');
        document.body.append(modals);
      }
      const myModal = document.createElement('div');
      const modalCount = $('#modals').children().length;
      let content = '<iframe id = "newSlice_' + modalCount + '" width = "100%" height = "100%" src = "' + url + '"> </iframe>';
      new Dialog({ Info: title, Left:300 + left, Content: content, Zindex: (++Dialog.Zindex) });
      left += 10;
} 



    // add listener to get navigate message
    $(document).ready(function () {
      window.addEventListener('message', function (e) {
        if (e.data.type === 'newWindow') {
          window.open(e.data.url, null, null);
        } else {
           // make modal can be add only once
          if ($('#newSlice_' + count).attr('id') === undefined) {
            // showModal(e.data.title, e.data.url);
            creat(e.data.title, e.data.url);
            count++;
          }
        }
      }, false);
    });

    // add filter by change url
    function addFilter(url, colArr) {
      let newUrl = url;
      for (let i = 0; i < colArr.length; i++) {
        const flt = newUrl.match(/flt_col/g);
        let nextFltIndex = 0;
        if (flt === null || flt === '') {
          nextFltIndex = 1;
        } else {
          nextFltIndex = flt.length + 1;
        }
        const col = colArr[i].col;
        const val = (colArr[i].title === '') ? colArr[i].val : colArr[i].title;
        const nextFlt = '&flt_col_' + nextFltIndex + '=' + col + '&flt_op_' + nextFltIndex +
            '=in&flt_eq_' + nextFltIndex + '=' + val;
        newUrl += nextFlt;
      }
      return newUrl;
    }


    function GetQueryString(url, name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      const r = url.substring(url.indexOf('?')).substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }


    function onSuccess(json) {
      const data = json.data;
      const fd = json.form_data;
      // console.log("form_data:");
      // console.log(fd);
      // Removing metrics (aggregates) that are strings
      const realMetrics = [];
      for (const k in data.records[0]) {
        if (fd.metrics.indexOf(k) > -1 && !isNaN(data.records[0][k])) {
          realMetrics.push(k);
        }
      }
      const metrics = realMetrics;

      function col(c) {
        const arr = [];
        for (let i = 0; i < data.records.length; i++) {
          arr.push(data.records[i][c]);
        }
        return arr;
      }
      const maxes = {};
      for (let i = 0; i < metrics.length; i++) {
        maxes[metrics[i]] = d3.max(col(metrics[i]));
      }

      if (fd.table_timestamp_format === 'smart_date') {
        timestampFormatter = formatDate;
      } else if (fd.table_timestamp_format !== undefined) {
        timestampFormatter = timeFormatFactory(fd.table_timestamp_format);
      }

      const div = d3.select(slice.selector);
      div.html('');
      const table = div.append('table')
        .classed(
          'dataframe dataframe table table-striped table-bordered ' +
          'table-condensed table-hover dataTable no-footer', true)
        .attr('width', '100%');

      // add header style
      const headerStyle = fd.headerValue;
      table.append('thead').append('tr')
        .selectAll('th')
        .data(data.columns)
        .enter()
        .append('th')
        .attr('style', headerStyle)
        .text(function (d) {
          return d;
        });

      // get compare info from form_data
      const compareMetricLefts = [];
      const compareMetricRights = [];
      const compareExprs = [];
      const compareValues = [];
      for (let i = 1; i < 10; i++) {
        if (fd['compare_expr_' + i] !== '') {
          compareMetricLefts.push(col(fd['compare_metricLeft_' + i]));
          compareMetricRights.push(col(fd['compare_metricRight_' + i]));
          compareExprs.push(fd['compare_expr_' + i]);
          compareValues.push(fd['compare_value_' + i]);
        }
      }

      table.append('tbody')
        .selectAll('tr')
        .data(data.records)
        .enter()
        .append('tr')
        .selectAll('td')
        .data((row) => data.columns.map((c) => {
          let val = row[c];
          if (c === 'timestamp') {
            val = timestampFormatter(val);
          }
          return {
            col: c,
            val,
            isMetric: metrics.indexOf(c) >= 0,
          };
        }))
        .enter()
        .append('td')
        /* .style('background-image', function (d) {
          if (d.isMetric) {
            const perc = Math.round((d.val / maxes[d.col]) * 100);
            return (
              `linear-gradient(to right, lightgrey, lightgrey ${perc}%, ` +
              `rgba(100,100,100,100) ${perc}%`
            );
          }
          return null;
        }) */
        .attr('style', function (d) {
          // add body style
          let bodyStyle = fd.bodyValue;

          // add column style
          for (let i = 1; i < 10; i++) {
            if (fd['colStyle_value_' + i] !== '') {
              if (d.col === fd['colStyle_metric_' + i]) {
                bodyStyle += fd['colStyle_value_' + i] + ';';
                break;
              }
            } else {
              break;
            }
          }

          // add condition style
          for (let i = 1; i < 10; i++) {
            if (fd['style_expr_' + i] !== '') {
              if (d.isMetric && d.col === fd['style_metric_' + i]) {
                let expr = fd['style_expr_' + i].replace(/x/g, d.val);
                // make '=' to '=='
                expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
                // console.log(expr);
                if ((expr.indexOf('$.inArray') === -1 && eval(expr))
                  || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1)) {
                  // console.log(fd['style_value_' + i]);
                  bodyStyle += fd['style_value_' + i] + ';';
                }
              }
            } else {
              break;
            }
          }

          // add two colums compare style
          for (let i = 0; i < compareExprs.length; i++) {
            if (d.isMetric && d.col === fd['compare_metricLeft_' + (i + 1)]) {
              const expr = compareExprs[i].replace('x', compareMetricLefts[i][0])
                         .replace('y', compareMetricRights[i][0]).replace(/=/g, '==')
                         .replace(/>==/g, '>=').replace(/<==/g, '<=');
              // console.log(expr);
              if (d.val === compareMetricLefts[i][0] && eval(expr)) {
                bodyStyle += compareValues[i];
              }
              // delete the first element
              compareMetricLefts[i].splice(0, 1);
              compareMetricRights[i].splice(0, 1);
              break;
            }
          }
          return bodyStyle;
        })
        .attr('title', (d) => {
          if (!isNaN(d.val)) {
            return fC(d.val);
          }
          return null;
        })
        .attr('data-sort', function (d) {
          return (d.isMetric) ? d.val : null;
        })
        // .on('click', function (d) {
        //   if (!d.isMetric && fd.table_filter) {
        //     const td = d3.select(this);
        //     if (td.classed('filtered')) {
        //       slice.removeFilter(d.col, [d.val]);
        //       d3.select(this).classed('filtered', false);
        //     } else {
        //       d3.select(this).classed('filtered', true);
        //       slice.addFilter(d.col, [d.val]);
        //     }
        //   }
        // })
        // .style('cursor', function (d) {
        //   return (!d.isMetric) ? 'pointer' : '';
        // })
        .on('click', function (d) {
          for (let i = 1; i <= 10; i++) {
            if (fd['navigate_expr_' + i] !== '') {
              if (d.isMetric && d.col === fd['navigate_metric_' + i]) {
                let expr = fd['navigate_expr_' + i].replace(/x/g, d.val);
                // make '=' to '=='
                expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
                if (((expr.indexOf('$.inArray') === -1 && eval(expr))
                || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1))) {
                  const type = fd['navigate_open_' + i];
                  const slc = JSON.parse(sliceUrl(fd['navigate_slice_' + i]));
                  let url = slc.url;
                  const title = slc.title;
                  if (url != null) {
                    const standlone = GetQueryString('standalone');
                    if (standlone === null) {
                      if (url.indexOf('standalone') !== -1) {
                        url = url.replace(/standalone=/, 'standalone=true');
                      } else {
                        url += '&standalone=true';
                      }
                    }
                    const groupby = fd.groupby;
                    const colArr = [];
                    for (let j = 0; j < groupby.length; j++) {
                      const ele = this.parentNode.childNodes[j];
                      colArr.push({
                        val: ele.textContent,
                        col: groupby[j],
                        title: ele.title,
                      });
                    }
                    url = addFilter(url, colArr);
                    const postData = { url: url, title: title, type: type };
                    window.parent.parent.postMessage(postData, '*');  // send message to navigate
                  }
                }
              }
            }
          }
        })
        .style('cursor', function (d) {
          return (d.isMetric) ? 'pointer' : '';
        })
        .html((d) => {
          let html = '';
          let icon = '';
          let color = 'black';
          if (d.isMetric) {
            html = slice.d3format(d.col, d.val);
          } else {
            html = d.val;
          }
          for (let i = 1; i < 10; i++) {
            if (fd['style_expr_' + i] !== '') {
              if (d.isMetric && d.col === fd['style_metric_' + i]) {
                let expr = fd['style_expr_' + i].replace(/x/g, d.val);
                // make '=' to '=='
                expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
                if ((expr.indexOf('$.inArray') === -1 && eval(expr))
                  || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1)) {
                  icon = fd['style_icon_' + i];
                }
              }
            } else {
              break;
            }
          }
          // set icon color
          if (icon === 'fa fa-arrow-up' || icon === 'fa fa-angle-double-up') {
            color = 'green;';
          } else if (icon === 'fa fa-arrow-down' || icon === 'fa fa-angle-double-down') {
            color = 'red;';
          }

          // set link style
          for (let i = 1; i < 10; i++) {
            if (fd['navigate_expr_' + i] !== '') {
              if (d.isMetric && d.col === fd['navigate_metric_' + i]) {
                let expr = fd['navigate_expr_' + i].replace(/x/g, d.val);
                // make '=' to '=='
                expr = expr.replace(/=/g, '==').replace(/>==/g, '>=').replace(/<==/g, '<=');
                if ((expr.indexOf('$.inArray') === -1 && eval(expr))
                  || (expr.indexOf('$.inArray') !== -1 && eval(expr) !== -1)) {
                  html = '<a href="#">' + html + '</a>';
                  break;
                }
              }
            } else {
              break;
            }
          }

          return html + '<i style="margin-left:20px;color:'
                      + color + '" class="' + icon + '" aria-hidden="true"></i>';
        });
      const height = slice.height();
      let paging = false;
      let pageLength;
      if (fd.page_length && fd.page_length > 0) {
        paging = true;
        pageLength = parseInt(fd.page_length, 10);
      }
      const datatable = container.find('.dataTable').DataTable({
        paging,
        pageLength,
        aaSorting: [],
        searching: fd.include_search,
        bInfo: false,
        scrollY: height + 'px',
        scrollCollapse: true,
        scrollX: true,
      });
      fixDataTableBodyHeight(
          container.find('.dataTables_wrapper'), height);
      // Sorting table by main column
      if (fd.metrics.length > 0) {
        const mainMetric = fd.metrics[0];
        datatable.column(data.columns.indexOf(mainMetric)).order('desc').draw();
      }
      slice.done(json);
      container.parents('.widget').find('.tooltip').remove();
    }
    $.getJSON(slice.jsonEndpoint(), onSuccess).fail(onError);
  }

  return {
    render: refresh,
    resize() {},
  };
}

module.exports = tableVis;
