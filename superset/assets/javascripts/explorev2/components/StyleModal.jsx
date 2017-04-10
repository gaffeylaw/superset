import $ from 'jquery';
import React from 'react';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Style from './Style';
import BaseStyle from './BaseStyle';
import Compare from './Compare';
import Navigate from './Navigate';
import HeaderSetting from './HeaderSetting';
import PivotSetting from './PivotSetting';
import { render } from 'react-dom';
import zh_CN from '../stores/zh_CN';
import en_US from '../stores/en_US';
import intl from 'intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { injectIntl, intlShape, defineMessages, IntlProvider,
  FormattedMessage, addLocaleData } from 'react-intl';
import { chooseMessage, chooseLocale} from '../stores/language';
addLocaleData([...en, ...zh]);

const propTypes = {
  onHide: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired,
  form_data: React.PropTypes.object.isRequired,
  styles: React.PropTypes.array.isRequired,
  baseStyle: React.PropTypes.object.isRequired,
  colStyles: React.PropTypes.array.isRequired,
  compares: React.PropTypes.array.isRequired,
  navigates: React.PropTypes.array.isRequired,
  headerSettings: React.PropTypes.array.isRequired,
  slices: React.PropTypes.array.isRequired,
  dashboards: React.PropTypes.array.isRequired,
};

const defaultProps = {
  styles: [],
  baseStyle: null,
  colStyles: [],
  compares: [],
  navigates: [],
  headerSettings: [],
};

const Locale = chooseMessage();

class StyleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      theme: [
        { key: 'fresh', value: 'fresh' },
        { key: 'blue', value: 'blue' },
        { key: 'bootstrap', value: 'bootstrap' },
        { key: 'dark', value: 'dark' },
      ],
      pageSize: [
        { key: '15', value: '15' },
        { key: '30', value: '30' },
        { key: '50', value: '50' },
        { key: '100', value: '100' },
        { key: 'all', value: '100000000' },
      ],
      isPivot: [
        { key: 'true', value: 'true' },
        { key: 'false', value: 'false' },
      ],
      count: 0,
    };
  }
  addStyle() {
    this.props.actions.addStyle({
      id: shortid.generate(),
      metric: null,
      expr: null,
      value: null,
      icon: null,
    });
  }
  addCompare() {
    this.props.actions.addCompare({
      id: shortid.generate(),
      metricLeft: null,
      metricRight: null,
      expr: null,
      value: null,
    });
  }
  addNavigate() {
    this.props.actions.addNavigate({
      id: shortid.generate(),
      metric: null,
      expr: null,
      width: 300,
      height: 300,
      slice: null,
      open: 'modal',
    });
  }
  addHeaderSetting() {
    this.props.actions.addHeaderSetting({
      id: shortid.generate(),
      parentName: null,
      children: null,
    });
  }
  changeModal(type) {
    if (type === 1) {
      this.setState({ flag: true, flag2: false, flag3: false, flag4: false, flag5: false });
      $('ul li').attr('style', '');
      $('#li').attr('style', 'background: #ccc');
    } else if (type === 2) {
      this.setState({ flag: false, flag2: true, flag3: false, flag4: false, flag5: false });
      $('ul li').attr('style', '');
      $('#li2').attr('style', 'background: #ccc');
    } else if (type === 3) {
      this.setState({ flag: false, flag2: false, flag3: true, flag4: false, flag5: false });
      $('ul li').attr('style', '');
      $('#li3').attr('style', 'background: #ccc');
    } else if (type === 4) {
      this.setState({ flag: false, flag2: false, flag3: false, flag4: true, flag5: false });
      $('ul li').attr('style', '');
      $('#li4').attr('style', 'background: #ccc');
    } else {
      this.setState({ flag: false, flag2: false, flag3: false, flag4: false, flag5: true });
      $('ul li').attr('style', '');
      $('#li5').attr('style', 'background: #ccc');
    }
  }
  changeTheme(col) {
    const val = (col) ? col.value : null;
    this.props.actions.changeTheme(val);
    this.setState({ count: this.state.count + 1 });
  }
  changePageSize(col) {
    const val = (col) ? col.value : null;
    this.props.actions.changePageSize(val);
    this.setState({ count: this.state.count + 1 });
  }
  changePinnedLeft(val) {
    this.props.actions.changePinned('left', val);
    this.setState({ count: this.state.count + 1 });
  }
  changePinnedRight(val) {
    this.props.actions.changePinned('right', val);
    this.setState({ count: this.state.count + 1 });
  }
  changePivot(col) {
    const val = (col) ? col.value : null;
    this.props.actions.changePivot(val);
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    const stylesDiv = [];
    const compareDiv = [];
    const navigatesDiv = [];
    const headerSettingDiv = [];

    let i = 0;
    this.props.styles.forEach((style) => {
      i++;
      stylesDiv.push(
        <Style
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          style={style}
        />
      );
    });
    this.props.compares.forEach((compare) => {
      i++;
      compareDiv.push(
        <Compare
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          compare={compare}
        />
      );
    });
    this.props.navigates.forEach((navigate) => {
      i++;
      navigatesDiv.push(
        <Navigate
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          navigate={navigate}
          slices={this.props.slices}
          dashboards={this.props.dashboards}
        />
      );
    });
    this.props.headerSettings.forEach((headerSetting) => {
      i++;
      headerSettingDiv.push(
        <HeaderSetting
          key={i}
          actions={this.props.actions}
          form_data={this.props.form_data}
          headerSetting={headerSetting}
        />
      );
    });

    if (this.state.count >= 0) {
      // console.log('refresh the render')
    }

    return (
      <IntlProvider 
        locale={ chooseLocale() } 
        messages={ chooseMessage() }
       >
        <Modal
          show
          onHide={this.props.onHide}
          bsStyle="large"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div>
                <ul className="nav navbar-nav" style={{ fontSize: '14px' }}>
                  <li id="li" className="active" style={{ backgroundColor: '#ccc' }}>
                    <a onClick={this.changeModal.bind(this, 1)}>
                      <FormattedMessage 
                        id = 'base_style'
                      >
                      </FormattedMessage>
                    </a>
                  </li>
                  <li id="li2"><a onClick={this.changeModal.bind(this, 2)}>
                      <FormattedMessage id = 'condition_style' />
                  </a></li>
                  <li id="li3"><a onClick={this.changeModal.bind(this, 3)}>
                      <FormattedMessage id = 'compare_style' />
                  </a></li>
                  <li id="li4"><a onClick={this.changeModal.bind(this, 4)}>
                      {Locale.slice_navigator}
                  </a></li>
                  {this.props.form_data.viz_type === 'ag_grid' &&
                    <li id="li5"><a onClick={this.changeModal.bind(this, 5)}>
                      <FormattedMessage id = 'ag_setting' />
                    </a></li>
                  }
                </ul>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ minHeight: '300px' }}>
          {this.state.flag &&
            <div>
              <BaseStyle
                key={i}
                actions={this.props.actions}
                form_data={this.props.form_data}
                baseStyle={this.props.baseStyle}
                colStyles={this.props.colStyles}
              />
            </div>
          }
          {this.state.flag2 &&
            <div>
              <div>
                {stylesDiv}
              </div>
              <div className="row space-2">
                <div className="col-lg-2">
                  <Button
                    id="add-button"
                    bsSize="sm"
                    onClick={this.addStyle.bind(this)}
                  >
                    <i className="fa fa-plus" >
                      <FormattedMessage id = 'add_base_style'/>
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          }
          {this.state.flag3 &&
            <div>
              <div>
                {compareDiv}
              </div>
              <div className="row space-2">
                <div className="col-lg-2">
                  <Button
                    id="add-button"
                    bsSize="sm"
                    onClick={this.addCompare.bind(this)}
                  >
                    <i className="fa fa-plus" >
                      <FormattedMessage id = 'add_condition_style' />
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          }
          {this.state.flag4 &&
            <div>
              <div>
                {navigatesDiv}
              </div>
              <div className="row space-2">
                <div className="col-lg-2">
                  <Button
                    id="add-button"
                    bsSize="sm"
                    onClick={this.addNavigate.bind(this)}
                  >
                    <i className="fa fa-plus" >
                      <FormattedMessage id = 'add_slice_navigator' />
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          }
          {this.state.flag5 &&
            <div>
              <div className="col-lg-12">
                <div className="col-lg-2">
                  <span> <FormattedMessage id = 'grid_theme'/></span>
                </div>
                <div className="col-lg-4">
                  <FormattedMessage id = 'theme'>
                    {(message) =>
                      <Select
                        multi={false}
                        name="select-column"
                        placeholder={message}
                        options={this.state.theme.map((o) => ({ label: o.key, value: o.value }))}
                        value={this.props.form_data.theme}
                        autosize={false}
                        onChange={this.changeTheme.bind(this)}
                      />  
                    }
                  </FormattedMessage>
                </div>
                <div className="col-lg-2">
                  <span>{Locale.page_count}</span>
                </div>
                <div className="col-lg-4">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder={Locale.count}
                    options={this.state.pageSize.map((o) => ({ label: o.key, value: o.value }))}
                    value={this.props.form_data.pageSize}
                    autosize={false}
                    onChange={this.changePageSize.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-2" style={{ marginTop: '15px' }}>
                  <span>{Locale.frozen_left}</span>
                </div>
                <div className="col-lg-4">
                  <Select
                    style={{ marginTop: '10px' }}
                    multi
                    simpleValue
                    placeholder={Locale.frozen_col}
                    options={this.props.form_data.groupby.concat(this.props.form_data.metrics)
                                  .map((o) => ({ value: o, label: o }))}
                    value={this.props.form_data.pinned.left}
                    autosize={false}
                    onChange={this.changePinnedLeft.bind(this)}
                  />
                </div>
                <div className="col-lg-2" style={{ marginTop: '15px' }}>
                  <span>{Locale.frozen_right}</span>
                </div>
                <div className="col-lg-4">
                  <Select
                    style={{ marginTop: '10px' }}
                    multi
                    simpleValue
                    placeholder={Locale.frozen_col}
                    options={this.props.form_data.groupby.concat(this.props.form_data.metrics)
                                  .map((o) => ({ value: o, label: o }))}
                    value={this.props.form_data.pinned.right}
                    autosize={false}
                    onChange={this.changePinnedRight.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12" style={{ marginTop: '10px' }}>
                <div className="col-lg-4">
                  <span>{Locale.enable_piovttable}</span>
                </div>
                <div className="col-lg-8">
                  <Select
                    options={this.state.isPivot.map((o) => ({ label: o.key, value: o.value }))}
                    value={this.props.form_data.isPivot}
                    autosize={false}
                    onChange={this.changePivot.bind(this)}
                  />
                </div>
              </div>
              {this.props.form_data.isPivot === 'false' &&
                <div className="col-lg-12" style={{ marginTop: '10px' }}>
                  <hr style={{ height: '1px', border: 'none', borderTop: '1px solid #555555' }} />
                  {headerSettingDiv}
                  <div className="row space-2">
                    <div className="col-lg-2">
                      <Button
                        id="add-button"
                        bsSize="sm"
                        onClick={this.addHeaderSetting.bind(this)}
                      >
                        <i className="fa fa-plus" /> {Locale.add_table_header_setting}
                      </Button>
                    </div>
                  </div>
                </div>
              }
              {this.props.form_data.isPivot === 'true' &&
                <div className="col-lg-12" style={{ marginTop: '10px' }}>
                  <hr style={{ height: '1px', border: 'none', borderTop: '1px solid #555555' }} />
                  <PivotSetting
                    actions={this.props.actions}
                    form_data={this.props.form_data}
                  />
                </div>
              }
            </div>
          }
          </Modal.Body>

          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </IntlProvider>
    );
  }
}

StyleModal.propTypes = propTypes;
StyleModal.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    styles: state.viz.form_data.styles,
    baseStyle: state.viz.form_data.baseStyle,
    navigates: state.viz.form_data.navigates,
  };
}

export { StyleModal };
export default connect(mapStateToProps, () => ({}))(StyleModal);
