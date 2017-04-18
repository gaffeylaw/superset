import { formatSelectOptionsForRange, formatSelectOptions } from '../../modules/utils';
import visTypes from './visTypes';
import { chooseMessage, chooseLocale } from './language'; 
import zh_CN from './zh_CN';
import en_US from './en_US';

const localeMessage = chooseMessage();
export const fieldTypes = [
  'CheckboxField',
  'FreeFormSelectField',
  'IntegerField',
  'SelectCustomMultiField',
  'SelectField',
  'SelectMultipleSortableField',
  'TextAreaFeild',
  'TextField',
  'MenuField',
];
const D3_FORMAT_DOCS = localeMessage.d3_format_docs;

// input choices & options
const D3_TIME_FORMAT_OPTIONS = [
  ['.3s', '.3s | 12.3k'],
  ['.3%', '.3% | 1234543.210%'],
  ['.4r', '.4r | 12350'],
  ['.3f', '.3f | 12345.432'],
  ['+,', '+, | +12,345.4321'],
  ['$,.2f', '$,.2f | $12,345.43'],
];

const ROW_LIMIT_OPTIONS = [10, 50, 100, 250, 500, 1000, 5000, 10000, 50000];

const SERIES_LIMITS = [0, 5, 10, 25, 50, 100, 500];

const TIME_STAMP_OPTIONS = [
  ['smart_date', 'Adaptative formating'],
  ['%m/%d/%Y', '%m/%d/%Y | 01/14/2019'],
  ['%Y-%m-%d', '%Y-%m-%d | 2019-01-14'],
  ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S | 2019-01-14 01:32:10'],
  ['%H:%M:%S', '%H:%M:%S | 01:32:10'],
];

export const fields = {
  datasource: {
    type: 'SelectField',
    label: localeMessage.datasource,
    default: null,
    choices: [],
    description: '',
  },

  viz_type: {
    type: 'MenuField',
    label: localeMessage.viz,
    default: 'table',
    choices: formatSelectOptions(Object.keys(visTypes)),
    description: localeMessage.viz_type_description,
  },

  metrics: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.metrics,
    choices: [],
    default: [],
    description: localeMessage.metrics_to_display,
  },

  order_by_cols: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.ordring,
    choices: [],
    default: [],
    description: localeMessage.metrics_to_display,
  },

  metric: {
    type: 'SelectField',
    label: localeMessage.metric,
    choices: [],
    default: null,
    description: localeMessage.choose_metric,
  },

  stacked_style: {
    type: 'SelectField',
    label: localeMessage.stacked_style,
    choices: localeMessage.stacked_style_choices,
    default: 'stack',
    description: '',
  },

  linear_color_scheme: {
    type: 'SelectField',
    label: localeMessage.linear_color_scheme,
    choices: localeMessage.linear_color_scheme_choices,
    default: 'blue_white_yellow',
    description: '',
  },

  normalize_across: {
    type: 'SelectField',
    label: localeMessage.normalize_across,
    choices: localeMessage.normalize_across_choices,
    default: 'heatmap',
    description: localeMessage.normalize_across_description,
  },

  horizon_color_scale: {
    type: 'SelectField',
    label: localeMessage.horizon_color_scale,
    choices: localeMessage.horizon_color_scale_choices,
    default: 'series',
    description: localeMessage.horizon_color_scale_description,
  },

  canvas_image_rendering: {
    type: 'SelectField',
    label: localeMessage.rendering,
    choices: localeMessage.canvas_image_rendering_choices,
    default: 'pixelated',
    description: localeMessage.canvas_image_rendering_description,
  },

  xscale_interval: {
    type: 'SelectField',
    label: localeMessage.xscale_interval,
    choices: formatSelectOptionsForRange(1, 50),
    default: '1',
    description: localeMessage.xscale_interval_description,
  },

  yscale_interval: {
    type: 'SelectField',
    label: localeMessage.yscale_interval,
    choices: formatSelectOptionsForRange(1, 50),
    default: null,
    description: localeMessage.yscale_interval_description,
  },

  bar_stacked: {
    type: 'CheckboxField',
    label: localeMessage.bar_stacked,
    default: false,
    description: null,
  },

  show_markers: {
    type: 'CheckboxField',
    label: localeMessage.show_markers,
    default: false,
    description: localeMessage.showm,
  },

  show_bar_value: {
    type: 'CheckboxField',
    label: localeMessage.show_bar_value,
    default: false,
    description: localeMessage.show_bar_value_description,
  },

  order_bars: {
    type: 'CheckboxField',
    label: localeMessage.order_bars,
    default: false,
    description: localeMessage.order_bars_description,
  },

  show_controls: {
    type: 'CheckboxField',
    label: localeMessage.show_controls,
    default: false,
    description: localeMessage.show_controls_desc,
  },

  reduce_x_ticks: {
    type: 'CheckboxField',
    label: localeMessage.reduce_x_ticks,
    default: false,
    description: localeMessage.reduce_x_ticks_desc,
  },

  include_series: {
    type: 'CheckboxField',
    label: localeMessage.include_series,
    default: false,
    description: localeMessage.include_series_desc,
  },

  secondary_metric: {
    type: 'SelectField',
    label: localeMessage.secondary_metric,
    choices: [],
    default: null,
    description: localeMessage.secondary_metric_desc,
  },

  country_fieldtype: {
    type: 'SelectField',
    label: localeMessage.country_fieldtype,
    default: localeMessage.country_fieldtype_default,
    choices: localeMessage.country_fieldtype_choices,
    description: localeMessage.country_fieldtype_desc,
  },

  groupby: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.groupby,
    choices: [],
    default: [],
    description: localeMessage.groupby_desc,
  },

  columns: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.columns,
    choices: [],
    default: [],
    description: localeMessage.columns_desc,
  },

  all_columns: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.all_columns,
    choices: [],
    default: [],
    description: localeMessage.all_columns_desc,
  },

  all_columns_x: {
    type: 'SelectField',
    label: 'X',
    choices: [],
    default: null,
    description: localeMessage.columns_to_display,
  },

  all_columns_y: {
    type: 'SelectField',
    label: 'Y',
    choices: [],
    default: null,
    description: localeMessage.columns_to_display,
  },

  druid_time_origin: {
    type: 'FreeFormSelectField',
    label: localeMessage.origin,
    choices: localeMessage.druid_time_origin_choices,
    default: null,
    description: localeMessage.druid_time_origin_desc,
  },

  bottom_margin: {
    type: 'FreeFormSelectField',
    label: localeMessage.bottom_margin,
    choices: formatSelectOptions(['auto', 50, 75, 100, 125, 150, 200]),
    default: 'auto',
    description: localeMessage.bottom_margin_desc,
  },

  granularity: {
    type: 'SelectField',
    label: localeMessage.granularity,
    default: 'one day',
    choices: localeMessage.granularity_choices,
    description: localeMessage.granularity_desc,
  },

  domain_granularity: {
    type: 'SelectField',
    label: localeMessage.domain_granularity,
    default: 'month',
    choices: localeMessage.domain_granularity_choices,
    description: localeMessage.domain_granularity_desc,
  },

  subdomain_granularity: {
    type: 'SelectField',
    label: localeMessage.subdomain_granularity,
    default: 'day',
    choices: localeMessage.subdomain_granularity_choices,
    description: localeMessage.subdomain_granularity_desc,
  },

  link_length: {
    type: 'FreeFormSelectField',
    label: localeMessage.link_length,
    default: '200',
    choices: formatSelectOptions(['10', '25', '50', '75', '100', '150', '200', '250']),
    description: localeMessage.link_length_desc,
  },

  charge: {
    type: 'FreeFormSelectField',
    label: localeMessage.charge,
    default: '-500',
    choices: formatSelectOptions([
      '-50',
      '-75',
      '-100',
      '-150',
      '-200',
      '-250',
      '-500',
      '-1000',
      '-2500',
      '-5000',
    ]),
    description: localeMessage.charge_desc,
  },

  granularity_sqla: {
    type: 'SelectField',
    label: localeMessage.granularity_sqla,
    default: null,
    choices: [],
    description: localeMessage.granularity_sqla_desc,
  },

  time_grain_sqla: {
    type: 'SelectField',
    label: localeMessage.time_grain_sqla,
    choices: [],
    default: localeMessage.time_grain_sqla_default,
    description: localeMessage.time_grain_sqla_desc,
  },

  resample_rule: {
    type: 'FreeFormSelectField',
    label: localeMessage.resample_rule,
    default: null,
    choices: formatSelectOptions(['', '1T', '1H', '1D', '7D', '1M', '1AS']),
    description: localeMessage.resample_rule_desc,
  },

  resample_how: {
    type: 'SelectField',
    label: localeMessage.resample_how,
    default: null,
    choices: localeMessage.resample_how_choices,
    description: localeMessage.resample_how_desc,
  },

  resample_fillmethod: {
    type: 'FreeFormSelectField',
    label: localeMessage.resample_fillmethod,
    default: null,
    choices: formatSelectOptions(localeMessage.resample_fillmethod_choices),
    description: localeMessage.resample_fillmethod_desc,
  },

  since: {
    type: 'SelectField',
    label: localeMessage.since,
    default: '7 days ago',
    choices: localeMessage.since_choices,
    description: localeMessage.since_desc,
  },

  until: {
    type: 'SelectField',
    label: localeMessage.until,
    default: 'now',
    choices: localeMessage.until_choices,
  },

  max_bubble_size: {
    type: 'FreeFormSelectField',
    label: localeMessage.max_bubble_size,
    default: '25',
    choices: formatSelectOptions(['5', '10', '15', '25', '50', '75', '100']),
  },

  whisker_options: {
    type: 'SelectField',
    label: localeMessage.whisker_options,
    default: 'Tukey',
    description: localeMessage.whisker_options_desc,
    choices: localeMessage.whisker_options_choices,
  },

  treemap_ratio: {
    type: 'IntegerField',
    label: localeMessage.treemap_ratio,
    default: 0.5 * (1 + Math.sqrt(5)),  // d3 default, golden ratio
    description: localeMessage.treemap_ratio_desc,
  },

  number_format: {
    type: 'FreeFormSelectField',
    label: localeMessage.number_format,
    default: D3_TIME_FORMAT_OPTIONS[0],
    choices: D3_TIME_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  row_limit: {
    type: 'FreeFormSelectField',
    label: localeMessage.row_limit,
    default: null,
    choices: formatSelectOptions(ROW_LIMIT_OPTIONS),
  },

  limit: {
    type: 'FreeFormSelectField',
    label: localeMessage.limit,
    choices: formatSelectOptions(SERIES_LIMITS),
    default: 50,
    description: localeMessage.limit_desc,
  },

  timeseries_limit_metric: {
    type: 'SelectField',
    label: localeMessage.timeseries_limit_metric,
    choices: [],
    default: null,
    description: localeMessage.timeseries_limit_metric_desc,
  },

  rolling_type: {
    type: 'SelectField',
    label: localeMessage.rolling_type,
    default: localeMessage.rolling_type_default,
    choices: localeMessage.rolling_type_choices,
    description: localeMessage.rolling_type_desc,
  },

  rolling_periods: {
    type: 'IntegerField',
    label: localeMessage.rolling_periods,
    validators: [],
    description: localeMessage.rolling_periods_desc,
  },

  series: {
    type: 'SelectField',
    label: localeMessage.series,
    choices: [],
    default: null,
    description: localeMessage.series_desc,
  },

  entity: {
    type: 'SelectField',
    label: localeMessage.entity,
    choices: [],
    default: null,
    description: localeMessage.entity_desc,
  },

  x: {
    type: 'SelectField',
    label: localeMessage.x,
    choices: [],
    default: null,
    description: localeMessage.x_desc,
  },

  y: {
    type: 'SelectField',
    label: localeMessage.y,
    choices: [],
    default: null,
    description: localeMessage.y_desc,
  },

  size: {
    type: 'SelectField',
    label: localeMessage.size,
    default: null,
    choices: [],
  },

  url: {
    type: 'TextField',
    label: 'URL',
    description: localeMessage.url_desc,
    default: 'https: //www.youtube.com/embed/JkI5rg_VcQ4',
  },

  x_axis_label: {
    type: 'TextField',
    label: localeMessage.x_axis_label,
    default: '',
  },

  y_axis_label: {
    type: 'TextField',
    label: localeMessage.y_axis_label,
    default: '',
  },

  where: {
    type: 'TextField',
    label: localeMessage.where,
    default: '',
    description: localeMessage.where_desc,
  },

  having: {
    type: 'TextField',
    label: localeMessage.having,
    default: '',
    description: localeMessage.having,
  },

  compare_lag: {
    type: 'TextField',
    label: localeMessage.compare_lag,
    description: localeMessage.compare_lag_desc,
  },

  compare_suffix: {
    type: 'TextField',
    label: localeMessage.compare_suffix,
    description: localeMessage.compare_suffix_desc,
  },

  table_timestamp_format: {
    type: 'FreeFormSelectField',
    label: localeMessage.table_timestamp_format,
    default: 'smart_date',
    choices: TIME_STAMP_OPTIONS,
    description: localeMessage.table_timestamp_format_desc,
  },

  series_height: {
    type: 'FreeFormSelectField',
    label: localeMessage.series_height,
    default: '25',
    choices: formatSelectOptions(['10', '25', '40', '50', '75', '100', '150', '200']),
    description: localeMessage.series_height_desc,
  },

  page_length: {
    type: 'FreeFormSelectField',
    label: localeMessage.page_length,
    default: 0,
    choices: formatSelectOptions([0, 10, 25, 40, 50, 75, 100, 150, 200]),
    description: localeMessage.page_length_desc,
  },

  x_axis_format: {
    type: 'FreeFormSelectField',
    label: localeMessage.x_axis_format,
    default: 'smart_date',
    choices: TIME_STAMP_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  y_axis_format: {
    type: 'FreeFormSelectField',
    label: localeMessage.y_axis_format,
    default: '.3s',
    choices: D3_TIME_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },

  markup_type: {
    type: 'SelectField',
    label: localeMessage.markup_type,
    choices: localeMessage.markup_type_choices,
    default: 'markdown',
    description: localeMessage.markup_type_desc,
  },

  rotation: {
    type: 'SelectField',
    label: localeMessage.rotation,
    choices: localeMessage.rotation_choices,
    default: 'random',
    description: localeMessage.rotation_desc,
  },

  line_interpolation: {
    type: 'SelectField',
    label: localeMessage.line_interpolation ,
    choices: localeMessage.line_interpolation_choices,
    default: 'linear',
    description: localeMessage.line_interpolation_desc,
  },

  pie_label_type: {
    type: 'SelectField',
    label: localeMessage.pie_label_type,
    default: localeMessage.pie_label_type_default,
    choices: localeMessage.pie_label_type_choices,
    description: localeMessage.pie_label_type_desc,
  },

  code: {
    type: 'TextAreaField',
    label: localeMessage.code,
    description: localeMessage.code_desc,
    default: '',
  },

  pandas_aggfunc: {
    type: 'SelectField',
    label: localeMessage.pandas_aggfunc,
    choices: localeMessage.pandas_aggfunc_choices,
    default: 'sum',
    description: localeMessage.pandas_aggfunc_desc,
  },

  size_from: {
    type: 'TextField',
    label: localeMessage.size_from,
    default: '20',
    description: localeMessage.size_from_desc,
  },

  size_to: {
    type: 'TextField',
    label: localeMessage.size_to,
    default: '150',
    description: localeMessage.size_to_desc,
  },

  show_brush: {
    type: 'CheckboxField',
    label: localeMessage.show_brush,
    default: false,
    description: localeMessage.show_brush_desc,
  },

  date_filter: {
    type: 'CheckboxField',
    label: localeMessage.date_filter,
    default: false,
    description: localeMessage.date_filter_desc,
  },

  show_datatable: {
    type: 'CheckboxField',
    label: localeMessage.show_datatable,
    default: false,
    description: localeMessage.show_datatable_desc,
  },

  include_search: {
    type: 'CheckboxField',
    label: localeMessage.include_search,
    default: false,
    description: localeMessage.include_search_desc,
  },

  table_filter: {
    type: 'CheckboxField',
    label: localeMessage.table_filter,
    default: false,
    description: localeMessage.table_filter_desc,
  },

  show_bubbles: {
    type: 'CheckboxField',
    label: localeMessage.show_bubbles,
    default: false,
    description: localeMessage.show_bubbles_desc,
  },

  show_legend: {
    type: 'CheckboxField',
    label: localeMessage.show_legend,
    default: true,
    description: localeMessage.show_legend_desc,
  },

  x_axis_showminmax: {
    type: 'CheckboxField',
    label: localeMessage.x_axis_showminmax,
    default: true,
    description: localeMessage.x_axis_showminmax_desc,
  },

  rich_tooltip: {
    type: 'CheckboxField',
    label: localeMessage.rich_tooltip,
    default: true,
    description: localeMessage.rich_tooltip_desc,
  },

  y_axis_zero: {
    type: 'CheckboxField',
    label: localeMessage.y_axis_zero,
    default: false,
    description: localeMessage.y_axis_zero_desc,
  },

  y_log_scale: {
    type: 'CheckboxField',
    label: localeMessage.y_log_scale,
    default: false,
    description: localeMessage.y_log_scale,
  },

  x_log_scale: {
    type: 'CheckboxField',
    label: localeMessage.x_log_scale,
    default: false,
    description: localeMessage.x_log_scale,
  },

  donut: {
    type: 'CheckboxField',
    label: localeMessage.dount_desc,
    default: false,
    description: localeMessage.donut_desc,
  },

  labels_outside: {
    type: 'CheckboxField',
    label: localeMessage.labels_outside,
    default: true,
    description: localeMessage.labels_outside_desc,
  },

  contribution: {
    type: 'CheckboxField',
    label: localeMessage.contribution,
    default: false,
    description: localeMessage.contribution_desc,
  },

  num_period_compare: {
    type: 'IntegerField',
    label: localeMessage.num_period_compare,
    default: '',
    validators: [],
    description: localeMessage.num_period_compare_desc,
  },

  period_ratio_type: {
    type: 'SelectField',
    label: localeMessage.period_ratio_type,
    default: 'growth',
    choices: localeMessage.period_ratio_type_choices,
    description: localeMessage.period_ratio_type_desc,
  },

  time_compare: {
    type: 'TextField',
    label: localeMessage.time_compare,
    default: null,
    description: localeMessage.time_compare_desc,
  },

  subheader: {
    type: 'TextField',
    label: localeMessage.subheader,
    description: localeMessage.subheader_desc,
  },

  mapbox_label: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.mapbox_label,
    choices: [],
    default: [],
    description: localeMessage.mapbox_label_desc,
  },

  mapbox_style: {
    type: 'SelectField',
    label: localeMessage.mapbox_style,
    choices: [
        ['mapbox://styles/mapbox/streets-v9', 'Streets'],
        ['mapbox://styles/mapbox/dark-v9', 'Dark'],
        ['mapbox://styles/mapbox/light-v9', 'Light'],
        ['mapbox://styles/mapbox/satellite-streets-v9', 'Satellite Streets'],
        ['mapbox://styles/mapbox/satellite-v9', 'Satellite'],
        ['mapbox://styles/mapbox/outdoors-v9', 'Outdoors'],
    ],
    default: 'mapbox://styles/mapbox/streets-v9',
    description: localeMessage.mapbox_style_desc,
  },

  clustering_radius: {
    type: 'FreeFormSelectField',
    label: localeMessage.clustering_radius,
    default: '60',
    choices: formatSelectOptions([
      '0',
      '20',
      '40',
      '60',
      '80',
      '100',
      '200',
      '500',
      '1000',
    ]),
    description: localeMessage.clustering_radius_desc,
  },

  point_radius: {
    type: 'SelectField',
    label: localeMessage.point_radius,
    default: null,
    choices: [],
    description: localeMessage.point_radius_desc,
  },

  point_radius_unit: {
    type: 'SelectField',
    label: localeMessage.point_radius_unit,
    default: 'Pixels',
    choices: localeMessage.point_radius_unit_choices,
    description: localeMessage.point_radius_unit_desc,
  },

  global_opacity: {
    type: 'IntegerField',
    label: localeMessage.global_opacity,
    default: 1,
    description: localeMessage.global_opacity_desc,
  },

  viewport_zoom: {
    type: 'IntegerField',
    label: localeMessage.viewport_zoom,
    default: 11,
    validators: [],
    description: localeMessage.viewport_zoom_desc,
    places: 8,
  },

  viewport_latitude: {
    type: 'IntegerField',
    label: localeMessage.viewport_latitude,
    default: 37.772123,
    description: localeMessage.viewport_latitude_desc,
    places: 8,
  },

  viewport_longitude: {
    type: 'IntegerField',
    label: localeMessage.viewport_longitude,
    default: -122.405293,
    description: localeMessage.viewport_longitude_desc,
    places: 8,
  },

  render_while_dragging: {
    type: 'CheckboxField',
    label: localeMessage.render_while_dragging,
    default: true,
    description: localeMessage.render_while_dragging_desc,
  },

  mapbox_color: {
    type: 'FreeFormSelectField',
    label: localeMessage.mapbox_color,
    default: 'rgb(0, 122, 135)',
    choices: [
      ['rgb(0, 139, 139)', 'Dark Cyan'],
      ['rgb(128, 0, 128)', 'Purple'],
      ['rgb(255, 215, 0)', 'Gold'],
      ['rgb(69, 69, 69)', 'Dim Gray'],
      ['rgb(220, 20, 60)', 'Crimson'],
      ['rgb(34, 139, 34)', 'Forest Green'],
    ],
    description: localeMessage.mapbox_color_desc,
  },

  ranges: {
    type: 'TextField',
    label: localeMessage.ranges,
    default: '',
    description: localeMessage.ranges_desc,
  },

  range_labels: {
    type: 'TextField',
    label: localeMessage.range_labels,
    default: '',
    description: localeMessage.range_labels_desc,
  },

  markers: {
    type: 'TextField',
    label: localeMessage.markers,
    default: '',
    description: localeMessage.markers_desc,
  },

  marker_labels: {
    type: 'TextField',
    label: localeMessage.marker_labels,
    default: '',
    description: localeMessage.marker_labels_desc,
  },

  marker_lines: {
    type: 'TextField',
    label: localeMessage.marker_lines,
    default: '',
    description: localeMessage.marker_lines_desc,
  },

  marker_line_labels: {
    type: 'TextField',
    label: localeMessage.marker_line_labels,
    default: '',
    description: localeMessage.marker_line_labels_desc,
  },

  // extra style
  line: {
    type: 'SelectMultipleSortableField',
    label: 'line',
    choices: [],
    default: [],
    description: 'One or many lines to display',
  },
  bar: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.bar,
    choices: [],
    default: [],
    description: localeMessage.bar_desc,
  },
  area: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.area,
    choices: [],
    default: [],
    description: localeMessage.area_desc,
  },
  scatter: {
    type: 'SelectMultipleSortableField',
    label: localeMessage.scatter,
    choices: [],
    default: [],
    description: localeMessage.scatter_desc,
  },
  yAxis1: {
    type: 'SelectField',
    label: localeMessage.yAxis,
    choices: formatSelectOptions([
      'y1',
      'y2',
    ]),
    default: 'y1',
    description: localeMessage.yAxis_desc,
  },
  yAxis2: {
    type: 'SelectField',
    label: localeMessage.yAxis,
    choices: formatSelectOptions([
      'y1',
      'y2',
    ]),
    default: 'y1',
    description: localeMessage.yAxis_desc,
  },
  yAxis3: {
    type: 'SelectField',
    label: localeMessage.yAxis,
    choices: formatSelectOptions([
      'y1',
      'y2',
    ]),
    default: 'y1',
    description: localeMessage.yAxis_desc,
  },
  yAxis4: {
    type: 'SelectField',
    label: localeMessage.yAxis,
    choices: formatSelectOptions([
      'y1',
      'y2',
    ]),
    default: 'y1',
    description: localeMessage.yAxis_desc,
  },
  y_axis_format1: {
    type: 'FreeFormSelectField',
    label: localeMessage.y_axis_format,
    default: '.3s',
    choices: D3_TIME_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },
  y_axis_format2: {
    type: 'FreeFormSelectField',
    label: localeMessage.y_axis_format,
    default: '.3s',
    choices: D3_TIME_FORMAT_OPTIONS,
    description: D3_FORMAT_DOCS,
  },
  y_axis_label1: {
    type: 'TextField',
    label: localeMessage.y_axis_label1,
    default: '',
  },
  y_axis_label2: {
    type: 'TextField',
    label: localeMessage.y_axis_label2,
    default: '',
  },
  y_domain1: {
    type: 'TextField',
    label: localeMessage.y_domain1,
    default: '',
    description: localeMessage.y_domain1_desc,
  },
  y_domain2: {
    type: 'TextField',
    label: localeMessage.y_domain2,
    default: '',
    description: localeMessage.y_domain2_desc,
  },
  bar_horizontal: {
    type: 'CheckboxField',
    label: localeMessage.bar_horizontal,
    default: false,
    description: '',
  },
};
export default fields;

// Control Panel fields that re-render chart without need for 'Query button'
export const autoQueryFields = [
  'datasource',
  'viz_type',
  'bar_stacked',
  'show_markers',
  'show_bar_value',
  'order_bars',
  'show_controls',
  'reduce_x_ticks',
  'include_series',
  'pie_label_type',
  'show_brush',
  'include_search',
  'show_bubbles',
  'show_legend',
  'x_axis_showminmax',
  'rich_tooltip',
  'y_axis_zero',
  'y_log_scale',
  'x_log_scale',
  'donut',
  'labels_outside',
  'contribution',
  'size',
  'row_limit',
  'max_bubble_size',
  'bar_horizontal',
];
