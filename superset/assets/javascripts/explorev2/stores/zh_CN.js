const zh_CN = {
  header_style: '表头样式',
  table_style: '表样式',
  col_style: '列样式:',
  add_col_style: ' 添加列样式',
  metric: '指标',
  style: '样式',
  threshold: '阀值',
  icon: '图标',
  base_style: '基本样式',
  condition_style: '条件样式',
  compare_style: '列间比较',
  slice_navigator: '切片导航',
  ag_setting: '复杂表格设置',
  add_base_style: ' 添加基本样式',
  add_condition_style: ' 添加条件样式',
  add_compare_style: ' 添加列间比较',
  add_slice_navigator: ' 添加导航',
  grid_theme: '主题:',
  theme: '主题',
  page_count: '页面条数',
  count: '条数',
  frozen_left: '冻结左边',
  frozen_col: '选择列',
  frozen_right: '冻结右边',
  enable_piovttable: '启用数据透视表',
  add_table_header_setting: ' 添加表头设置',
  metric1: '指标1',
  metric2: '指标2',
  compare_expressoin: '表达式(用x,y表示两列)',
  iconChoices: [
    { key: '无', value: '' },
    { key: '上升(单箭头)', value: 'fa fa-arrow-up' },
    { key: '下降(单箭头)', value: 'fa fa-arrow-down' },
    { key: '上升(双箭头)', value: 'fa fa-angle-double-up' },
    { key: '下降(双箭头)', value: 'fa fa-angle-double-down' },
    { key: '条形图', value: 'fa fa-bar-chart' },
    { key: '折线图', value: 'fa fa-line-chart' },
    { key: '饼状图', value: 'fa fa-pie-chart' },
    { key: '区域图', value: 'fa fa-area-chart' },
  ],
  navigateChoices: [
    { key: '报表', value: 'dashboard' },
    { key: '切片', value: 'slice' },
  ],
  openChoices: [
    { key: '弹框', value: 'modal' },
    { key: '新窗口', value: 'newWindow' },
  ],
  navigate_slice: '导航到切片',
  navigate_dashboard: '导航到报表',
  width: '宽度',
  height: '高度',
  navigate_type: '导航类型',
  open_type: '打开方式',
  datasource: '数据源',
  viz: '图形',
  metrics: '指标',
  metrics_to_display: '要显示的一个或多个指标',
  ordring: '排序',
  choose_metric: '选择指标',
  stacked_style: '堆叠样式',
  stacked_style_choices: [
    ['stack', '堆栈'],
    ['stream', '喷射'],
    ['expand', '扩展'],
  ],
  linear_color_scheme: '线性颜色方案',
  linear_color_scheme_choices: [
    ['fire', '火焰'],
    ['blue/white/yellow', '蓝白黄'],
    ['white/black', '白黑'],
    ['black/white', '黑白'],
  ],
  normalize_across: '标准化',
  normalize_across_choices: [
    ['heatmap', '热力图'],
    ['x', 'x'],
    ['y', 'y'],
  ],
  normalize_across_description:
  '颜色将根据比例进行渲染',
  horizon_color_scale: '水平线线色标',
  horizon_color_scale_choices: [
    ['series', '项目'],
    ['overall', '综合'],
    ['change', '变化'],
  ],
  horizon_color_scale_description: '定义颜色属性',
  rendering: '渲染',

  canvas_image_rendering_choices: [
    ['pixelated', '像素化(锐利)'],
    ['auto', '自动(平滑)'],
  ],
  canvas_image_rendering_description:
  '浏览器渲染图片的方式',
  xscale_interval: 'X轴步长',
  xscale_interval_description: 'X轴每个刻度的单位长度',
  yscale_interval: 'Y轴步长',
  yscale_interval_description: 'Y轴每个刻度的单位长度',
  bar_stacked: '堆积',
  show_markers: '显示标记',
  show_markers_description: '将数据点显示为线上的圆圈标记',
  show_bar_value: '柱状图的值',
  show_bar_value_description: '显示柱状图顶部的值',
  order_bars: '是否排序',
  order_bars_description: '根据X轴排序',
  show_controls: '扩展控件',
  show_controls_desc: '是否显示扩展控件',
  reduce_x_ticks: 'X轴自适应',
  reduce_x_ticks_desc: '当X轴显示不下时，自动调整X轴步长',
  include_series: '显示项目',
  include_series_desc: '坐标上显示项目名称',
  secondary_metric: '颜色度量',
  secondary_metric_desc: '颜色度量项目',
  country_fieldtype: '国家名称编码方式',
  country_fieldtype_choices: [
    ['name', '全名'],
    ['cioc', '国际奥委会编码(cioc)'],
    ['cca2', 'ISO 3166-1 alpha-2编码(cca2)'],
    ['cca3', 'ISO 3166-1 alpha-3编码(cca3)'],
  ],
  country_fieldtype_default: 'ISO 3166-1 alpha-2编码(cca2)',
  country_fieldtype_desc: '数据库中国家名称类型',
  groupby: '分组',
  groupby_desc: '根据一个或多个字段分组',
  columns: '列',
  columns_desc: '将一个或多个字段做为列',
  all_columns: '列',
  all_columns_desc: '显示列',
  columns_to_display: '显示列',
  origin: '起点',
  druid_time_origin_choices: [
    ['', '默认'],
    ['now', '现在'],
  ],
  druid_time_origin_desc: '定义时间起点，支持`now`, `sunday` or `1970-01-01`等',
  bottom_margin: '底部留白',
  bottom_margin_desc: '底部留白的像素大小',
  granularity: '时间粒度',
  granularity_choices: [
    ['all', '全部'],
    ['5 seconds', '5秒'],
    ['30 seconds', '30秒'],
    ['1 minute', '1分钟'],
    ['5 minutes', '5分钟'],
    ['1 hour', '1小时'],
    ['6 hour', '6小时'],
    ['1 day', '1天'],
    ['7 days', '7天'],
    ['week', '一周'],
    ['week_starting_sunday', '周日开始的一周'],
    ['week_ending_saturday', '以周六结束的一周'],
    ['month', '月'],
  ],
  granularity_default: '1天',
  granularity_desc: '图表时间粒度。可以使用`10 seconds`, `1 day`, `56 weeks`等',
  domain_granularity: '区域',
  domain_granularity_choices: [
    ['hour', '小时'],
    ['day', '天'],
    ['week', '周'],
    ['month', '月'],
    ['year', '年'],
  ],
  domain_granularity_default: '月',
  domain_granularity_desc: '每个区域表示的时间段',
  subdomain_granularity: '方块',
  subdomain_granularity_choices: [
    ['min', '分钟'],
    ['hour', '小时'],
    ['day', '天'],
    ['week', '周'],
    ['month', '月'],
  ],
  subdomain_granularity_default: '天',
  subdomain_granularity_desc: '每个区域内方块表示的时间段。必须比区域时间段小，比时间粒度大。',
  link_length: '链接长度',
  link_length_desc: '有向图中的链接长度',
  charge: '缩放',
  charge_desc: '有向图缩放大小',
  granularity_sqla: '时间字段',
  granularity_sqla_desc: '图表中的时间字段。可以在表格编辑器中返回任意DATETIME列。',
  time_grain_sqla: '时间粒度',
  time_grain_sqla_default: '时间列',
  time_grain_sqla_desc: '图表中的时间粒度。用于替换时间字段默认的时间粒度。',
  resample_rule: '重采样尺度',
  resample_rule_desc: '重采样尺度',
  resample_how: '重采样方式',
  resample_how_choices: [
    ['', ''],
    ['mean', '平均值'],
    ['sum', '求和'],
    ['median', '中间值'],
  ],
  resample_how_desc: '重采样方式',
  resample_fillmethod: '插值方式',
  resample_fillmethod_choices: ['', 'ffill', 'bfill'],
  resample_fillmethod_desc: '重采样插值方式',
  since: '起始时间',
  since_choices: [
    ['1 hour ago', '一小时前'],
    ['12 hours ago', '十二小时前'],
    ['1 day ago', '一天前'],
    ['7 days ago', '七天前'],
    ['28 days ago', '二十八天前'],
    ['90 days ago', '九十天前'],
    ['1 year ago', '一年前'],
    ['100 year ago', '很久以前'],
  ],
  since_default: '七天前',
  since_desc: '时间范围。支持自定义，可使用自然语言，如`1 day ago`, `28 days` or `3 years`',
  until: '结束时间',
  until_choices: [
    ['now', '现在'],
    ['1 day ago', '一天前'],
    ['7 days ago', '七天前'],
    ['28 days ago', '二十八天前'],
    ['90 days ago', '九十天前'],
    ['1 year ago', '一年前'],
  ],
  until_default: '现在',
  max_bubble_size: '气泡最大尺寸',
  whisker_options: '非异常值选项',
  whisker_options_choices: [
    ['Tukey', '图基法'],
    ['Min/max (no outliers)', '最小/最大值(无异常值)'],
    ['2/98 percentiles', '2/98百分比'],
    ['9/91 percentiles', '9/91百分比'],
  ],
  whisker_options_default: '图基法',
  whisker_options_desc: '计算最大/最小非异常值的方法',
  treemap_ratio: '比例',
  treemap_ratio_desc: '树状图中方块的比例',
  number_format: '数字格式',
  row_limit: '行数上限',
  limit: '项目上限',
  limit_desc: '设置显示项目的数量上限',
  timeseries_limit_metric: '排序',
  timeseries_limit_metric_desc: '指标用于定义顶级项目',
  rolling_type: '滚动',
  rolling_type_choices: [
    ['None', '无'],
    ['mean', '平均值'],
    ['sum', '求和'],
    ['std', '标准差'],
    ['cumsum', '累加'],
  ],
  rolling_type_default: '无',
  rolling_type_desc: '滚动窗口聚合函数，配合[周期]使用',
  rolling_periods: '周期',
  rolling_periods_desc: '滚动窗口大小，取值和时间粒度相关',
  series: '项目',
  series_desc: '定义分组实体。每个项目有特定的颜色和图例。',
  entity: '实体',
  entity_desc: '在图表上绘制的元素',
  x: 'X轴',
  x_desc: 'X轴对应的项目',
  y: 'Y轴',
  y_desc: 'Y轴对应的项目',
  size: '气泡大小',
  url_desc: 'URL，此字段是模板化的，因此您可以集成{{width}}和/或{{height}}您的URL字符串中。',
  x_axis_label: 'X轴名称',
  y_axis_label: 'Y轴名称',
  where: 'WHERE语句',
  where_desc: '语句将包含到WHERE子句中，并用AND连接到其他条件。',
  having: 'HAVING语句',
  having_desc: '语句将包含到HAVE子句中，并用AND连接到其他条件',
  compare_lag: '滞后比较周期',
  compare_lag_desc: '比较的时间周期，基于时间粒度',
  compare_suffix: '后缀文字',
  compare_suffix_desc: '百分比后面显示的文本',
  table_timestamp_format: '时间格式',
  table_timestamp_format_desc: '时间格式',
  series_height: '项目高度',
  series_height_desc: '每个项目的像素高度',
  page_length: '页面长度',
  page_length_desc: '每页行数，0表示无分页',
  x_axis_format: 'X轴数值格式',
  y_axis_format: 'Y轴数值格式',
  markup_type: '标记类型',
  markup_type_choices: [
    ['markdown', '简化'],
    ['html', 'HTML'],
  ],
  markup_type_default: '简化',
  markup_type_desc: '选择标记语言',
  rotation: '旋转',
  rotation_choices: [
    ['random', '随机'],
    ['flat', 'flat'],
    ['square', '方格'],
  ],
  rotation_default: '随机',
  rotation_desc: '词汇云中词语的旋转方式',
  line_interpolation: '线形',
  line_interpolation_desc: '定义线形',
  line_interpolation_choices: [
    ['linear', '折线'],
    ['basis', 'B样条曲线'],
    ['cardinal', '基本样条曲线'],
    ['monotone', '三次插值曲线'],
    ['step-before', '前阶梯线'],
    ['step-after', '后阶梯线'],
  ],
  line_interpolation_default: '折线',
  pie_label_type: '标签类型',
  pie_label_type_choices: [
    ['键', 'Category Name'],
    ['值', 'Value'],
    ['百分比', 'Percentage'],
  ],
  pie_label_type_default: '键',
  pie_label_type_desc: '标签上应该显示什么？',
  code: '代码',
  code_desc: '输入代码',
  pandas_aggfunc: '聚合函数',
  pandas_aggfunc_choices: [
    ['sum', '求和'],
    ['mean', '平均值'],
    ['min', '最小值'],
    ['max', '最大值'],
    ['median', '中间值'],
    ['stdev', '标准差'],
    ['var', '变量值'],
  ],
  pandas_aggfunc_default: '求和',
  pandas_aggfunc_desc: '透视时计算行和列的聚合函数',
  size_from: '最小字体',
  size_from_desc: '列表中最小值的字体大小',
  size_to: '最大字体',
  size_to_desc: '列表中最大值的字体大小',
  show_brush: '区间过滤',
  show_brush_desc: '是否显示时间区间选择控件',
  date_filter: '时间过滤器',
  date_filter_desc: '是否包含时间过滤器',
  show_datatable: '明细表',
  show_datatable_desc: '是否显示明细表',
  include_search: '搜索框',
  include_search_desc: '是否显示搜索框',
  table_filter: '表格过滤器',
  table_filter_desc: '是否显示表格过滤器',
  show_bubbles: '显示气泡',
  show_bubbles_desc: '是否在国家上显示气泡',
  show_legend: '图例',
  show_legend_desc: '是否显示图例',
  x_axis_showminmax: 'X轴边界',
  x_axis_showminmax_desc: '是否显示X轴的最大最小值',
  rich_tooltip: '详细信息',
  rich_tooltip_desc: '显示特定时间点的所有项目',
  y_axis_zero: 'Y轴从0开始',
  y_axis_zero_desc: 'Y轴不是从最小值开始',
  y_log_scale: 'Y轴对数',
  y_log_scale_desc: '对Y轴使用对数刻度',
  x_log_scale: 'X轴对数',
  x_log_scale_desc: '对X轴使用对数刻度',
  donut: '环形图',
  donut_desc: '使用环形图替代饼图',
  labels_outside: '把标签放在外面',
  labels_outside_desc: '是否把标签放在饼图外面',
  contribution: '贡献值',
  contribution_desc: '在总和中的贡献值',
  num_period_compare: '周期比',
  num_period_compare_desc: '[整数]要比较的周期数，和粒度有关',
  period_ratio_type: '周期比类型',
  period_ratio_type_choices: [
    ['factor', '因子'],
    ['growth', '增长'],
    ['value', '值'],
  ],
  period_ratio_type_default: '增长',
  period_ratio_type_desc: '`因子` 表示（new / previous），`growth`是（（new / previous） - 1），' +
  '`value`是（new-previous）',
  time_compare: '时间飘移',
  time_compare_desc: '相关时间周期内的时间偏移。相对时间，如:  24 hours, 7 days, 56 weeks, 365 days',
  subheader: '子标题',
  subheader_desc: '在数字下显示的文本',
  mapbox_label: '标签',
  mapbox_label_desc: '对分组使用COUNT(*)。',
  mapbox_style: '图层样式',
  mapbox_style_desc: '基本图层样式',
  clustering_radius: '簇半径',
  clustering_radius_desc: '定义簇的半径大小(单位为像素)。0表示不显示簇。大量的点会导致显示缓慢。',
  point_radius: '点半径',
  point_radius_desc: '不在簇中点的半径。选择`Auto`时根据最大的簇自动调整。',
  point_radius_unit: '点半径单位',
  point_radius_unit_choices: [
    ['Pixels', '像素'],
    ['Miles', '英里'],
    ['Kilometers', '公里'],
  ],
  point_radius_unit_default: '像素',
  point_radius_unit_desc: '点半径的测量单位',
  global_opacity: '不透明度',
  global_opacity_desc: '所有簇、点和标签的不透明度。在1和0之间。',
  viewport_zoom: '縮放',
  viewport_zoom_desc: '地图的缩放级别',
  viewport_latitude: '默认纬度',
  viewport_latitude_desc: '视窗默认纬度',
  viewport_longitude: '默认经度',
  viewport_longitude_desc: '视窗默认经度',
  render_while_dragging: '实时更新',
  render_while_dragging_desc: '视窗发生改变时，点和簇实时更新',
  mapbox_color: 'RGB 颜色',
  mapbox_color_desc: 'RGB 分簇的颜色',
  ranges: '范围',
  ranges_desc: '范围用阴影高亮显示',
  range_labels: '范围标签',
  range_labels_desc: '范围标签',
  markers: '标记',
  markers_desc: '用三角形标记的值列表',
  marker_labels: '标记标签',
  marker_labels_desc: '标记标签',
  marker_lines: '标记线',
  marker_lines_desc: '用线条标记的值列表',
  marker_line_labels: '线条标记的标签',
  marker_line_labels_desc: '标记线的标签',
  line: '行',
  line_desc: '一行或多行显示',
  bar: '块',
  bar_desc: '一块或多块显示',
  area: '区域',
  area_desc: '一个或多个区域显示',
  scatter: '散点',
  scatter_desc: '一个或多个散点显示',
  yAxis: 'Y轴',
  yAxis_desc: '选择Y轴',
  y_axis_label1: 'Y1轴标签',
  y_axis_label2: 'Y2轴标签',
  y_domain1: 'Y1轴的域',
  y_domain2: 'Y2轴的域',
  y_domain1_desc: 'y1的范围，例如：0,100，表示从0到100',
  y_domain2_desc: 'y2的范围，例如：0,100，表示从0到100',
  bar_horizontal: '横向柱状图',
  d3_format_docs: '自定义格式请参考 https://github.com/mbostock/d3/wiki/Formatting',
  select_column: '选择过滤字段',
  select_operato: '选择过滤方式',
  filter_value: '过滤值',
  choose_chart: '选择图形',
  base_chart: '基础图形',
  bar_chart: '条形图',
  line_chart: '线形图',
  area_chart: '面积图',
  advanced_chart: '高级图',
  measurement_chart: '计量图',
  big_chart: '大字图',
  map_chart: '地图',
  other_chart: '其他',
  filter_box: '提示器',
  table: '表格',
  pivot_table: '数据透视表',
  dist_bar: '条形图',
  bar2: '条形图(T)',
  multi: '线形图',
  line2: '线形图(T)',
  linePlusBar: '线形图(S)',
  compare: '线形图(VS)',
  linePlusBar1: '条线图',
  area2: '面积图',
  area1: '面积图(T)',
  pie: '饼形图',
  bubble: '气泡图',
  radar: '雷达图',
  scatter_chart: '散点图',
  sankey: '蛇形图',
  directed_force: '拓扑图',
  horizon: '热力图',
  mapbox: '热力图',
  treemap: '树状图',
  box_plot: '箱体图',
  para: '帕拉图',
  cal_heatmap: '日历图',
  sunburst: '环形图',
  big_number: '大字图',
  big_number_total: '大字图(T)',
  bullet: '子弹图',
  dash: '仪表图',
  world_cloud: '云字图',
  world_map: '世界地图',
  world_map1: '中国地图',
  markup1: '叙述',
  markup: '标记',
  iframe: 'iframe',
  separator: '分隔器',
  echarts_bar: '[E]柱状图',
  echarts_line: '[E]折线图',
  echarts_line_bar: '[E]柱状折线图',
  echart_line_bar: '[E]柱状折线图',
  line_bar: '折线指标 和 柱状指标',
  line_bar_desc: '折线指标 和 柱状指标',
  bar_choice: '柱状指标',
  line_choice: '折线指标',
  bar_choice_desc: '柱状指标',
  line_choice_desc: '折线指标',
  echart_chart: 'Echart',

  menu_viztype: [
    { chart: 'area', icon: 'fa fa-area-chart', name: '饼图'},
    { chart: 'bar', icon: 'fa fa-bar-chart', name: '柱状图' },
    { chart: 'big_number', icon: 'fa fa-header', name: '大字图' },
    { chart: 'big_number_total', icon: 'fa fa-header', name: '大字图（合计）' },
    { chart: 'box_plot', icon: 'fa fa-bar-chart', name: '箱形图' },
    { chart: 'bubble', icon: 'fa fa-bar-chart', name: '水泡图' },
    { chart: 'bullet', icon: 'fa fa-bar-chart', name: '子弹图' },
    { chart: 'cal_heatmap', icon: 'fa fa-bar-chart', name: '日历热力图' },
    { chart: 'compare', icon: 'fa fa-line-chart', name: '对比图' },
    { chart: 'directed_force', icon: 'fa fa-bar-chart', name: '力导向' },
    { chart: 'dist_bar', icon: 'fa fa-bar-chart', name: '柱状图' },
    { chart: 'filter_box', icon: 'fa fa-check-square', name: '提示器' },
    { chart: 'heatmap', icon: 'fa fa-bar-chart', name: '热力图' },
    { chart: 'histogram', icon: 'fa fa-bar-chart', name: '柱状图' },
    { chart: 'horizon', icon: 'fa fa-bar-chart', name: '地平线图' },
    { chart: 'iframe', icon: 'fa fa-columns', name: '叙述' },
    { chart: 'line', icon: 'fa fa-line-chart', name: '折线图' },
    { chart: 'mapbox', icon: 'fa fa-bar-chart', name: '箱体图' },
    { chart: 'markup', icon: 'fa fa-bar-chart', name: '标记' },
    { chart: 'para', icon: 'fa fa-bar-chart', name: '帕拉图' },
    { chart: 'pie', icon: 'fa fa-pie-chart', name: '饼图' },
    { chart: 'pivot_table', icon: 'fa fa-table', name: '数据透视表' },
    { chart: 'sankey', icon: 'fa fa-bar-chart', name: '蛇形图' },
    { chart: 'separator', icon: 'fa fa-bar-chart', name: '分割线' },
    { chart: 'sunburst', icon: 'fa fa-bar-chart', name: '旭日图' },
    { chart: 'table', icon: 'fa fa-table', name: '表格' },
    { chart: 'treemap', icon: 'fa fa-bar-chart', name: '树状图' },
    { chart: 'word_cloud', icon: 'fa fa-bar-chart', name: '文字云' },
    { chart: 'world_map', icon: 'fa fa-map-marker', name: '世界地图' },
    { chart: 'linePlusBar', icon: 'fa fa-line-chart', name: '折线柱状图' },
    { chart: 'multi', icon: 'fa fa-line-chart', name: '折线柱状图（混合）' },
    { chart: 'ag_grid', icon: 'fa fa-table', name: 'AG Grid' },
    { chart: 'echarts_bar', icon: 'fa fa-bar-chart', name: '[E]柱状图' },
    { chart: 'echarts_bar_h', icon: 'fa fa-bar-chart', name: '[E]柱状图（横）' },
    { chart: 'echarts_line', icon: 'fa fa-line-chart', name: '[E]折线图' },
    { chart: 'echarts_line_bar', icon: 'fa fa-line-chart', name: '[E]柱状折线图' },
    { chart: 'echarts_pie_m', icon: 'fa fa-pie-chart', name: '[E]饼图(指标比例)' },
    { chart: 'echarts_pie_h', icon: 'fa fa-pie-chart', name: '[E]饼图(嵌套)' },
  ],

  current_chart: '当前图形：',
  where_clause: 'Where 子句',
  having_clause: 'Having 子句',
  input_parent_node: '输入父节点名称',
  child_node: '子节点',
  parent_node: '父节点',
  choose_child_node: '选择子节点',
  choose_option: '选择显示项',
  show_option: '显示项',
  choose_groupby_option: '选择 groupby 项',
  choose_column_option: '选择 column 项',
  measure: '度量',
  choose_value_option: '选择 value 项',
  setting_style: '设置样式',
  column_style: '字段样式',
  add_column_style: '添加字段样式',
  base_setting: '基本设置',
  field_default: '字段缺省值',
  date_default: '日期缺省值',
  add_default: '添加缺省值',
  field: '字段',
  length: '长度',
  isMulti: '是否多选',
  typeChoices: [
    { key: '从集合中选择缺省值', value: 'true' },
    { key: '从sql语句中查询缺省值集合', value: 'false' },
  ],
  choose_default_value: '缺省值选择',
  default_value: '缺省值',
  default_value_desc: '填写缺省值, 中间用英文逗号间隔',
  sql: 'sql语句',
  default_sql: 'sql获取缺省值',
  type: '类型',
  from: '开始日期',
  to: '截止日期',
  add_filter: '增加过滤条件',
  only_left: '仅左Y轴',
  only_left_desc: '仅显示左边Y轴.',
  only_bottom: '仅下X轴',
  only_bottom_desc: '仅显示下边X轴.',
  y_axis_metrics: 'Y轴指标',
  y_axis_metrics_desc: 'Y轴指标',
  y_axis_format: 'Y轴样式',
  y_axis_format_desc: 'Y轴样式. 例如:ml',
  y_axis_degree: 'Y轴刻度',
  y_axis_degree_desc: 'Y轴刻度.例如:{min:0,max:100}',
  y_axis_name: 'Y轴名称',
  y_axis_name_desc: 'Y轴名称.',

  x_axis_metrics: 'X轴指标',
  x_axis_metrics_desc: 'X轴指标',
  x_axis_format: 'X轴样式',
  x_axis_format_desc: 'X轴样式. 例如:ml',
  x_axis_degree: 'X轴刻度',
  x_axis_degree_desc: 'X轴刻度.例如:{min:0,max:100}',
  x_axis_name: 'X轴名称',
  x_axis_name_desc: 'X轴名称.',

  y_left_metrics: '左Y轴指标',
  y_left_metrics_desc: '左Y轴指标',
  y_right_metrics: '右Y轴指标',
  y_right_metrics_desc: '右Y轴指标',
  y_left_format: '左Y轴格式',
  y_left_format_desc: '左Y轴格式. 对应指标顺序. 例如:ml;%;',
  y_right_format: '右Y轴格式',
  y_right_format_desc: '右Y轴格式. 对应指标顺序. 例如:ml;%;',
  y_left_degree: '左Y轴刻度',
  y_left_degree_desc: '左Y轴刻度. 对应指标顺序. 例如:{min:0,max:100};{min:0,max:100};',
  y_right_degree: '右Y轴刻度',
  y_right_degree_desc: '右Y轴刻度. 对应指标顺序. 例如:{min:0,max:100};{min:0,max:100};',
  
  x_bottom_metrics: '下X轴指标',
  x_bottom_metrics_desc: '下X轴指标',
  x_top_metrics: '上X轴指标',
  x_top_metrics_desc: '上X轴指标',
  x_bottom_format: '下X轴格式',
  x_bottom_format_desc: '下X轴格式. 对应指标顺序. 例如:ml;%;',
  x_top_format: '上X轴格式',
  x_top_format_desc: '上X轴格式. 对应指标顺序. 例如:ml;%;',
  x_bottom_degree: '下X轴刻度',
  x_bottom_degree_desc: '下X轴刻度. 对应指标顺序. 例如:{min:0,max:100};{min:0,max:100};',
  x_top_degree: '上X轴刻度',
  x_top_degree_desc: '上X轴刻度. 对应指标顺序. 例如:{min:0,max:100};{min:0,max:100};',

  top_padding: '上边距',
  top_padding_desc: '上边距',
  bottom_padding: '下边距',
  bottom_padding_desc: '下边距',
  left_padding: '左边距',
  left_padding_desc: '左边距',
  right_padding: '右边距',
  right_padding_desc: '右边距',
  is_avg: '显示平均值',
  is_avg_desc: '显示平均值.',
  is_max_min: '显示最大最小值',
  is_max_min_desc: '显示最大最小值.',
  is_bar_value: '显示数值',
  is_bar_value_desc: '显示数值.',

  

  // viz_type

  druidTimeSeries: '时间',
  druidTimeSeries_fieldSetRows: [
    ['granularity', 'druid_time_origin'],
    ['since', 'until'],
  ],
  druidTimeSeries_desc: '时间相关的属性',
  datasourceAndVizType: '数据源和图表类型',
  datasourceAndVizType_fieldSetRows: [
    ['datasource'],
    ['viz_type'],
  ],
  sqlaTimeSeries: '时间',
  sqlaTimeSeries_fieldSetRows: [
    ['granularity_sqla', 'time_grain_sqla'],
    ['since', 'until'],
  ],
  sqlaTimeSeries_desc: '时间相关的属性',
  sqlClause: 'SQL',
  sqlClause_fieldSetRows: [
    ['where', 'having'],
  ],
  sqlClause_desc: '用于定制SQL语句',
  NVD3TimeSeries: '高级分析',
  NVD3TimeSeries_fieldSetRows1: [
    ['metrics'],
    ['groupby'],
    ['limit', 'timeseries_limit_metric'],
  ],
  NVD3TimeSeries_desc: '使用高级分析选项',
  NVD3TimeSeries_fieldSetRows2: [
    ['rolling_type', 'rolling_periods'],
    ['time_compare'],
    ['num_period_compare', 'period_ratio_type'],
    ['resample_how', 'resample_rule'],
    ['resample_fillmethod'],
  ],
  filters1: '筛选',
  filters1_desc: '使用逗号分隔多个过滤条件，如`US,FR,Other`',
  filters2: '结果过滤器',
  filters2_desc: '后汇总后应用的过滤器。将值字段留空以过滤空字符串或空值',
  chart_options: '图表选项',
  dist_bar_viz: '分布-柱状图',
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
  tooltip_text: '提示文本',
  breakDowns: '拆分',
  breakDowns_desc: '项目的拆分方式',
  ag_grid: '复杂表格',
  ag_grid1_fieldSetRows: [
    ['groupby', 'metrics'],
  ],
  ag_grid1_desc: '进行聚合查询',
  ag_grid2: '选项',
  ag_grid2_fieldSetRows: [
    ['表时间戳格式'],
    ['行数限制'],
    ['排序列'],
  ],
  linePlusBar_viz: '分布-柱状折线图',
  linePlusBar_viz_fieldSetRows: [
    ['groupby'],
    ['metrics'],
    ['row_limit', 'bottom_margin'],
    ['x_axis_label', 'x_axis_format'],
    ['y_axis_label1', 'y_axis_format1'],
    ['y_axis_label2', 'y_axis_format2'],
    ['reduce_x_ticks', 'contribution'],
  ],
  multi_viz: '分布-多图',
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
  pie_viz: '饼图',
  pie_viz_fieldSetRows: [
    ['metrics', 'groupby'],
    ['limit'],
    ['pie_label_type'],
    ['donut', 'show_legend'],
    ['labels_outside'],
  ],
  line_viz: '时间序列-折线图',
  line_viz_fieldSetRows: [
    ['show_brush', 'show_legend'],
    ['rich_tooltip', 'y_axis_zero'],
    ['y_log_scale', 'contribution'],
    ['show_markers', 'x_axis_showminmax'],
    ['line_interpolation'],
    ['x_axis_format', 'y_axis_format'],
    ['x_axis_label', 'y_axis_label'],
  ],
  bar_viz: '时间序列-柱状图',
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
  compare_viz: '时间序列-百分比变化',
  area_viz: '时间序列-堆积图',
  area_viz_fieldSetRows: [
    ['show_brush', 'show_legend'],
    ['rich_tooltip', 'y_axis_zero'],
    ['y_log_scale', 'contribution'],
    ['x_axis_format', 'y_axis_format'],
    ['x_axis_showminmax', 'show_controls'],
    ['line_interpolation', 'stacked_style'],
  ],
  table_viz: '表视图',
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
  pivot_table_viz: '透视表',
  pivot_table_viz_fieldSetRows: [
    ['groupby', 'columns'],
    ['metrics', 'pandas_aggfunc'],
  ],
  separator_fieldSetRows: [
    ['code'],
  ],
  word_cloud_viz: '词汇云',
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
  cal_heatmap_viz: '时间热力图',
  cal_heatmap_viz_fieldSetRows: [
    ['metric'],
    ['domain_granularity'],
    ['subdomain_granularity'],
  ],
  box_plot_fieldSetRows: [
    ['metrics'],
    ['groupby', 'limit'],
  ],
  bubble_viz: '气泡图',
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
  bullet_viz: '子弹图',
  bullet_viz_fieldSetRows: [
    ['metric'],
    ['ranges', 'range_labels'],
    ['markers', 'marker_labels'],
    ['marker_lines', 'marker_line_labels'],
  ],
  big_number_viz: '数字和趋势线',
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
  histogram: '直方图',
  histogram_fieldSetRows1: [
    ['all_columns_x'],
    ['row_limit'],
  ],
  histogram2: '直方图选项',
  histogram_fieldSetRows2: [
    ['link_length'],
  ],
  all_columns_x: '数字列',
  all_columns_x_desc: '选择数字列来绘制直方图',
  link_length1: '不分组',
  link_length1_desc: '选择直方图的数量',
  sunburst_fieldSetRows: [
    ['groupby'],
    ['metric', 'secondary_metric'],
    ['row_limit'],
  ],
  sunburst_metric: '主指标',
  sunburst_metric_desc: '主要指标用来定义的弧段尺寸',
  sunburst_secondary_metric: '次指标',
  sunburst_secondary_metric_desc: '次指标用于定义相对主指标的颜色',
  sunburst_groupby: '层次',
  sunburst_groupby_desc: '定义层次',
  sankey_fieldSetRows: [
    ['groupby'],
    ['metric'],
    ['row_limit'],
  ],
  sankey_groupby: '源/目标',
  sankey_groupby_desc: '选择源和目标',
  directed_force_viz: '有向图',
  directed_force_viz_fieldSetRows1: [
    ['groupby'],
    ['metric'],
    ['row_limit'],
  ],
  directed_force_viz2: '有向图',
  directed_force_viz_fieldSetRows2: [
    ['link_length'],
    ['charge'],
  ],
  world_map_fieldSetRows: [
    ['entity'],
    ['country_fieldtype'],
    ['metric'],
  ],
  world_map_bubbles: '气泡',
  world_map_bubbles_fieldSetRows: [
    ['show_bubbles'],
    ['secondary_metric'],
    ['max_bubble_size'],
  ],
  world_map_entity: '国家',
  world_map_entity_desc: '3位国家码',
  world_map_metric: '色彩度量项',
  world_map_metric_desc: '国家颜色表示的统计项',
  world_map_secondary_metric: '气泡大小',
  world_map_secondary_metric_desc: '气泡大小表示的度量项',
  filter_box_fieldSetRows: [
    ['date_filter'],
    ['groupby'],
    ['metric'],
  ],
  filter_box_groupby: '筛选条件',
  filter_box_groupby_desc: '筛选字段',
  para_viz: '平行坐标',
  para_viz_fieldSetRows: [
    ['series'],
    ['metrics'],
    ['secondary_metric'],
    ['limit'],
    ['show_datatable', 'include_series'],
  ],
  heatmap_viz: '热力图',
  heatmap_viz_label: '轴和度量',
  heatmap_viz_fieldSetRows1: [
    ['all_columns_x'],
    ['all_columns_y'],
    ['metric'],
  ],
  heatmap_viz2: '热力图选项',
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
  mapbox2: '点',
  mapbox_fieldSetRows2: [
    ['point_radius'],
    ['point_radius_unit'],
  ],
  mapbox3: '标记',
  mapbox_fieldSetRows3: [
    ['mapbox_label'],
    ['pandas_aggfunc'],
  ],
  mapbox4: '视觉调整',
  mapbox_fieldSetRows4: [
    ['mapbox_style'],
    ['global_opacity'],
    ['mapbox_color'],
  ],
  mapbox5: '视图(Viewport)',
  mapbox_fieldSetRows5: [
    ['viewport_longitude'],
    ['viewport_latitude'],
    ['viewport_zoom'],
  ],
  mapbox_all_columns_x: '经度',
  mapbox_all_columns_x_desc: '表示经度的列',
  mapbox_all_columns_y: '纬度',
  mapbox_all_columns_y_desc: '表示纬度的列',
  mapbox_pandas_aggfunc: '聚合标签',
  mapbox_pandas_aggfunc_desc: '聚合函数用于集群标签',
  mapbox_rich_tooltip: '提示',
  mapbox_rich_tooltip_desc: '鼠标放在集群上时显示的提示信息',
  mapbox_groupby_desc: '按照一个或多个字段分组。必须指定经度和纬度。',

  echart_bar: '[E]柱状图',
  metrics_and_dim: '指标和维度',
  metrics_and_dim_desc: '指标和维度',
  muti_y_axis: '多Y轴',
  muti_y_axis_desc: '多Y轴',
  muti_x_axis: '多X轴',
  muti_x_axis_desc: '多X轴',
  padding: '边距',
  padding_desc: '边距',
  other_option: '其他配置项',
  other_option_desc: '其他配置项',
  x_axis: 'X轴',
  y_axis: 'Y轴',

  echarts_bar_h: '[E]柱状图(横)',
  echarts_pie_m: '[E]饼图(指标比例)',
  echarts_pie_m_desc: '[E]饼图(指标比例)',
  label_position: '标签位置',
  label_position_desc: '标签位置',
  label_position_choices: [
      ['outside', '外部'],
      ['inside', '内部'],
      ['center', '中间'],
  ],
  label_format: '标签格式',
  label_format_desc: '例如: {b}  : {c} ({d}%)',
  circle_type: '环状类型',
  circle_type_desc: '环状类型',
  circle_type_choices: [
      ['none', '无'],
      ['big', '大'],
      ['medium', '中'],
      ['small', '小'],
  ],
  rose_type_choices: [
      ['none', '无'],
      ['radius', '面积比例'],
      ['area', '半径比例'],
  ],
  rose_type: '玫瑰类型',
  rose_type_desc: '玫瑰类型',
  inner_metrics: '内圈指标',
  inner_metrics_desc: '内圈指标',
  outer_metrics: '外圈指标',
  outer_metrics_desc: '外圈指标',
  echarts_pie_h: '[E]饼图(嵌套)',
  echarts_pie_h_desc: '[E]饼图(嵌套)',

  // explore
  export_to_json: '导出到.json格式',
  export_to_csv: '导出为.csv格式',
  no_result: '没有结果',
  viz_type_description: '要显示的可视化类型',
  table_language: {
    lengthMenu: "显示 _MENU_ 条",
    search: '查找',
    zeroRecords: '没有数据',
    paginate: {
      first: '第一页',
      last: '最后一页',
      next: '下一页',
      previous: '上一页',
    },
    info: '第 _PAGE_ 页 / 总 _PAGES_ 页, 共 _TOTAL_ 条数据',
    infoEmpty: '没有数据',
    infoFiltered: '(过滤总条数 _MAX_ 条)',
  },
  choose_nav_target: '请选择要导航的目标',
  page_size: '页大小',
  export_csv: '导出csv',
  export_excel: '导出excel',
  save_as: '另存为',
  save: '保存',
  query: '查询',
  force_refresh_dashboard: '强制刷新整个仪表板',
  edit_dashboard_property: '编辑此仪表板的属性',
  add_newSlice_to_dashboard: '向仪表板添加新的切片',
  unsave_change: '您有未保存的更改。',
  click: '点击',
  click_to_save: '右上角的按钮保存更改。',
  remove_slice: '移除报表',
  refresh_data: '刷新数据',
  edit_slice: '编辑报表',
  print_slice: '打印报表',
  move_slice: '移动报表',
  toogle_chart_desc: '是否显示图表描述',
  served_data: '数据缓存时间',
  click_to_refresh: '. 点击强制刷新',
  error: '错误',
  error_add_slice_dash: '很抱歉，切片添加至仪表盘时出错',
  name: '名称',
  modified: '修改时间',
  add_slices: '添加切片',
  refresh_interval: '刷新间隔',
  refresh_options: [
    [0, "不刷新"],
    [10, '10秒'],
    [30, '30秒'],
    [60, '1分钟'],
    [300, '5分钟'],
  ],
  choose_refresh_desc: '选择此仪表板的刷新频率',
  active_dashboard_filters: '仪表板过滤器',
  load_template: '加载模板',
  live_css_editor: '实时CSS编辑器',
  load_a_css_template: '加载CSS模板',
  save_dashboard: '保存仪表板',
  overwrite_dashboard: '覆盖仪表板',
  error_add_dashboard: '您必须为新仪表板选择一个名称',
  success: '成功',
  success_save_dashboard: '此仪表板已成功保存。',
  dashboard_name: '[仪表板名称]',
  y1_axis_format: 'Y1轴数值格式',
  y2_axis_format: 'Y2轴数值格式',
  no_access_datebase: '看起来你没有可访问的数据库',
  untitled_query: '无标题查询',
  search_user: '[用户]',
  search_results: '搜索结果',
  search_from: '[开始日期]-',
  search_to: '[截止日期]-',
  query_status: '[查询状态]',
  search: '搜索',
  TIME_OPTIONS: [
    ['now', '现在'],
    ['1 hour ago', '1小时前'],
    ['1 day ago', '1天前'],
    ['7 days ago', '7天前'],
    ['28 days ago', '28天前'],
    ['90 days ago', '90天前'],
    ['1 year ago', '1年以前'],
  ],
  STATUS_OPTIONS: [
    ['success', '成功'],
    ['failed', '失败'],
    ['running', '运行中'],
  ],
  select_database: '选择一个数据库',
  close_tab: '关闭标签',
  rename_tab: '重命名标签',
  expand_tool_bar: '展开工具栏',
  hide_tool_bar: '隐藏工具栏',
  share_query: '共享查询',
  select_schema: '选择一个 Schema',
  add_table: '添加表',
  open_in_sql_editor: '在SQL编辑器中打开',

  // querytable  column and field
  query_table_columns: [
    '状况', '数据库', '用户', '日期',
    '进度', '结果数', 'sql', '查询链接',
  ],
  state: '状况',
  db: '数据库',
  user: '用户',
  date: '日期',
  progress: '进度',
  rows: '结果数',
  sql: 'sql',
  querylink: '查询链接',
  query_history_columns: [
    '状况', '开始于', '持续时间', '进度',
    '结果数', 'sql', '数据库', '操作',
  ],
  started: '开始于',
  duration: '持续时间',
  output: '数据库',
  actions: '操作',
  failed: '失败',

  data_preview: '数据预览',
  run_query: '运行查询',
  run_selection: '运行选择',
  running: '运行中',
  offline: '离线',
  database: '数据库',
  reset_state: '复位状态',
  visualize_query_data: '可视化此查询中的数据',
  overwrite_query_text: '使用此表上的查询覆盖编辑器中的文本',
  run_query_new_tab: '在新标签中运行查询',
  remove_query_from_log: '从日志中删除查询',
  query_csv: '.CSV',
  query_visualize: '可视化选项',
  query_result: '查询结果',
  query_history: '查询历史记录',
  preview_for: '预览',
  pk: '主键',
  fk: '外键',
  index: 'Index',
  no_query_history: '没有查询记录...',
  fetch_data_preview: '获取数据预览',
  query_asyc: '此查询异步运行',
  fetch_result: '获取结果',
  query_no_data: '该查询没有返回任何数据',
  run_query_asyc: '异步运行查询',
  create_table_as_result: '使用查询结果创建表',
  new_table_name: '新表名',
  query_in_new_tab: '在新标签页中进行查询',
  view_results: '查看结果',
  pick_chart_type: '请选择一个图表类型!',
  need_data_column: '要使用此图表类型，您至少需要一个标记为日期的列',
  no_result_avaliable: '此查询没有可用的结果',
  chart_type: '[图表类型]',
  datasource_name: '数据源名称',
  visualize: '可视化',
  vis_chart_type: '图表类型',
  vis_datasource_name: '数据源名称',

  //  visualizemodal column and field
  vis_columns: ['列', '是否维度', '是否日期', '聚合函数',],
  vis_column: '列',
  vis_is_dimension: '是否维度',
  vis_is_date: '是否日期',
  vis_agg_func: '聚合函数',

  agg_func_options: [
    { value: 'sum', label: '求和(x)' },
    { value: 'min', label: '最小值(x)' },
    { value: 'max', label: '最大值(x)' },
    { value: 'avg', label: '平均值(x)' },
    { value: 'count_distinct', label: '计数' },
  ],
  run_query_display_results: '运行查询以在此显示结果',
  stop: '停止',
  limit_tooltip1: '显示的查询结果中的行数在服务器端限制为',
  limit_tooltip2: '行',
  run_async: '异步运行',
  enter_new_title_tab: '输入标签的新标题',
  copy_url_clipboard: '将URL复制到剪贴板',
  view_keys: '查看键和索引',
  sort_columns_alphabetically: '按字母顺序排列列',
  original_table_column_order: '原始表列顺序',
  remove_table_preview: '删除表预览',
  copy_partition_query_to_clipboard: '将分区查询复制到剪贴板',
  copy_select_statement_to_clipboard: '将查询语句复制到剪贴板',
  raw_sql: '原始SQL',
  source_sql: '源SQL',
  none: '无',
  picture_upload_error: '请选择jpg, png, jpeg图片格式上传',
  menu_name: '菜单名',
  parent_menu: '父菜单',
  dash_source: '仪表盘资源',
  set_index: '设为首页',
  add: '添加',
  modify: '修改',
  delete: '删除',
  portal_preview: '门户预览',
  upload_logo: '上传logo',
  schedule_settings: '调度设置',
  select_scheduling: '选择调度方式',
  schedule_expression: '调度表达式',
  schedule_tooltip: '注: 时间用 `YYYY-MM-DD hh:mm:ss` 或者 `YYYY-MM-DD` 字符串表示, 多个条件用&&连接',
  cron_help_href: 'cron表达式详情链接',
  condition_setting: '条件设置',
  monitor_dashboard: '监测仪表盘',
  choose_dash: '选择仪表盘',
  monitor_slice: '监测切片',
  choose_monitor_slice: '选择监测切片',
  monitor_metric: '监测指标',
  specifies_expression: '指定表达式',
  mail_send_slice: '邮件发送切片',
  choose_send_slice: '选择发送切片',
  receiver_address: '收件人地址',
  done_success: '操作成功',
  done_fail: '操作失败',
  unknown_error: '未知错误',
  yes: '是',
  closed: '已关闭',
  activation: '激活',
  start_up: '启动',
  add_schedule: '添加调度',
  serial_number: '序号',
  scheduling_method: '调度方式',
  start_time: '开始时间',
  end_time: '结束时间',
  is_active: '是否激活',
  status: '状态',
  mailbox_settings: '邮箱设置',
  smtp_server: 'SMTP服务器',
  port: '端口',
  sender_name: '发件人名称',
  sender_address: '发件人地址',
  user_name: '用户名',
  password: '口令',
  test_conn: '测试连接',
  modify_success: '修改成功',
  modify_failed: '修改失败',
  return: '返回',
  connect_success: '连接成功',
  connect_failed: '连接失败',
  operate_failed: '操作失败',
  operate_success: '操作成功',
  interval: '间隔',
  cron: 'cron表达式',
  save_failed:'保存失败',
  save_success:'保存成功',
  upload_failed:'上传失败',
  favorites: '收藏',
  created_content:'创建内容',
  recent_activity:'近期活动',
  security_access:'安全与访问',
  no_fav_slice:'没有收藏的切片，去点击星星收藏！',
  no_fav_dash: '没有收藏的仪表板，去点击星星收藏！',
  creator: '创建人',
  slice: '切片',
  favorited: '收藏',
  slc_fav_column: ['切片', '创建人', '收藏'],
  dashboard: '仪表板',
  dash_fav_column: ['仪表板', '创建人', '收藏'],
  no_slices: "没有切片",
  no_dashboards: "没有仪表板",
  slc_create_column: ['切片', '收藏'],
  dash_create_column: ['仪表板', '收藏'],
  action : '操作',
  item: '项目',
  time: '时间',
  recent_action_column: ['操作', '项目', '时间'],
  roles:'角色',
  databases: '数据库',
  datasources: '数据源',
};

export default zh_CN;
