import React, { PropTypes } from 'react';
import ControlLabelWithTooltip from './ControlLabelWithTooltip';
import { slugify } from '../../modules/utils';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';
import { chooseMessage } from '../stores/language';
import { zh_CN } from '../stores/zh_CN';
import { en_US } from '../stores/en_US';

require('./Components.css');

const localMessage = chooseMessage();

const propTypes = {
  name: PropTypes.string.isRequired,
  choices: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  label: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
  freeForm: PropTypes.bool,
};

const defaultProps = {
  multi: false,
  freeForm: false,
  value: '',
  label: null,
  description: null,
  onChange: () => {},
};

const vizType = localMessage.menu_viztype;

const selectedMenu = {
  chart: '',
  icon: '',
  name: '',
};



export default class MenuField extends React.Component {
  constructor(props) {
    super(props);
    selectedMenu.chart = this.props.value;
    for (const viz in vizType) {
      if (vizType[viz].chart === this.props.value) {
        selectedMenu.chart = vizType[viz].chart;
        selectedMenu.icon = vizType[viz].icon;
        selectedMenu.name = vizType[viz].name;
        break;
      }
    }
  }
  onChange(info) {
    const optionValue = info ? info.key : null;
    for (const viz in vizType) {
      if (vizType[viz].chart === optionValue) {
        selectedMenu.chart = vizType[viz].chart;
        selectedMenu.icon = vizType[viz].icon;
        selectedMenu.name = vizType[viz].name;
        this.props.onChange(this.props.name, optionValue);
        break;
      }
    }
  }
  render() {
    const menuProps = {
      mode: 'horizontal',
      openAnimation: 'zoom',
      onClick: this.onChange.bind(this),
    };
    const menuTitle = (
      <span>
        <i className="fa fa-bar-chart icon-span"></i>
        <font size="2">{localMessage.choose_chart}</font>
        <i className="fa fa-caret-down pull-right"></i>
      </span>
    );
    const baseTitle = (
      <span>
        <i className="fa fa-bar-chart icon-span"></i>
        <font size="2">{localMessage.base_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const barTitle = (
      <span>
        <i className="fa fa-bar-chart icon-span"></i>
        <font size="2">{localMessage.bar_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const lineTitle = (
      <span>
        <i className="fa fa-line-chart icon-span"></i>
        <font size="2">{localMessage.line_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const areaTitle = (
      <span>
        <i className="fa fa-area-chart icon-span"></i>
        <font size="2">{localMessage.area}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const advancedTitle = (
      <span>
        <i className="fa fa-external-link-square icon-span"></i>
        <font size="2">{localMessage.advanced_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const meterTitle = (
      <span>
        <i className="fa fa-tachometer icon-span"></i>
        <font size="2">{localMessage.measurement_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const hTitle = (
      <span>
        <i className="fa fa-header icon-span"></i>
        <font size="2">{localMessage.big_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const mapTitle = (
      <span>
        <i className="fa fa-map-marker icon-span"></i>
        <font size="2">{localMessage.map_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const otherTitle = (
      <span>
        <i className="fa fa-ellipsis-h icon-span"></i>
        <font size="2">{localMessage.other_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    const echartTitle = (
      <span>
        <i className="fa fa-ellipsis-h icon-span"></i>
        <font size="2">{localMessage.echart_chart}</font>
        <i className="fa fa-caret-right pull-right"></i>
      </span>
    );
    //  Tab, comma or Enter will trigger a new option created for FreeFormSelect
    const MenuWrap = (
      <Menu {...menuProps}>
        <SubMenu title={menuTitle}>
          <MenuItem key="filter_box">
            <span>
              <i className="fa fa-check-square icon-span"></i>
              <font size="2">{localMessage.filter_box}</font>
            </span>
          </MenuItem>
          <Divider />
          <SubMenu title={echartTitle} key="E01">
            <MenuItem key="echarts_bar">
              <span>
                <i className="fa fa-bar-chart icon-span"></i>
                <font size="2">{localMessage.echarts_bar}</font>
              </span>
            </MenuItem>
            <MenuItem key="echarts_bar_h">
              <span>
                <i className="fa fa-bar-chart icon-span"></i>
                <font size="2">{localMessage.echarts_bar_h}</font>
              </span>
            </MenuItem>
            <MenuItem key="echarts_line">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.echarts_line}</font>
              </span>
            </MenuItem>
            <MenuItem key="echarts_line_bar">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.echarts_line_bar}</font>
              </span>
            </MenuItem>
          </SubMenu>
          <Divider />
          <MenuItem key="table">
            <span>
              <i className="fa fa-table icon-span"></i>
              <font size="2">{localMessage.table}</font>
            </span>
          </MenuItem>
          <MenuItem key="ag_grid">
            <span>
              <i className="fa fa-table icon-span"></i>
              <font size="2">ag_grid</font>
            </span>
          </MenuItem>
          
          <MenuItem key="pivot_table">
            <span>
              <i className="fa fa-table icon-span"></i>
              <font size="2">{localMessage.pivot_table}</font>
            </span>
          </MenuItem>
          <SubMenu title={baseTitle} key="4">
            <SubMenu title={barTitle} key="4-1">
              <MenuItem key="dist_bar">
                <span>
                  <i className="fa fa-bar-chart icon-span"></i>
                  <font size="2">{localMessage.dist_bar}</font>
                </span>
              </MenuItem>
              <MenuItem key="bar">
                <span>
                  <i className="fa fa-bar-chart icon-span"></i>
                  <font size="2">{localMessage.bar2}</font>
                </span>
              </MenuItem>
            </SubMenu>
            <SubMenu title={lineTitle} key="4-2">
              <MenuItem key="multi">
                <span>
                  <i className="fa fa-line-chart icon-span"></i>
                  <font size="2">{localMessage.multi}</font>
                </span>
              </MenuItem>
              <MenuItem key="line">
                <span>
                  <i className="fa fa-line-chart icon-span"></i>
                  <font size="2">{localMessage.line2}</font>
                </span>
              </MenuItem>
              <MenuItem key="linePlusBar">
                <span>
                  <i className="fa fa-line-chart icon-span"></i>
                  <font size="2">{localMessage.linePlusBar}</font>
                </span>
              </MenuItem>
              <MenuItem key="compare">
                <span>
                  <i className="fa fa-line-chart icon-span"></i>
                  <font size="2">{localMessage.compare}</font>
                </span>
              </MenuItem>
            </SubMenu>
            <MenuItem key="linePlusBar">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.linePlusBar1}</font>
              </span>
            </MenuItem>
            <SubMenu title={areaTitle} key="4-4">
              <MenuItem key="area">
                <span>
                  <i className="fa fa-area-chart icon-span"></i>
                  <font size="2">{localMessage.area2}</font>
                </span>
              </MenuItem>
              <MenuItem key="area1">
                <span>
                  <i className="fa fa-area-chart icon-span"></i>
                  <font size="2">{localMessage.area1}</font>
                </span>
              </MenuItem>
            </SubMenu>
            <MenuItem key="pie">
              <span>
                <i className="fa fa-pie-chart icon-span"></i>
                <font size="2">{localMessage.pie}</font>
              </span>
            </MenuItem>
          </SubMenu>
          <SubMenu title={advancedTitle} key="5">
            <MenuItem key="bubble">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.bubble}</font>
              </span>
            </MenuItem>
            <MenuItem key="5-2" disable="true">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.radar}</font>
              </span>
            </MenuItem>
            <MenuItem key="5-3" disable="true">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.scatter_chart}</font>
              </span>
            </MenuItem>
            <MenuItem key="sankey">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.sankey}</font>
              </span>
            </MenuItem>
            <MenuItem key="directed_force">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.directed_force}</font>
              </span>
            </MenuItem>
            <MenuItem key="horizon">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.horizon}</font>
              </span>
            </MenuItem>
            <MenuItem key="mapbox">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.mapbox}</font>
              </span>
            </MenuItem>
            <MenuItem key="treemap">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.treemap}</font>
              </span>
            </MenuItem>
            <MenuItem key="box_plot">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.box_plot}</font>
              </span>
            </MenuItem>
            <MenuItem key="para">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.para}</font>
              </span>
            </MenuItem>
            <MenuItem key="cal_heatmap">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.cal_heatmap}</font>
              </span>
            </MenuItem>
            <MenuItem key="sunburst">
              <span>
                <i className="fa fa-line-chart icon-span"></i>
                <font size="2">{localMessage.sunburst}</font>
              </span>
            </MenuItem>
          </SubMenu>
          <SubMenu title={meterTitle} key="6">
            <SubMenu title={hTitle} key="6-1">
              <MenuItem key="big_number">
                <span>
                  <i className="fa fa-header icon-span"></i>
                  <font size="2">{localMessage.big_number}</font>
                </span>
              </MenuItem>
              <MenuItem key="big_number_total">
                <span>
                  <i className="fa fa-header icon-span"></i>
                  <font size="2">{localMessage.big_number_total}</font>
                </span>
              </MenuItem>
            </SubMenu>
            <MenuItem key="bullet">
              <span>
                <i className="fa fa-space-shuttle icon-span"></i>
                <font size="2">{localMessage.bullet}</font>
              </span>
            </MenuItem>
            <MenuItem key="6-3" disable="true">
              <span>
                <i className="fa fa-tachometer icon-span"></i>
                <font size="2">{localMessage.dash}</font>
              </span>
            </MenuItem>
            <MenuItem key="word_cloud" disable="true">
              <span>
                <i className="fa fa-file-word-o icon-span"></i>
                <font size="2">{localMessage.world_cloud}</font>
              </span>
            </MenuItem>
          </SubMenu>
          <SubMenu title={mapTitle} key="7">
            <MenuItem key="world_map">
              <span>
                <i className="fa fa-map-marker icon-span"></i>
                <font size="2">{localMessage.world_map}</font>
              </span>
            </MenuItem>
            <MenuItem key="world_map1">
              <span>
                <i className="fa fa-map-marker icon-span"></i>
                <font size="2">{localMessage.world_map1}</font>
              </span>
            </MenuItem>
          </SubMenu>
          <SubMenu title={otherTitle} key="8">
            <MenuItem key="markup1">
              <span>
                <i className="fa fa-file-code-o icon-span"></i>
                <font size="2">{localMessage.markup1}</font>
              </span>
            </MenuItem>
            <MenuItem key="markup">
              <span>
                <i className="fa fa-bar-chart icon-span"></i>
                <font size="2">{localMessage.markup}</font>
              </span>
            </MenuItem>
            <MenuItem key="iframe">
              <span>
                <i className="fa fa-columns icon-span"></i>
                <font size="2">{localMessage.iframe}</font>
              </span>
            </MenuItem>
            <MenuItem key="separator">
              <span>
                <i className="fa fa-minus icon-span"></i>
                <font size="2">{localMessage.separator}</font>
              </span>
            </MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
    return (
      <div id={`formControlsSelect-${slugify(this.props.label)}`}>
        <div>
          <ControlLabelWithTooltip
            label={this.props.label}
            description={this.props.description}
          />
        </div>
        <div>
          <span style={{ float: 'left' }}>{MenuWrap}</span>
          <span style={{ paddingLeft: '5px' }}>
            <font size="2">{localMessage.current_chart}</font>
            <i className={`${selectedMenu.icon} icon-current-span`}></i>
            <font size="2">{selectedMenu.name}</font>
          </span>
        </div>
      </div>
    );
  }
}

MenuField.propTypes = propTypes;
MenuField.defaultProps = defaultProps;
