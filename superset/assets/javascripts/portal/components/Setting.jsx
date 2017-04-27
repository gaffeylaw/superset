const $ = window.$ = require('jquery');
import * as Actions from '../actions';
import React from 'react';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { chooseMessage } from '../../explorev2/stores/language';
import zh_CN from '../../explorev2/stores/zh_CN';
import en_US from '../../explorev2/stores/en_US';

const localMessage = chooseMessage(); 

const propTypes = {
  form_data: React.PropTypes.array.isRequired,
};

class Setting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: this.getHeight(),
      parentMenu: null,
      dashboard: null,
      newMenu: {
        id: null,
        name: null,
        parent_id: null,
        dashboard_href: null,
        is_index: null,
        icon: null,
      },
      icon: null,
      iconChoices: [{ key: localMessage.none, value: '' },
                    { key: 'home', value: 'fa fa-home' },
                    { key: 'university', value: 'fa fa-university' },
                    { key: 'chart', value: 'fa fa-line-chart' },
                    { key: 'database', value: 'fa fa-database' },
                    { key: 'cube', value: 'fa fa-cube' },
                    { key: 'industry', value: 'fa fa-industry' },
                    { key: 'cog', value: 'fa fa-cog' },
                    { key: 'globe', value: 'fa fa-globe' }],
    };
  }

  getHeight() {
    const navHeight = 90;
    const headerHeight = $('.nav-tabs').outerHeight() ?
      $('.nav-tabs').outerHeight() : $('#search-header').outerHeight();
    const warningHeight = $('#navbar-warning').outerHeight();
    const alertHeight = $('#sqllab-alerts').outerHeight();
    return `${window.innerHeight - navHeight - headerHeight - warningHeight - alertHeight}px`;
  }

  getLeftMenu(id, menus) {
    if (id !== 0) {
      const children = [];
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu[2] === id) {
          const node = {
            id: menu[0],
            name: menu[1],
            parent_id: menu[2],
            dashboard_href: menu[3],
            open_way: menu[4],
            is_index: menu[5],
            icon: menu[6],
          };
          node.children = this.getLeftMenu(menu[0], menus);
          children.push(node);
        }
      }
      return children;
    }
    // id != 0
    const nodes = [];
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu[2] === 0) {
        const node = {
          id: menu[0],
          name: menu[1],
          parent_id: menu[2],
          dashboard_href: menu[3],
          open_way: menu[4],
          is_index: menu[5],
          icon: menu[6],
        };
        node.children = this.getLeftMenu(menu[0], menus);
        nodes.push(node);
      }
    }
    return nodes;
  }


  // get leftMenuDiv
  getMenuDiv(menuObj) {
    const vdom = [];
    if (menuObj instanceof Array) {
      let list = [];
      for (const item of menuObj) {
        list.push(this.getMenuDiv(item));
      }
      vdom.push(
        <ul key="single" style={{ listStyleType: 'none' }}>
          {list}
        </ul>
      );
    } else {
      // set parent icon
      if (menuObj.children.length !== 0) {
        vdom.push(
          <li key={menuObj.id} style={{ listStyleType: 'none' }}>
            <h1
              id={'li' + menuObj.id}
              className="menu"
              style={{ fontSize: '14px', cursor: 'pointer', color: '#333' }}
            >
              <i
                id={'icon' + menuObj.id}
                className="fa fa-caret-down"
                aria-hidden="true"
                style={{ width: '20px' }}
                onClick={this.toggleMenu.bind(this, menuObj)}
              />
              <span onClick={this.dealMenu.bind(this, menuObj)}>{menuObj.name}</span>
            </h1>
            {this.getMenuDiv(menuObj.children)}
          </li>
        );
      } else {
        // set home icon
        if (menuObj.is_index === 'true') {
          vdom.push(
            <li
              key={menuObj.id}
              style={{ listStyleType: 'none' }}
            >
              <h1
                id={'li' + menuObj.id}
                className="menu"
                style={{ fontSize: '12px', cursor: 'pointer', color: '#666' }}
              >
                <span onClick={this.dealMenu.bind(this, menuObj)}>{menuObj.name}</span>
                <i
                  id={'index' + menuObj.id}
                  className="fa fa-home"
                  aria-hidden="true"
                  style={{ marginLeft: '20px' }}
                />
              </h1>
              {this.getMenuDiv(menuObj.children)}
            </li>
          );
        } else {
          vdom.push(
            <li
              key={menuObj.id}
              style={{ listStyleType: 'none' }}
            >
              <h1
                id={'li' + menuObj.id}
                className="menu"
                style={{ fontSize: '12px', cursor: 'pointer', color: '#666' }}
              >
                <span onClick={this.dealMenu.bind(this, menuObj)}>{menuObj.name}</span>
              </h1>
              {this.getMenuDiv(menuObj.children)}
            </li>
          );
        }
      }
    }
    return vdom;
  }

  toggleMenu(menu) {
    if ($('#icon' + menu.id).attr('class') === 'fa fa-caret-down') {
      $('#icon' + menu.id).attr('class', 'fa fa-caret-right');
    } else {
      $('#icon' + menu.id).attr('class', 'fa fa-caret-down');
    }
    $('#li' + menu.id).next().toggle();
  }

  dealMenu(menu, event) {
    event.stopPropagation();
    // console.log(menu);
    // clear parentMenu and dashboard_href and is_index
    this.setState({
      parentMenu: {
        value: 0,
        label: localMessage.none,
      },
    });

    this.setState({
      dashboard: {
        value: '',
        label: localMessage.none,
      },
    });

    this.setState({
      icon: {
        value: '',
        label: localMessage.none,
      },
    });

    this.state.is_index = null;

    // set name
    $('#menuName').val(menu.name);

    // set newMenu
    this.setState({
      newMenu: {
        id: menu.id,
        name: menu.name,
        parent_id: menu.parent_id,
        dashboard_href: menu.dashboard_href,
        is_index: menu.is_index,
        icon: menu.icon,
      },
    });

    // set parentMenu
    this.props.form_data.menus.map((m) => {
      if (m[0] === menu.parent_id) {
        this.setState({
          parentMenu: {
            value: m[0],
            label: m[1],
          },
        });
        return false;
      }
    });

    // set dashboard_href
    this.props.form_data.dashboards.map((d) => {
      if (d[0] == menu.dashboard_href) {
        this.setState({
          dashboard: {
            value: d[0],
            label: d[1],
          },
        });
        return false;
      }
    });

    // set is_index
    if (menu.is_index === 'true') {
      $('#isIndex').prop('checked', true);
    } else {
      $('#isIndex').prop('checked', false);
    }

    // set icon
    this.state.iconChoices.map((i) => {
      if (i.value === menu.icon) {
        this.setState({
          icon: {
            value: i.value,
            label: i.key,
          },
        });
        return false;
      }
    });

    // set font color style
    $('.menu').css('color', 'rgb(105, 103, 103)');
    $('#li' + menu.id).css('color', '#00A699');
  }

  changeParentMenu(event) {
    // console.log(event);
    this.setState({
      parentMenu: {
        value: event.value,
        label: event.label,
      },
    });
    this.state.newMenu.parent_id = event.value;
  }

  changeDashboard(event) {
    // console.log(event);
    this.setState({
      dashboard: {
        value: event.value,
        label: event.label,
      },
    });
    this.state.newMenu.dashboard_href = event.value;
  }

  changeIsIndex() {
    if ($('#isIndex').get(0).checked) {
      this.state.newMenu.is_index = 'true';
    } else {
      this.state.newMenu.is_index = null;
    }
  }

  changeIcon(event) {
    // console.log(event);
    this.setState({
      icon: {
        value: event.value,
        label: event.label,
      },
    });
    this.state.newMenu.icon = event.value;
  }

  operateMenu(operate) {
    this.state.newMenu.name = $('#menuName').val();
    // console.log(this.state.newMenu);
    const portalId = this.props.form_data.portal[0];
    $.ajax({
      type: 'POST',
      url: '/superset/menu/' + operate,
      data: {
        menu: this.state.newMenu,
        portal_id: portalId,
      },
      dataType: 'json',
      success: function (data) {
        // console.log(typeof(data));
        if (data) {
          location.href = '/superset/portal/' + portalId + '/edit';
        } else {
          alert('operate fail');
        }
      },
    });
  }

  upload() {
    // console.log($('#file')[0].files);
    const array = $('#file')[0].files[0].name.split('.');
    const fileType = array[array.length - 1];
    if (fileType !== 'jpg' && fileType !== 'png' && fileType !== 'jpeg') {
      alert(localMessage.picture_upload_error);
      return;
    }
    const timeStamp = new Date().getTime();
    const portalId = this.props.form_data.portal[0];
    const data = new FormData();
    data.append('file', $('#file')[0].files[0]);
    data.append('time', timeStamp);
    data.append('portal_id', portalId);
    $.ajax({
      url: '/superset/upload/logo',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function (result) {
        if (result === 'true') {
          $('#img').attr('src', '/static/logo/logo_' + portalId + '_' + timeStamp + '.png');
        } else {
          alert(localMessage.upload_failed);
        }
      },
    });
  }

  renderOption(opt) {
    return (
      <div>
        <i className={opt.value} />
        <span style={{ marginLeft: '10px' }}>{opt.label}</span>
      </div>
    );
  }

  render() {
    // console.log(this.state);
    const nodes = this.getLeftMenu(0, this.props.form_data.menus);
    // console.log(nodes)
    let menuDiv = this.getMenuDiv(nodes);
    return (
      <div className="Setting SqlLab">
        <div className="container-fluid" height={this.state.contentHeight}>
          <div style={{ width: '100%', height: '85%', overflow: 'hidden' }}>
            <div style={{ width: '20%', float: 'left', height: '100%', overflow: 'auto' }}>
              {menuDiv}
            </div>
            <div style={{ width: '40%', float: 'left', marginTop: '50px', marginLeft: '100px' }}>
              <div className="col-lg-12" style={{ height: '50px' }}>
                <div className="col-lg-2" style={{ textAlign: 'right' }}>
                  <span>{localMessage.menu_name}</span>
                </div>
                <div className="col-lg-10">
                  <input
                    id="menuName"
                    type="text"
                    className="form-control input-sm"
                    placeholder={localMessage.menu_name}
                  />
                </div>
              </div>
              <div className="col-lg-12" style={{ height: '50px' }}>
                <div className="col-lg-2" style={{ textAlign: 'right' }}>
                  <span>{localMessage.parent_menu}</span>
                </div>
                <div className="col-lg-10">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder={localMessage.parent_menu}
                    options={[[0, localMessage.none]].concat(this.props.form_data.menus)
                              .map((m) => ({ value: m[0], label: m[1] }))}
                    value={this.state.parentMenu}
                    autosize={false}
                    onChange={this.changeParentMenu.bind(this)}
                  />
                </div>
              </div>
              {(this.state.parentMenu === null || this.state.parentMenu.value === 0) &&
                <div className="col-lg-12" style={{ height: '50px' }}>
                  <div className="col-lg-2" style={{ textAlign: 'right' }}>
                    <span>{localMessage.icon}</span>
                  </div>
                  <div className="col-lg-10">
                    <Select
                      multi={false}
                      name="select-column"
                      placeholder={localMessage.icon}
                      options={this.state.iconChoices.map((i) =>
                                ({ value: i.value, label: i.key }))}
                      optionRenderer={this.renderOption.bind(this)}
                      value={this.state.icon}
                      autosize={false}
                      onChange={this.changeIcon.bind(this)}
                    />
                  </div>
                </div>
              }
              <div className="col-lg-12" style={{ height: '50px' }}>
                <div className="col-lg-2" style={{ textAlign: 'right' }}>
                  <span>{localMessage.dashboard_name}</span>
                </div>
                <div className="col-lg-10">
                  <Select
                    multi={false}
                    name="select-column"
                    placeholder={localMessage.dashboard_name}
                    options={[['', localMessage.none]].concat(this.props.form_data.dashboards)
                            .map((d) => ({ value: d[0], label: d[1] }))}
                    value={this.state.dashboard}
                    autosize={false}
                    onChange={this.changeDashboard.bind(this)}
                  />
                </div>
              </div>
              <div className="col-lg-12" style={{ height: '50px' }}>
                <div className="col-lg-2" style={{ textAlign: 'right' }}>
                  <span>{localMessage.set_index}</span>
                </div>
                <div className="col-lg-1">
                  <input id="isIndex" type="checkbox" onClick={this.changeIsIndex.bind(this)} />
                </div>
              </div>
              <div className="col-lg-12" style={{ height: '50px' }}>
                <button
                  className="btn btn-primary"
                  onClick={this.operateMenu.bind(this, 'add')}
                  style={{ marginLeft: '20px', height: '40px' }}
                >
                  {localMessage.add}
                </button>
                <button
                  className="btn btn-success"
                  onClick={this.operateMenu.bind(this, 'modify')}
                  style={{ marginLeft: '20px', height: '40px' }}
                >
                  {localMessage.modify}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.operateMenu.bind(this, 'delete')}
                  style={{ marginLeft: '20px', height: '40px' }}
                >
                  {localMessage.delete}
                </button>
                <a
                  className="btn btn-primary"
                  target="_blank"
                  href={'/superset/portal/' + this.props.form_data.portal[0] + '/show'}
                  style={{ marginLeft: '20px', height: '40px' }}
                >
                  {localMessage.portal_preview}
                </a>
              </div>
              <div className="col-lg-12" style={{ marginTop: '30px' }}>
                <div className="col-lg-2" style={{ textAlign: 'right' }}>
                  <span>{localMessage.upload_logo}</span>
                </div>
                <div className="col-lg-1">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    onChange={this.upload.bind(this)}
                  />
                  <img
                    id="img"
                    style={{ width: '240px', height: '120px', marginTop: '20px' }}
                    src={'/static/logo/logo_' + this.props.form_data.portal[0] + '_'
                          + this.props.form_data.portal[3] + '.png'}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Setting.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export { Setting };
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
