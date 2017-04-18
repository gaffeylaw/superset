const en_US = {
  header_style: 'Header Style',
  table_style: 'Table Style',
  col_style: 'Column Style:',
  add_col_style: 'Add Column Style',
  metric: 'Metric',
  style: 'Style',
  threshold: 'Threshold',
  icon: 'Icon',
  base_style: 'Base Style',
  condition_style: 'Condition Style',
  compare_style: 'Compare Column Style',
  slice_navigator: 'Navitator to',
  ag_setting: 'Ag-grid Setting',
  add_base_style: ' Add Base Style',
  add_condition_style: ' Add Condition Style',
  add_compare_style: ' Add Compare Column Style',
  add_slice_navigator: ' Add Navitator',
  grid_theme: 'Grid Theme:',
  theme: 'Theme',
  page_count: 'Page Count',
  count: 'Count',
  frozen_left: 'Frozen Left',
  frozen_col: 'Choose Column',
  frozen_right: 'Forzen Right',
  enable_piovttable: 'Enable PivotTable',
  add_table_header_setting: ' Add Table Header Settring',
  metric1: 'Metric1',
  metric2: 'Metric2',
  compare_expressoin: 'The expression (with x, y for two columns)',
  iconChoices: [
    { key: 'Null', value: '' },
    { key: 'Rise (single arrow)', value: 'fa fa-arrow-up' },
    { key: 'Down (single arrow)', value: 'fa fa-arrow-down' },
    { key: 'Rise (double arrow)', value: 'fa fa-angle-double-up' },
    { key: 'Down (double arrow)', value: 'fa fa-angle-double-down' },
    { key: 'Bar-chart', value: 'fa fa-bar-chart' },
    { key: 'Line-chart', value: 'fa fa-line-chart' },
    { key: 'Pie-chart', value: 'fa fa-pie-chart' },
    { key: 'Area-chart', value: 'fa fa-area-chart' },
  ],
  navigateChoices: [
    { key: 'Dashboard', value: 'dashboard' },
    { key: 'Slice', value: 'slice' },
  ],
  openChoices: [
    { key: 'Alert Modal', value: 'modal' },
    { key: 'New Window', value: 'newWindow' },
  ],
  navigate_slice: 'Navigate to Slice',
  navigate_dashboard: 'Navigate to Dashboard',
  width: 'Width',
  height: 'Height',
  navigate_type: 'Navigate Type',
  open_type: 'Open Type',
  datasource: 'Datasource',
  viz_type_description: 'The type of visualization to display',
  viz: 'Viz',
  metrics: 'Metrics',
  metrics_to_display: 'One or many metrics to display',
  ordring: 'Ordring',
  choose_metric: 'Choose the metric',
  stacked_style: 'Stacked Style',
  stacked_style_choices: [
    ['stack', 'stack'],
    ['stream', 'stream'],
    ['expand', 'expand'],
  ],
  linear_color_scheme: 'Linear Color Scheme',
  linear_color_scheme_choices: [
    ['fire', 'fire'],
    ['blue_white_yellow', 'blue/white/yellow'],
    ['white_black', 'white/black'],
    ['black_white', 'black/white'],
  ],
  normalize_across: 'Normalize Across',
  normalize_across_choices: [
    ['heatmap', 'heatmap'],
    ['x', 'x'],
    ['y', 'y'],
  ],
  normalize_across_description:
  'Color will be rendered based on a ratio of the cell against the sum of across this criteria',
  horizon_color_scale: 'Horizon Color Scale',
  horizon_color_scale_choices: [
    ['series', 'series'],
    ['overall', 'overall'],
    ['change', 'change'],
  ],
  horizon_color_scale_description: 'Defines how the color are attributed.',
  rendering: 'Rendering',
  canvas_image_rendering_choices: [
    ['pixelated', 'pixelated (Sharp)'],
    ['auto', 'auto (Smooth)'],
  ],
  canvas_image_rendering_description:
  'image-rendering CSS attribute of the canvas object that defines how' +
  'the browser scales up the image',
  xscale_interval: 'XScale Interval',
  xscale_interval_description: 'Number of step to take between ticks when printing the x scale',
  yscale_interval: 'YScale Interval',
  yscale_interval_description: 'Number of step to take between ticks when printing the y scale',
  bar_stacked: 'Stacked Bars',
  show_markers: 'Show Markers',
  show_markers_description: 'Show data points as circle markers on the lines',
  show_bar_value: 'Bar Values',
  show_bar_value_description: 'Show the value on top of the bar',
  order_bars: 'Sort Bars',
  order_bars_description: 'Sort bars by x labels.',
  show_controls: 'Extra Controls',
  show_controls_desc: 'Whether to show extra controls or not. Extra controls include things' +
  'like making mulitBar charts stacked or side by side.',
  reduce_x_ticks: 'Reduce X ticks',
  reduce_x_ticks_desc: 'Reduces the number of X axis ticks to be rendered. ' +
  'If true, the x axis wont overflow and labels may be ' +
  'missing. If false, a minimum width will be applied ' +
  'to columns and the width may overflow into an ' +
  'horizontal scroll.',
  include_series: 'Include Series',
  include_series_desc: 'Include series name as an axis',
  secondary_metric: 'Color Metric',
  secondary_metric_desc: 'A metric to use for color',
  country_fieldtype: 'Country Field Type',
  country_fieldtype_choices: [
    ['name', 'Full name'],
    ['cioc', 'code International Olympic Committee (cioc)'],
    ['cca2', 'code ISO 3166-1 alpha-2 (cca2)'],
    ['cca3', 'code ISO 3166-1 alpha-3 (cca3)'],
  ],
  country_fieldtype_default: 'cca2',
  country_fieldtype_desc: 'The country code standard that Superset should expect ' +
  'to find in the [country] column',
  groupby: 'Group by',
  groupby_desc: 'One or many fields to group by',
  columns: 'Columns',
  columns_desc: 'One or many fields to pivot as columns',
  all_columns: 'Columns',
  all_columns_desc: 'Columns to display',
  columns_to_display: 'Columns to display',
  origin: 'Origin',
  druid_time_origin_choices: [
    ['', 'default'],
    ['now', 'now'],
  ],
  druid_time_origin_desc: 'Defines the origin where time buckets start, ' +
  'accepts natural dates as in `now`, `sunday` or `1970-01-01`',
  bottom_margin: 'Bottom Margin',
  bottom_margin_desc: 'Bottom marging, in pixels, allowing for more room for axis labels',
  granularity: 'Time Granularity',
  granularity_choices: [
    ['all', 'all'],
    ['5 seconds', '5 seconds'],
    ['30 seconds', '30 seconds'],
    ['1 minute', '1 minute'],
    ['5 minutes', '5 minutes'],
    ['1 hour', '1 hour'],
    ['6 hour', '6 hour'],
    ['1 day', '1 day'],
    ['7 days', '7 days'],
    ['week', 'week'],
    ['week_starting_sunday', 'week_starting_sunday'],
    ['week_ending_saturday', 'week_ending_saturday'],
    ['month', 'month'],
  ],
  granularity_default: 'one day',
  granularity_desc: 'The time granularity for the visualization. Note that you ' +
  'can type and use simple natural language as in `10 seconds`, ' +
  '`1 day` or `56 weeks`',
  domain_granularity: 'Domain',
  domain_granularity_choices: [
    ['hour', 'hour'],
    ['day', 'day'],
    ['week', 'week'],
    ['month', 'month'],
    ['year', 'year'],
  ],
  domain_granularity_default: 'month',
  domain_granularity_desc: 'The time unit used for the grouping of blocks',
  subdomain_granularity: 'Subdomain',
  subdomain_granularity_choices: [
    ['min', 'min'],
    ['hour', 'hour'],
    ['day', 'day'],
    ['week', 'week'],
    ['month', 'month'],
  ],
  subdomain_granularity_default: 'day',
  subdomain_granularity_desc: 'The time unit for each block. Should be a smaller unit than ' +
  'domain_granularity. Should be larger or equal to Time Grain',
  link_length: 'Link Length',
  link_length_desc: 'Link length in the force layout',
  charge: 'Charge',
  charge_desc: 'Charge in the force layout',
  granularity_sqla: 'Time Column',
  granularity_sqla_desc: 'The time column for the visualization. Note that you ' +
  'can define arbitrary expression that return a DATETIME ' +
  'column in the table or. Also note that the ' +
  'filter below is applied against this column or ' +
  'expression',
  time_grain_sqla: 'Time Grain',
  time_grain_sqla_default: 'Time Column',
  time_grain_sqla_desc: 'The time granularity for the visualization. This ' +
  'applies a date transformation to alter ' +
  'your time column and defines a new time granularity. ' +
  'The options here are defined on a per database ' +
  'engine basis in the Superset source code.',
  resample_rule: 'Resample Rule',
  resample_rule_desc: 'Pandas resample rule',
  resample_how: 'Resample How',
  resample_how_choices: [
    ['', ''],
    ['mean', 'mean'],
    ['sum', 'sum'],
    ['median', 'median'],
  ],
  resample_how_desc: 'Pandas resample how',
  resample_fillmethod: 'Resample Fill Method',
  resample_fillmethod_choices: ['', 'ffill', 'bfill'],
  resample_fillmethod_desc: 'Pandas resample fill method',
  since: 'Since',
  since_choices: [
    ['1 hour ago', '1 hour ago'],
    ['12 hours ago', '12 hours ago'],
    ['1 day ago', '1 day ago'],
    ['7 days ago', '7 days ago'],
    ['28 days ago', '28 days ago'],
    ['90 days ago', '90 days ago'],
    ['1 year ago', '1 year ago'],
    ['100 year ago', '100 year ago'],
  ],
  since_default: '7 days ago',
  since_desc: 'Timestamp from filter. This supports free form typing and ' +
  'natural language as in `1 day ago`, `28 days` or `3 years`',
  until: 'Until',
  until_choices: [
    ['now', 'now'],
    ['1 day ago', '1 day ago'],
    ['7 days ago', '七天7 days ago前'],
    ['28 days ago', '28 days ago'],
    ['90 days ago', '90 days ago'],
    ['1 year ago', '1 year ago'],
  ],
  until_default: 'now',
  max_bubble_size: 'Max Bubble Size',
  whisker_options: 'Whisker/outlier options',
  whisker_options_choices: [
    ['Tukey', 'Tukey'],
    ['Min/max (no outliers)', 'Min/max (no outliers)'],
    ['2/98 percentiles', '2/98 percentiles'],
    ['9/91 percentiles', '9/91 percentiles'],
  ],
  whisker_options_default: 'Tukey',
  whisker_options_desc: 'Determines how whiskers and outliers are calculated.',
  treemap_ratio: 'Ratio',
  treemap_ratio_desc: 'Target aspect ratio for treemap tiles.',
  number_format: 'Number format',
  row_limit: 'Row limit',
  limit: 'Series Limit',
  limit_desc: 'Limits the number of time series that get displayed',
  timeseries_limit_metric: 'Sort By',
  timeseries_limit_metric_desc: 'Metric used to define the top series',
  rolling_type: 'Rolling',
  rolling_type_choices: [
    ['None', 'None'],
    ['mean', 'mean'],
    ['sum', 'sum'],
    ['std', 'std'],
    ['cumsum', 'cumsum'],
  ],
  rolling_type_default: 'None',
  rolling_type_desc: 'Defines a rolling window function to apply, works along ' +
  'with the [Periods] text box',
  rolling_periods: 'Periods',
  rolling_periods_desc: 'Defines the size of the rolling window function, ' +
  'relative to the time granularity selected',
  series: 'Series',
  series_desc: 'Defines the grouping of entities. ' +
  'Each series is shown as a specific color on the chart and ' +
  'has a legend toggle',
  entity: 'Entity',
  entity_desc: 'This define the element to be plotted on the chart',
  x: 'X Axis',
  x_desc: 'Metric assigned to the [X] axis',
  y: 'Y Axis',
  y_desc: 'Metric assigned to the [Y] axis',
  size: 'Bubble Size',
  url_desc: 'The URL, this field is templated, so you can integrate ' +
  '{{ width }} and/or {{ height }} in your URL string.',
  x_axis_label: 'X Axis Label',
  y_axis_label: 'Y Axis Label',
  where: 'Custom WHERE clause',
  where_desc: 'The text in this box gets included in your query\'s WHERE ' +
  'clause, as an AND to other criteria. You can include ' +
  'complex expression, parenthesis and anything else ' +
  'supported by the backend it is directed towards.',
  having: 'Custom HAVING clause',
  having_desc: 'The text in this box gets included in your query\'s HAVING ' +
  'clause, as an AND to other criteria. You can include ' +
  'complex expression, parenthesis and anything else ' +
  'supported by the backend it is directed towards.',
  compare_lag: 'Comparison Period Lag',
  compare_lag_desc: 'Based on granularity, number of time periods to compare against',
  compare_suffix: 'Comparison suffix',
  compare_suffix_desc: 'Suffix to apply after the percentage display',
  table_timestamp_format: 'Table Timestamp Format',
  table_timestamp_format_desc: 'Timestamp Format',
  series_height: 'Series Height',
  series_height_desc: 'Pixel height of each series',
  page_length: 'Page Length',
  page_length_desc: 'Rows per page, 0 means no pagination',
  x_axis_format: 'X axis format',
  y_axis_format: 'Y axis format',
  markup_type: 'Markup Type',
  markup_type_choices: [
    ['markdown', 'markdown'],
    ['html', 'html'],
  ],
  markup_type_default: 'markdown',
  markup_type_desc: 'Pick your favorite markup language',
  rotation: 'Rotation',
  rotation_choices: [
    ['random', 'random'],
    ['flat', 'flat'],
    ['square', 'square'],
  ],
  rotation_default: 'random',
  rotation_desc: 'Rotation to apply to words in the cloud',
  line_interpolation: 'Line Style',
  line_interpolation_choices: [
    ['linear', 'linear'],
    ['basis', 'basis'],
    ['cardinal', 'cardinal'],
    ['monotone', 'monotone'],
    ['step-before', 'step-before'],
    ['step-after', 'step-after'],
  ],
  line_interpolation_default: 'linear',
  line_interpolation_desc: 'Line interpolation as defined by d3.js',
  pie_label_type: 'Label Type',
  pie_label_type_choices: [
    ['key', 'Category Name'],
    ['value', 'Value'],
    ['percent', 'Percentage'],
  ],
  pie_label_type_default: 'key',
  pie_label_type_desc: 'What should be shown on the label?',
  code: 'Code',
  code_desc: 'Put your code here',
  pandas_aggfunc: 'Aggregation function',
  pandas_aggfunc_choices: [
    ['sum', 'sum'],
    ['mean', 'mean'],
    ['min', 'min'],
    ['max', 'max'],
    ['median', 'median'],
    ['stdev', 'stdev'],
    ['var', 'var'],
  ],
  pandas_aggfunc_default: 'sum',
  pandas_aggfunc_desc: 'Aggregate function to apply when pivoting and ' +
  'computing the total rows and columns',
  size_from: 'Font Size From',
  size_from_desc: 'Font size for the smallest value in the list',
  size_to: 'Font Size To',
  size_to_desc: 'Font size for the biggest value in the list',
  show_brush: 'Range Filter',
  show_brush_desc: 'Whether to display the time range interactive selector',
  date_filter: 'Date Filter',
  date_filter_desc: 'Whether to include a time filter',
  show_datatable: 'Data Table',
  show_datatable_desc: 'Whether to display the interactive data table',
  include_search: 'Search Box',
  include_search_desc: 'Whether to include a client side search box',
  table_filter: 'Table Filter',
  table_filter_desc: 'Whether to apply filter when table cell is clicked',
  show_bubbles: 'Show Bubbles',
  show_bubbles_desc: 'Whether to display bubbles on top of countries',
  show_legend: 'Legend',
  show_legend_desc: 'Whether to display the legend (toggles)',
  x_axis_showminmax: 'X bounds',
  x_axis_showminmax_desc: 'Whether to display the min and max values of the X axis',
  rich_tooltip: 'Rich Tooltip',
  rich_tooltip_desc: 'The rich tooltip shows a list of all series for that ' +
  'point in time',
  y_axis_zero: 'Y Axis Zero',
  y_axis_zero_desc: 'Force the Y axis to start at 0 instead of the minimum value',
  y_log_scale: 'Y Log Scale',
  y_log_scale_desc: 'Use a log scale for the Y axis',
  x_log_scale: 'X Log Scale',
  x_log_scale_desc: 'Use a log scale for the x axis',
  donut: 'Dount',
  donut_desc: 'Do you want a donut or a pie?',
  labels_outside: 'Put labels outside',
  labels_outside_desc: 'Put the labels outside the pie?',
  contribution: 'Contribution',
  contribution_desc: 'Compute the contribution to the total',
  num_period_compare: 'Period Ratio',
  num_period_compare_desc: '[integer] Number of period to compare against, ' +
  'this is relative to the granularity selected',
  period_ratio_type: 'Period Ratio Type',
  period_ratio_type_choices: [
    ['factor', 'factor'],
    ['growth', 'growth'],
    ['value', 'value'],
  ],
  period_ratio_type_default: 'growth',
  period_ratio_type_desc: '`factor` means (new/previous), `growth` is ' +
  '((new/previous) - 1), `value` is (new-previous)',
  time_compare: 'Time Shift',
  time_compare_desc: 'Overlay a timeseries from a ' +
  'relative time period. Expects relative time delta ' +
  'in natural language (example:  24 hours, 7 days, ' +
  '56 weeks, 365 days',
  subheader: 'Subheader',
  subheader_desc: 'Description text that shows up below your Big Number',
  mapbox_label: 'label',
  mapbox_label_desc: '`count` is COUNT(*) if a group by is used. ' +
  'Numerical columns will be aggregated with the aggregator. ' +
  'Non-numerical columns will be used to label points. ' +
  'Leave empty to get a count of points in each cluster.',
  mapbox_style: 'Map Style',
  mapbox_style_desc: 'Base layer map style',
  clustering_radius: 'Clustering Radius',
  clustering_radius_desc: 'The radius (in pixels) the algorithm uses to define a cluster. ' +
  'Choose 0 to turn off clustering, but beware that a large ' +
  'number of points (>1000) will cause lag.',
  point_radius: 'Point Radius',
  point_radius_desc: 'The radius of individual points (ones that are not in a cluster). ' +
  'Either a numerical column or `Auto`, which scales the point based ' +
  'on the largest cluster',
  point_radius_unit: 'Point Radius Unit',
  point_radius_unit_choices: [
    ['Pixels', 'Pixels'],
    ['Miles', 'Miles'],
    ['Kilometers', 'Kilometers'],
  ],
  point_radius_unit_default: 'Pixels',
  point_radius_unit_desc: 'The unit of measure for the specified point radius',
  global_opacity: 'Opacity',
  global_opacity_desc: 'Opacity of all clusters, points, and labels. ' +
  'Between 0 and 1.',
  viewport_zoom: 'Zoom',
  viewport_zoom_desc: 'Zoom level of the map',
  viewport_latitude: 'Default latitude',
  viewport_latitude_desc: 'Latitude of default viewport',
  viewport_longitude: 'Default longitude',
  viewport_longitude_desc: 'Longitude of default viewport',
  render_while_dragging: 'Live render',
  render_while_dragging_desc: 'Points and clusters will update as viewport is being changed',
  mapbox_color: 'RGB Color',
  mapbox_color_desc: 'The color for points and clusters in RGB',
  ranges: 'Ranges',
  ranges_desc: 'Ranges to highlight with shading',
  range_labels: 'Range labels',
  range_labels_desc: 'Labels for the ranges',
  markers: 'Markers',
  markers_desc: 'List of values to mark with triangles',
  marker_labels: 'Marker labels',
  marker_labels_desc: 'Labels for the markers',
  marker_lines: 'Marker lines',
  marker_lines_desc: 'List of values to mark with lines',
  marker_line_labels: 'Marker line labels',
  marker_line_labels_desc: 'Labels for the marker lines',
  line: 'line',
  line_desc: 'One or many lines to display',
  bar: 'bar',
  bar_desc: 'One or many bars to display',
  area: 'area',
  area_desc: 'One or many areas to display',
  scatter: 'scatter',
  scatter_desc: 'One or many scatters to display',
  yAxis: 'yAxis',
  yAxis_desc: 'choose the yAxias',
  y_axis_label1: 'Y1 Axis Label',
  y_axis_label2: 'Y2 Axis Label',
  y_domain1: 'Y1 domain',
  y_domain2: 'Y2 domain',
  y_domain1_desc: 'the range of y1, for example: 0,100, it means from 0 to 100',
  y_domain2_desc: 'the range of y2, for example: 0,100, it means from 0 to 100',
  bar_horizontal: 'Horizontal Bars',
  d3_format_docs: 'D3 format syntax: https://github.com/d3/d3-format',
  select_column: 'Select column',
  select_operato: 'Select operato',
  filter_value: 'Filter value',
  choose_chart: 'Choose Chart',
  base_chart: 'Base Chart',
  bar_chart: 'Bar Chart',
  line_chart: 'Line Chart',
  area_chart: 'Area Chart',
  advanced_chart: 'Advance Chart',
  measurement_chart: 'Measurement chart',
  big_chart: 'Big Chart',
  map_chart: 'Map',
  other_chart: 'Other Chart',
  filter_box: 'Filter Box',
  table: 'Table',
  pivot_table: 'Piovt Table',
  dist_bar: 'Dist BAR',
  bar2: 'Bar',
  multi: 'Multi',
  line2: 'Line',
  linePlusBar: 'LinePlusBar',
  compare: 'Compare',
  linePlusBar1: 'Bar Chart',
  area2: 'Area',
  area1: 'Area(T)',
  pie: 'Pie',
  bubble: 'Bubble',
  radar: 'Radar',
  scatter_chart: 'Scatter',
  sankey: 'Sankey',
  directed_force: 'Directed Force',
  horizon: 'Horizon',
  mapbox: 'Mapbox',
  treemap: 'Treemap',
  box_plot: 'Box Plot',
  para: 'Para',
  cal_heatmap: 'Cal Heatmap',
  sunburst: 'Sunburst',
  big_number: 'Big Number',
  big_number_total: 'Big Number(T)',
  bullet: 'Bullet',
  dash: 'Dash',
  world_cloud: 'World Cloud',
  world_map: 'World Map',
  world_map1: 'China Map',
  markup1: 'Markup1',
  markup: 'Markup',
  iframe: 'Iframe',
  separator: 'Separator',
  current_chart: 'Current Chart:',
  where_clause: 'Where Clause',
  having_clause: 'Having Clause',
  input_parent_node: 'Input Parent Node',
  child_node: 'Child Node',
  parent_node: 'Parent Node',
  choose_child_node: 'Choose Child Node',
  choose_option: 'Choose Option to Show',
  show_option: 'SHow Option',
  choose_groupby_option: 'Choose Groupby Option',
  choose_column_option: 'Choose Column Option',
  measure: 'Measure',
  choose_value_option: 'Choose Value Option',
  setting_style: 'Setting Style',
  column_style: 'Column Style',
  add_column_style: 'Add Column Style',
  base_setting: 'Base Setting',
  field_default: 'Field Default Value',
  date_default: 'Date Default Value',
  add_default: 'Add Default Value',
  field: 'Field',
  length: 'Length',
  isMulti: 'Is Mutiple',
  typeChoices: [
    { key: 'Select the default value from the collection', value: 'true' },
    { key: 'Query the default collection from the sql statement', value: 'false' },
  ],
  choose_default_value: 'Choose Default Value',
  default_value: 'Default Value',
  default_value_desc: 'Fill in default values, separated by commas in English',
  sql: 'Sql statement',
  default_sql: 'Get Sets From Sql',
  type: 'Type',
  from: 'From',
  to: 'To',
  add_filter: 'Add Filter',
  druidTimeSeries: 'Time',
  druidTimeSeries_fieldSetRows: [
    ['granularity', 'druid_time_origin'],
    ['since', 'until'],
  ],
  druidTimeSeries_desc: 'Time related form attributes',
  datasourceAndVizType: 'Datasource & Chart Type',
  datasourceAndVizType_fieldSetRows: [
    ['datasource'],
    ['viz_type'],
  ],
  sqlaTimeSeries: 'Time',
  sqlaTimeSeries_fieldSetRows: [
    ['granularity_sqla', 'time_grain_sqla'],
    ['since', 'until'],
  ],
  sqlaTimeSeries_desc: 'Time related form attributes',
  sqlClause: 'SQL',
  sqlClause_fieldSetRows: [
    ['where', 'having'],
  ],
  sqlClause_desc: 'This section exposes ways to include snippets of SQL in your query',
  NVD3TimeSeries: 'Advanced Analytics',
  NVD3TimeSeries_fieldSetRows1: [
    ['metrics'],
    ['groupby'],
    ['limit', 'timeseries_limit_metric'],
  ],
  NVD3TimeSeries_desc: 'This section contains options ' +
  'that allow for advanced analytical post processing ' +
  'of query results',
  NVD3TimeSeries_fieldSetRows2: [
    ['rolling_type', 'rolling_periods'],
    ['time_compare'],
    ['num_period_compare', 'period_ratio_type'],
    ['resample_how', 'resample_rule'],
    ['resample_fillmethod'],
  ],
  filters1: 'Filters',
  filters1_desc: 'Filters are defined using comma delimited strings as in <US,FR,Other>' +
  'Leave the value field empty to filter empty strings or nulls' +
  'For filters with comma in values, wrap them in single quotes' +
  "as in <NY, 'Tahoe, CA', DC>",
  filters2: 'Result Filters',
  filters2_desc: 'The filters to apply after post-aggregation.' +
  'Leave the value field empty to filter empty strings or nulls',
  chart_options: 'Chart Options',
  dist_bar_viz: 'Distribution - Bar Chart',
  dist_bar_viz_fieldSetRows: [
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
  tooltip_text: 'tooltip text here',
  breakDowns: 'Breakdowns',
  breakDowns_desc: 'Defines how each series is broken down',
  ag_grid: 'Ag-grid View',
  ag_grid1_fieldSetRows: [
    ['groupby', 'metrics'],
  ],
  ag_grid1_desc: 'Use this section if you want a query that aggregates',
  ag_grid2: 'Options',
  ag_grid2_fieldSetRows: [
    ['table_timestamp_format'],
    ['row_limit'],
    ['order_by_cols'],
  ],
  linePlusBar_viz: 'Distribution - LinePlusBar Chart',
  linePlusBar_viz_fieldSetRows: [
    ['groupby'],
    ['metrics'],
    ['row_limit', 'bottom_margin'],
    ['x_axis_label', 'x_axis_format'],
    ['y_axis_label1', 'y_axis_format1'],
    ['y_axis_label2', 'y_axis_format2'],
    ['reduce_x_ticks', 'contribution'],
  ],
  multi_viz: 'Distribution - Multi Chart',
  multi_viz_fieldSetRows: [
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
  pie_viz: 'Pie Chart',
  pie_viz_fieldSetRows: [
    ['metrics', 'groupby'],
    ['limit'],
    ['pie_label_type'],
    ['donut', 'show_legend'],
    ['labels_outside'],
  ],
  line_viz: 'Time Series - Line Chart',
  line_viz_fieldSetRows: [
    ['show_brush', 'show_legend'],
    ['rich_tooltip', 'y_axis_zero'],
    ['y_log_scale', 'contribution'],
    ['show_markers', 'x_axis_showminmax'],
    ['line_interpolation'],
    ['x_axis_format', 'y_axis_format'],
    ['x_axis_label', 'y_axis_label'],
  ],
  bar_viz: 'Time Series - Bar Chart',
  bar_viz_fieldSetRows: [
    ['show_brush', 'show_legend', 'show_bar_value'],
    ['rich_tooltip', 'y_axis_zero'],
    ['y_log_scale', 'contribution'],
    ['x_axis_format', 'y_axis_format'],
    ['line_interpolation', 'bar_stacked'],
    ['x_axis_showminmax', 'bottom_margin'],
    ['x_axis_label', 'y_axis_label'],
    ['reduce_x_ticks', 'show_controls'],
  ],
  compare_viz: 'Time Series - Percent Change',
  area_viz: 'Time Series - Stacked',
  area_viz_fieldSetRows: [
    ['show_brush', 'show_legend'],
    ['rich_tooltip', 'y_axis_zero'],
    ['y_log_scale', 'contribution'],
    ['x_axis_format', 'y_axis_format'],
    ['x_axis_showminmax', 'show_controls'],
    ['line_interpolation', 'stacked_style'],
  ],
  table_viz: 'Table View',
  table_viz_fieldSetRows: [
    ['table_timestamp_format'],
    ['row_limit'],
    ['page_length'],
    ['order_by_cols'],
    ['include_search', 'table_filter'],
  ],
  markup_fieldSetRows: [
    ['markup_type', 'code'],
  ],
  pivot_table_viz: 'Pivot Table',
  pivot_table_viz_fieldSetRows: [
    ['groupby', 'columns'],
    ['metrics', 'pandas_aggfunc'],
  ],
  separator_fieldSetRows: [
    ['code'],
  ],
  word_cloud_viz: 'Word Cloud',
  world_cloud_fieldSetRows: [
    ['series', 'metric', 'limit'],
    ['size_from', 'size_to'],
    ['rotation'],
  ],
  treemap_fieldSetRows1: [
    ['metrics'],
    ['groupby'],
  ],
  treemap_fieldSetRows2: [
    ['treemap_ratio'],
    ['number_format'],
  ],
  cal_heatmap_viz: 'Calendar Heatmap',
  cal_heatmap_viz_fieldSetRows: [
    ['metric'],
    ['domain_granularity'],
    ['subdomain_granularity'],
  ],
  box_plot_fieldSetRows: [
    ['metrics'],
    ['groupby', 'limit'],
  ],
  bubble_viz: 'Bubble Chart',
  bubble_viz_fieldSetRows1: [
    ['series', 'entity'],
    ['x', 'y'],
    ['size', 'limit'],
  ],
  bubble_viz_fieldSetRows2: [
    ['x_log_scale', 'y_log_scale'],
    ['show_legend'],
    ['max_bubble_size'],
    ['x_axis_label', 'y_axis_label'],
  ],
  bullet_viz: 'Bullet Chart',
  bullet_viz_fieldSetRows: [
    ['metric'],
    ['ranges', 'range_labels'],
    ['markers', 'marker_labels'],
    ['marker_lines', 'marker_line_labels'],
  ],
  big_number_viz: 'Big Number with Trendline',
  big_number_viz_fieldSetRows: [
    ['metric'],
    ['compare_lag'],
    ['compare_suffix'],
    ['y_axis_format'],
  ],
  big_number_total_fieldSetRows: [
    ['metric'],
    ['subheader'],
    ['y_axis_format'],
  ],
  histogram: 'Histogram',
  histogram_fieldSetRows1: [
    ['all_columns_x'],
    ['row_limit'],
  ],
  histogram2: 'Histogram Options',
  histogram_fieldSetRows2: [
    ['link_length'],
  ],
  all_columns_x: 'Numeric Column',
  all_columns_x_desc: 'Select the numeric column to draw the histogram',
  link_length1: 'No of Bins',
  link_length1_desc: 'Select number of bins for the histogram',
  sunburst_fieldSetRows: [
    ['groupby'],
    ['metric', 'secondary_metric'],
    ['row_limit'],
  ],
  sunburst_metric: 'Primary Metric',
  sunburst_metric_desc: 'The primary metric is used to define the arc segment sizes',
  sunburst_secondary_metric: 'Secondary Metric',
  sunburst_secondary_metric_desc: 'This secondary metric is used to ' +
  'define the color as a ratio against the primary metric. ' +
  'If the two metrics match, color is mapped level groups',
  sunburst_groupby: 'Hierarchy',
  sunburst_groupby_desc: 'This defines the level of the hierarchy',
  sankey_fieldSetRows: [
    ['groupby'],
    ['metric'],
    ['row_limit'],
  ],
  sankey_groupby: 'Source / Target',
  sankey_groupby_desc: 'Choose a source and a target',
  directed_force_viz: 'Directed Force Layout',
  directed_force_viz_fieldSetRows1: [
    ['groupby'],
    ['metric'],
    ['row_limit'],
  ],
  directed_force_viz2: 'Force Layout',
  directed_force_viz_fieldSetRows2: [
    ['link_length'],
    ['charge'],
  ],
  world_map_fieldSetRows: [
    ['entity'],
    ['country_fieldtype'],
    ['metric'],
  ],
  world_map_bubbles: 'Bubbles',
  world_map_bubbles_fieldSetRows: [
    ['show_bubbles'],
    ['secondary_metric'],
    ['max_bubble_size'],
  ],
  world_map_entity: 'Country Field',
  world_map_entity_desc: '3 letter code of the country',
  world_map_metric: 'Metric for color',
  world_map_metric_desc: 'Metric that defines the color of the country',
  world_map_secondary_metric: 'Bubble size',
  world_map_secondary_metric_desc: 'Metric that defines the size of the bubble',
  filter_box_fieldSetRows: [
    ['date_filter'],
    ['groupby'],
    ['metric'],
  ],
  filter_box_groupby: 'Filter fields',
  filter_box_groupby_desc: 'The fields you want to filter on',
  para_viz: 'Parallel Coordinates',
  para_viz_fieldSetRows: [
    ['series'],
    ['metrics'],
    ['secondary_metric'],
    ['limit'],
    ['show_datatable', 'include_series'],
  ],
  heatmap_viz: 'Heatmap',
  heatmap_viz_label: 'Axis & Metrics',
  heatmap_viz_fieldSetRows1: [
    ['all_columns_x'],
    ['all_columns_y'],
    ['metric'],
  ],
  heatmap_viz2: 'Heatmap Options',
  heatmap_viz_fieldSetRows2: [
    ['linear_color_scheme'],
    ['xscale_interval', 'yscale_interval'],
    ['canvas_image_rendering'],
    ['normalize_across'],
  ],
  horizon_fieldSetRows: [
    ['series_height', 'horizon_color_scale'],
  ],
  mapbox_fieldSetRows: [
    ['all_columns_x', 'all_columns_y'],
    ['clustering_radius'],
    ['row_limit'],
    ['groupby'],
    ['render_while_dragging'],
  ],
  mapbox2: 'Points',
  mapbox_fieldSetRows2: [
    ['point_radius'],
    ['point_radius_unit'],
  ],
  mapbox3: 'Labelling',
  mapbox_fieldSetRows3: [
    ['mapbox_label'],
    ['pandas_aggfunc'],
  ],
  mapbox4: 'Visual Tweaks',
  mapbox_fieldSetRows4: [
    ['mapbox_style'],
    ['global_opacity'],
    ['mapbox_color'],
  ],
  mapbox5: 'Viewport',
  mapbox_fieldSetRows5: [
    ['viewport_longitude'],
    ['viewport_latitude'],
    ['viewport_zoom'],
  ],
  mapbox_all_columns_x: 'Longitude',
  mapbox_all_columns_x_desc: 'Column containing longitude data',
  mapbox_all_columns_y: 'Latitude',
  mapbox_all_columns_y_desc: 'Column containing latitude data',
  mapbox_pandas_aggfunc: 'Cluster label aggregator',
  mapbox_pandas_aggfunc_desc: 'Aggregate function applied to the list of points ' +
  'in each cluster to produce the cluster label.',
  mapbox_rich_tooltip: 'Tooltip',
  mapbox_rich_tooltip_desc: 'Show a tooltip when hovering over points and clusters ' +
  'describing the label',
  mapbox_groupby_desc: 'One or many fields to group by. If grouping, latitude ' +
  'and longitude columns must be present.',

  // explore
  export_to_json: 'Export to .json',
  export_to_csv: 'Export to .csv format',
  no_result: 'No Result',
};
export default en_US;
