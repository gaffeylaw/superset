import React, { PropTypes } from 'react';

const propTypes = {
  doPrint: PropTypes.func.isRequired,
  slice: PropTypes.object.isRequired,
  removeSlice: PropTypes.func.isRequired,
  expandedSlices: PropTypes.object,
  isManager: PropTypes.bool.isRequired,
};

function SliceCell({ expandedSlices, removeSlice, slice, doPrint, isManager }) {
  return (
    <div className="slice-cell" id={`${slice.token}-cell`}>
      <div className="chart-header">
        <div className="row">
          <div className="col-md-12 header">
            <span>{slice.slice_name}</span>
          </div>
          <div className="col-md-12 chart-controls">
            <div className="pull-right">
              {isManager &&
                <span>
                  <a title="移动报表" data-toggle="tooltip">
                    <i className="fa fa-arrows drag" />
                  </a>
                  <a className="refresh" title="刷新数据" data-toggle="tooltip">
                    <i className="fa fa-repeat" />
                  </a>
                </span>
              }
              {(slice.description && isManager) &&
                <a title="Toggle chart description">
                  <i
                    className="fa fa-info-circle slice_info"
                    title={slice.description}
                    data-toggle="tooltip"
                  />
                </a>
              }
              {isManager &&
                <span>
                  <a
                    href={slice.edit_url}
                    title="编辑报表"
                    data-toggle="tooltip"
                  >
                    <i className="fa fa-pencil" />
                  </a>
                  <a href={slice.slice_url} title="导航至切片" data-toggle="tooltip">
                    <i className="fa fa-share" />
                  </a>
                </span>
              }
              <a title="打印报表" data-toggle="tooltip">
                <i
                  className="fa fa-print"
                  onClick={() => { doPrint(slice.slice_id); }}
                />
              </a>
              {isManager &&
                <a
                  className="remove-chart"
                  title="移除报表"
                  data-toggle="tooltip"
                >
                  <i
                    className="fa fa-close"
                    onClick={() => { removeSlice(slice.slice_id); }}
                  />
                </a>
              }
            </div>
          </div>
        </div>
      </div>
      <div
        className="slice_description bs-callout bs-callout-default"
        style={
          expandedSlices &&
          expandedSlices[String(slice.slice_id)] ? {} : { display: 'none' }
        }
        dangerouslySetInnerHTML={{ __html: slice.description_markeddown }}
      >

      </div>
      <div className="row chart-container">
        <input type="hidden" value="false" />
        <div id={slice.token} className="token col-md-12">
          <img
            src="/static/assets/images/loading.gif"
            className="loading"
            alt="loading"
          />
          <div className="slice_container" id={slice.token + '_con'}></div>
        </div>
      </div>
    </div>
  );
}

SliceCell.propTypes = propTypes;

export default SliceCell;
