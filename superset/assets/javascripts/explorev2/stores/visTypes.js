import { chooseMessage } from './language';
import zh_CN from './zh_CN';
import en_US from './en_US';

const localeMessage = chooseMessage();

export const commonControlPanelSections = {
  druidTimeSeries: {
    label: localeMessage.druidTimeSeries,
    description: localeMessage.druidTimeSeries_desc,
    fieldSetRows: [
      ['granularity', 'druid_time_origin'],
      ['since', 'until'],
    ],
  },
  datasourceAndVizType: {
    label: localeMessage.datasourceAndVizType,
    fieldSetRows: [
      ['datasource'],
      ['viz_type'],
    ],
  },
  sqlaTimeSeries: {
    label: localeMessage.sqlaTimeSeries,
    description: localeMessage.druidTimeSeries_desc,
    fieldSetRows: [
      ['granularity_sqla', 'time_grain_sqla'],
      ['since', 'until'],
    ],
  },
  sqlClause: {
    label: localeMessage.sqlClause,
    fieldSetRows: [
      ['where', 'having'],
    ],
    description: localeMessage.sqlClause_desc,
  },
  NVD3TimeSeries: [
    {
      label: null,
      fieldSetRows: [
        ['metrics'],
        ['groupby'],
        ['limit', 'timeseries_limit_metric'],
      ],
    },
    {
      label: localeMessage.NVD3TimeSeries,
      description: localeMessage.NVD3TimeSeries,
      fieldSetRows: [
          ['rolling_type', 'rolling_periods'],
          ['time_compare'],
          ['num_period_compare', 'period_ratio_type'],
          ['resample_how', 'resample_rule'],
          ['resample_fillmethod'],
      ],
    },
  ],
  filters: [
    {
      label: localeMessage.filters1,
      description: localeMessage.filters1_desc,
    },
    {
      label: localeMessage.filters2,
      description: localeMessage.filters2_desc,
    },
  ],
};

const visTypes = {
  dist_bar: {
    label: localeMessage.dist_bar_viz,
    controlPanelSections: [
      {
        label: localeMessage.chart_options,
        description: localeMessage.tooltip_text,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
          ['columns'],
          ['row_limit'],
          ['show_legend', 'show_bar_value'],
          ['bar_stacked', 'order_bars'],
          ['y_axis_format', 'bottom_margin'],
          ['x_axis_label', 'y_axis_label'],
          ['reduce_x_ticks', 'contribution'],
          ['show_controls', 'bar_horizontal'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.series,
      },
      columns: {
        label: localeMessage.breakDowns,
        description: localeMessage.breakDowns_desc,
      },
    },
  },

  echarts_bar: {
    label: localeMessage.echart_bar,
    controlPanelSections: [
      {
        label: localeMessage.metrics_and_dim,
        description: localeMessage.metrics_and_dim_desc,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
        ],
      },
      {
        label: localeMessage.only_left,
        description: localeMessage.only_left_desc,
        fieldSetRows: [
          ['only_left','y_metrics'],
          ['y_format','y_degree'],
          ['y_axis_name'],
        ],
      },
      {
        label: localeMessage.muti_y_axis,
        description: localeMessage.muti_y_axis_desc,
        fieldSetRows: [
          ['y_left_metrics', 'y_right_metrics'],
          ['y_left_format', 'y_right_format'],
          ['y_left_degree', 'y_right_degree'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.other_option,
        description: localeMessage.other_option_desc,
        fieldSetRows: [
          ['is_avg', 'is_max_min'],
          ['is_bar_value'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.x_axis,
      }, 
    },
  },

  echarts_bar_h: {
    label: localeMessage.echart_bar_h,
    controlPanelSections: [
      {
        label: localeMessage.metrics_and_dim,
        description: localeMessage.metrics_and_dim_desc,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
        ],
      },
      {
        label: localeMessage.only_bottom,
        description: localeMessage.only_bottom_desc,
        fieldSetRows: [
          ['only_bottom','x_metrics'],
          ['x_format','x_degree'],
          ['x_axis_name'],
        ],
      },
      {
        label: localeMessage.muti_x_axis,
        description: localeMessage.muti_x_axis_desc,
        fieldSetRows: [
          ['x_bottom_metrics', 'x_top_metrics'],
          ['x_bottom_format', 'x_top_format'],
          ['x_bottom_degree', 'x_top_degree'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.other_option,
        description: localeMessage.other_option_desc,
        fieldSetRows: [
          ['is_avg', 'is_max_min'],
          ['is_bar_value'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.y_axis,
      }, 
    },
  },
  
  echarts_line: {
    label: localeMessage.echart_line,
    controlPanelSections: [
      {
        label: localeMessage.metrics_and_dim,
        description: localeMessage.metrics_and_dim_desc,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
        ],
      },
      {
        label: localeMessage.only_left,
        description: localeMessage.only_left_desc,
        fieldSetRows: [
          ['only_left','y_metrics'],
          ['y_format','y_degree'],
          ['y_axis_name'],
        ],
      },
      {
        label: localeMessage.muti_y_axis,
        description: localeMessage.muti_y_axis_desc,
        fieldSetRows: [
          ['y_left_metrics', 'y_right_metrics'],
          ['y_left_format', 'y_right_format'],
          ['y_left_degree', 'y_right_degree'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.other_option,
        description: localeMessage.other_option_desc,
        fieldSetRows: [
          ['is_avg', 'is_max_min'],
          ['is_bar_value'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.x_axis,
      }, 
    },
  },

  echarts_line_bar: {
    label: localeMessage.echart_line_bar,
    controlPanelSections: [
      {
        label: localeMessage.metrics_and_dim,
        description: localeMessage.metrics_and_dim_desc,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
        ],
      },
      {
        label: localeMessage.line_bar,
        description: localeMessage.line_bar_desc,
        fieldSetRows: [
          ['line_choice','bar_choice'],
        ],
      },
      {
        label: localeMessage.only_left,
        description: localeMessage.only_left_desc,
        fieldSetRows: [
          ['only_left','y_metrics'],
          ['y_format','y_degree'],
          ['y_axis_name'],
        ],
      },
      {
        label: localeMessage.muti_y_axis,
        description: localeMessage.muti_y_axis_desc,
        fieldSetRows: [
          ['y_left_metrics', 'y_right_metrics'],
          ['y_left_format', 'y_right_format'],
          ['y_left_degree', 'y_right_degree'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.other_option,
        description: localeMessage.other_option_desc,
        fieldSetRows: [
          ['is_avg', 'is_max_min'],
          ['is_bar_value'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.x_axis,
      }, 
    },
  },

  echarts_pie_m: {
    label: localeMessage.echarts_pie_m,
    controlPanelSections: [
      {
        label: localeMessage.metrics,
        description: localeMessage.metrics_desc,
        fieldSetRows: [
          ['metrics'],
        ],
      },
      {
        label: localeMessage.other_option,
        description: localeMessage.other_option_desc,
        fieldSetRows: [
          ['label_position', 'label_format'],
          ['circle_type', 'rose_type'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
  },

  echarts_pie_h: {
    label: localeMessage.echarts_pie_h,
    controlPanelSections: [
      {
        label: localeMessage.metrics,
        description: localeMessage.metrics_desc,
        fieldSetRows: [
          ['metrics'],
        ],
      },
      {
        label: localeMessage.inner_circle,
        description: localeMessage.inner_circle_desc,
        fieldSetRows: [
          ['inner_metrics'],
          ['inner_label_position', 'inner_label_format'],
        ],
      },
      {
        label: localeMessage.outer_circle,
        description: localeMessage.outer_circle_desc,
        fieldSetRows: [
          ['outer_metrics'],
          ['outer_label_position', 'outer_label_format'],
        ],
      },
      {
        label: localeMessage.padding,
        description: localeMessage.padding_desc,
        fieldSetRows: [
          ['top_padding', 'bottom_padding'],
          ['left_padding', 'right_padding'],
        ],
      },
      {
        label: localeMessage.row_limit,
        description: localeMessage.row_limit,
        fieldSetRows: [
          ['row_limit'],
        ],
      },
    ],
  },
  // add new style
  ag_grid: {
    label: localeMessage.ag_grid,
    controlPanelSections: [
      {
        label: localeMessage.groupby,
        description: localeMessage.ag_grid1_desc,
        fieldSetRows: [
          ['groupby', 'metrics'],
        ],
      },
      {
        label: localeMessage.ag_grid2,
        fieldSetRows: [
          ['table_timestamp_format'],
          ['row_limit'],
          ['order_by_cols'],
        ],
      },
    ],
  },

  linePlusBar: {
    label: localeMessage.linePlusBar_viz,
    controlPanelSections: [
      {
        label: localeMessage.chart_options,
        description: localeMessage.tooltip_text,
        fieldSetRows: [
            ['groupby'],
            ['metrics'],
            ['row_limit', 'bottom_margin'],
            ['x_axis_label', 'x_axis_format'],
            ['y_axis_label1', 'y_axis_format1'],
            ['y_axis_label2', 'y_axis_format2'],
            ['reduce_x_ticks', 'contribution'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.series,
      },
      columns: {
        label: localeMessage.breakDowns,
        description: localeMessage.breakDowns_desc,
      },
    },
  },

  multi: {
    label: localeMessage.multi_viz,
    controlPanelSections: [
      {
        label: localeMessage.chart_options,
        description: localeMessage.tooltip_text,
        fieldSetRows: [
          ['groupby'],
          ['line', 'yAxis1'],
          ['bar', 'yAxis2'],
          ['area', 'yAxis3'],
          ['scatter', 'yAxis4'],
          ['row_limit', 'bottom_margin'],
          ['x_axis_label', 'x_axis_format'],
          ['y_axis_label1', 'y_axis_format1'],
          ['y_axis_label2', 'y_axis_format2'],
          ['y_domain1', 'y_domain2'],
          ['reduce_x_ticks', 'contribution'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.series,
      },
      columns: {
        label: localeMessage.breakDowns,
        description: localeMessage.breakDowns_desc,
      },
    },
  },

  pie: {
    label: localeMessage.pie_viz,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metrics', 'groupby'],
          ['limit'],
          ['pie_label_type'],
          ['donut', 'show_legend'],
          ['labels_outside'],
        ],
      },
    ],
  },

  line: {
    label: localeMessage.line_viz,
    requiresTime: true,
    controlPanelSections: [
      commonControlPanelSections.NVD3TimeSeries[0],
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['show_brush', 'show_legend'],
          ['rich_tooltip', 'y_axis_zero'],
          ['y_log_scale', 'contribution'],
          ['show_markers', 'x_axis_showminmax'],
          ['line_interpolation'],
          ['x_axis_format', 'y_axis_format'],
          ['x_axis_label', 'y_axis_label'],
        ],
      },
      commonControlPanelSections.NVD3TimeSeries[1],
    ],
  },

  bar: {
    label: localeMessage.bar_viz,
    requiresTime: true,
    controlPanelSections: [
      commonControlPanelSections.NVD3TimeSeries[0],
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['show_brush', 'show_legend', 'show_bar_value'],
          ['rich_tooltip', 'y_axis_zero'],
          ['y_log_scale', 'contribution'],
          ['x_axis_format', 'y_axis_format'],
          ['line_interpolation', 'bar_stacked'],
          ['x_axis_showminmax', 'bottom_margin'],
          ['x_axis_label', 'y_axis_label'],
          ['reduce_x_ticks', 'show_controls'],
        ],
      },
      commonControlPanelSections.NVD3TimeSeries[1],
    ],
  },

  compare: {
    label: localeMessage.compare_viz,
    requiresTime: true,
    controlPanelSections: [
      commonControlPanelSections.NVD3TimeSeries[0],
      commonControlPanelSections.NVD3TimeSeries[1],
    ],
  },

  area: {
    label: localeMessage.area_viz,
    requiresTime: true,
    controlPanelSections: [
      commonControlPanelSections.NVD3TimeSeries[0],
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['show_brush', 'show_legend'],
          ['rich_tooltip', 'y_axis_zero'],
          ['y_log_scale', 'contribution'],
          ['x_axis_format', 'y_axis_format'],
          ['x_axis_showminmax', 'show_controls'],
          ['line_interpolation', 'stacked_style'],
        ],
      },
      commonControlPanelSections.NVD3TimeSeries[1],
    ],
  },

  table: {
    label: localeMessage.table_viz,
    controlPanelSections: [
      {
        label: localeMessage.groupby,
        description: localeMessage.ag_grid1_desc,
        fieldSetRows: localeMessage.ag_grid1_fieldSetRows,
      },
      {
        label: localeMessage.ag_grid2,
        fieldSetRows: [
          ['table_timestamp_format'],
          ['row_limit'],
          ['page_length'],
          ['order_by_cols'],
          ['include_search', 'table_filter'],
        ],
      },
    ],
  },

  markup: {
    label: localeMessage.markup,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: localeMessage.markup_fieldSetRows,
      },
    ],
  },

  pivot_table: {
    label: localeMessage.pivot_table,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['groupby', 'columns'],
          ['metrics', 'pandas_aggfunc'],
        ],
      },
    ],
  },

  separator: {
    label: localeMessage.Separator,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['code'],
        ],
      },
    ],
    fieldOverrides: {
      code: {
        default: '####Section Title\n' +
        'A paragraph describing the section' +
        'of the dashboard, right before the separator line ' +
        '\n\n' +
        '---------------',
      },
    },
  },

  word_cloud: {
    label: localeMessage.word_cloud,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['series', 'metric', 'limit'],
          ['size_from', 'size_to'],
          ['rotation'],
        ],
      },
    ],
  },

  treemap: {
    label: localeMessage.treemap,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metrics'],
          ['groupby'],
        ],
      },
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['treemap_ratio'],
          ['number_format'],
        ],
      },
    ],
  },

  cal_heatmap: {
    label: localeMessage.cal_heatmap_viz,
    requiresTime: true,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metric'],
          ['domain_granularity'],
          ['subdomain_granularity'],
        ],
      },
    ],
  },

  box_plot: {
    label: localeMessage.box_plot,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metrics'],
          ['groupby', 'limit'],
        ],
      },
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['whisker_options'],
        ],
      },
    ],
  },

  bubble: {
    label: localeMessage.bubble_viz,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['series', 'entity'],
          ['x', 'y'],
          ['size', 'limit'],
        ],
      },
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['x_log_scale', 'y_log_scale'],
          ['show_legend'],
          ['max_bubble_size'],
          ['x_axis_label', 'y_axis_label'],
        ],
      },
    ],
  },

  bullet: {
    label: localeMessage.bullet_viz,
    requiresTime: false,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metric'],
          ['ranges', 'range_labels'],
          ['markers', 'marker_labels'],
          ['marker_lines', 'marker_line_labels'],
        ],
      },
    ],
  },

  big_number: {
    label: localeMessage.big_number,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metric'],
          ['compare_lag'],
          ['compare_suffix'],
          ['y_axis_format'],
        ],
      },
    ],
    fieldOverrides: {
      y_axis_format: {
        label: localeMessage.number_format,
      },
    },
  },

  big_number_total: {
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['metric'],
          ['subheader'],
          ['y_axis_format'],
        ],
      },
    ],
    fieldOverrides: {
      y_axis_format: {
        label: localeMessage.number_format,
      },
    },
  },

  histogram: {
    label: localeMessage.histogram,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['all_columns_x'],
          ['row_limit'],
        ],
      },
      {
        label: localeMessage.histogram2,
        fieldSetRows: [
          ['link_length'],
        ],
      },
    ],
    fieldOverrides: {
      all_columns_x: {
        label: localeMessage.all_columns_x,
        description: localeMessage.all_columns_x_desc,
      },
      link_length: {
        label: localeMessage.link_length1,
        description: localeMessage.link_length1_desc,
        default: 5,
      },
    },
  },

  sunburst: {
    label: localeMessage.sunburst,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['groupby'],
          ['metric', 'secondary_metric'],
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      metric: {
        label: localeMessage.sunburst_metric,
        description: localeMessage.sunburst_metric_desc,
      },
      secondary_metric: {
        label: localeMessage.sunburst_secondary_metric,
        description: localeMessage.sunburst_secondary_metric_desc,
      },
      groupby: {
        label: localeMessage.sunburst_groupby,
        description: localeMessage.sunburst_groupby_desc,
      },
    },
  },

  sankey: {
    label: localeMessage.sankey,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['groupby'],
          ['metric'],
          ['row_limit'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.sankey_groupby,
        description: localeMessage.sankey_groupby_desc,
      },
    },
  },

  directed_force: {
    label: localeMessage.directed_force_viz,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['groupby'],
          ['metric'],
          ['row_limit'],
        ],
      },
      {
        label: localeMessage.directed_force_viz2,
        fieldSetRows: [
          ['link_length'],
          ['charge'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.sankey_groupby,
        description: localeMessage.sankey_groupby_desc,
      },
    },
  },

  world_map: {
    label: localeMessage.world_map,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['entity'],
          ['country_fieldtype'],
          ['metric'],
        ],
      },
      {
        label: localeMessage.world_map_bubbles,
        fieldSetRows: [
          ['show_bubbles'],
          ['secondary_metric'],
          ['max_bubble_size'],
        ],
      },
    ],
    fieldOverrides: {
      entity: {
        label: localeMessage.world_map_entity,
        description: localeMessage.world_map_entity_desc,
      },
      metric: {
        label: localeMessage.world_map_metric,
        description: localeMessage.world_map_metric_desc,
      },
      secondary_metric: {
        label: localeMessage.world_map_secondary_metric,
        description: localeMessage.world_map_secondary_metric_desc,
      },
    },
  },

  filter_box: {
    label: localeMessage.filter_box,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['date_filter'],
          ['groupby'],
          ['metric'],
        ],
      },
    ],
    fieldOverrides: {
      groupby: {
        label: localeMessage.filter_box_groupby,
        description: localeMessage.filter_box_groupby_desc,
        default: [],
      },
    },
  },

  iframe: {
    label: 'iFrame',
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['url'],
        ],
      },
    ],
  },

  para: {
    label: localeMessage.para_viz,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['series'],
          ['metrics'],
          ['secondary_metric'],
          ['limit'],
          ['show_datatable', 'include_series'],
        ],
      },
    ],
  },

  heatmap: {
    label: localeMessage.heatmap_viz,
    controlPanelSections: [
      {
        label: localeMessage.heatmap_viz_label,
        fieldSetRows: [
          ['all_columns_x'],
          ['all_columns_y'],
          ['metric'],
        ],
      },
      {
        label: localeMessage.heatmap_viz2,
        fieldSetRows: [
          ['linear_color_scheme'],
          ['xscale_interval', 'yscale_interval'],
          ['canvas_image_rendering'],
          ['normalize_across'],
        ],
      },
    ],
  },

  horizon: {
    label: localeMessage.horizon,
    controlPanelSections: [
      commonControlPanelSections.NVD3TimeSeries[0],
      {
        label: localeMessage.chart_options,
        fieldSetRows: [
          ['series_height', 'horizon_color_scale'],
        ],
      },
    ],
  },

  mapbox: {
    label: localeMessage.mapbox,
    controlPanelSections: [
      {
        label: null,
        fieldSetRows: [
          ['all_columns_x', 'all_columns_y'],
          ['clustering_radius'],
          ['row_limit'],
          ['groupby'],
          ['render_while_dragging'],
        ],
      },
      {
        label: localeMessage.mapbox_2,
        fieldSetRows: [
          ['point_radius'],
          ['point_radius_unit'],
        ],
      },
      {
        label: localeMessage.mapbox_3,
        fieldSetRows: [
          ['mapbox_label'],
          ['pandas_aggfunc'],
        ],
      },
      {
        label: localeMessage.mapbox4,
        fieldSetRows: [
          ['mapbox_style'],
          ['global_opacity'],
          ['mapbox_color'],
        ],
      },
      {
        label: localeMessage.mapbox5,
        fieldSetRows: [
          ['viewport_longitude'],
          ['viewport_latitude'],
          ['viewport_zoom'],
        ],
      },
    ],
    fieldOverrides: {
      all_columns_x: {
        label: localeMessage.all_columns_x,
        description: localeMessage.all_columns_x_desc,
      },
      all_columns_y: {
        label: localeMessage.all_columns_y,
        description: localeMessage.all_columns_y_desc,
      },
      pandas_aggfunc: {
        label: localeMessage.pandas_aggfunc,
        description: localeMessage.pandas_aggfunc_desc,
      },
      rich_tooltip: {
        label: localeMessage.rich_tooltip,
        description: localeMessage.rich_tooltip_desc,
      },
      groupby: {
        description: localeMessage.groupby_desc,
      },
    },
  },
};

export default visTypes;

export function sectionsToRender(vizType, datasourceType) {
  const viz = visTypes[vizType];
  const timeSection = datasourceType === 'table' ?
    commonControlPanelSections.sqlaTimeSeries : commonControlPanelSections.druidTimeSeries;
  const { datasourceAndVizType, sqlClause } = commonControlPanelSections;
  const sections = [datasourceAndVizType].concat(
    viz.controlPanelSections, timeSection, sqlClause);
  return sections;
}
