import React, { PropTypes } from 'react';

const propTypes = {
  doPrint: PropTypes.func.isRequired,
  slice: PropTypes.object.isRequired,
  removeSlice: PropTypes.func.isRequired,
  expandedSlices: PropTypes.object,
  isManager: PropTypes.bool.isRequired,
  localMessage: PropTypes.object.isRequired,
};

function SliceCell({ expandedSlices, removeSlice, slice, doPrint,
  getCsv, isManager, localMessage }) {
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
                  <a title={localMessage.move_slice} data-toggle="tooltip">
                    <i className="fa fa-arrows drag" />
                  </a>
                  <a className="refresh" title={localMessage.refresh_data}
                  data-toggle="tooltip">
                    <i className="fa fa-repeat" />
                  </a>
                </span>
              }
              {(slice.description && isManager) &&
                <a title={localMessage.toogle_chart_desc}>
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
                    title={localMessage.edit_slice}
                    data-toggle="tooltip"
                  >
                    <i className="fa fa-pencil" />
                  </a>
                  <a href={slice.slice_url} title={localMessage.navigate_slice}
                  data-toggle="tooltip">
                    <i className="fa fa-share" />
                  </a>
                </span>
              }
              {true &&
                <span>
                  <a title={localMessage.print_slice} data-toggle="tooltip">
                    <i
                      className="fa fa-print"
                      onClick={() => { doPrint(slice); }}
                    />
                  </a>
                  <a title={localMessage.export_csv} data-toggle="tooltip">
                    <i
                      className="fa fa-download"
                      onClick={() => { getCsv(slice); }}
                    />
                  </a>
                </span>
              }
              {isManager &&
                <a
                  className="remove-chart"
                  title={localMessage.remove_slice}
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
