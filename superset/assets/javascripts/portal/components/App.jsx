const $ = window.$ = require('jquery');
import * as Actions from '../actions';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-draggable-tab';

require('../app.css');

const propTypes = {
  form_data: React.PropTypes.array.isRequired,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash,
      contentHeight: this.getHeight(),
      headMenuId: 0,
      leftMenus: [],
      dashboard_href: 'init_url',
      tabs: [],
      selectedTab: null,
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

  changeHeadMenu(headMenu) {
    // console.log(headMenu);
    this.setState({ headMenuId: headMenu[0] });
    if (headMenu[3] !== '') {
      if (headMenu[5] === 'true') {
        // is link and is index
        if (this.state.dashboard_href === 'init_url') {
          this.state.dashboard_href = headMenu[3];
          this.setState({
            tabs: [
              (<Tab key={'tab' + headMenu[0]} title={headMenu[1]} disableClose={'true'}>
                <iframe
                  src={headMenu[3] === '' ? '/superset/null' : '/superset/dashboard/'
                        + headMenu[3] + '?showHeader=false&isTitle=false'}
                  style={{ width: '100%', height: '100%' }}
                />
              </Tab>),
            ],
            selectedTab: 'tab' + headMenu[0],
          });
        } else {
          this.setState({
            selectedTab: 'tab' + headMenu[0],
          });
        }
      } else {
        // is link, not index
        const newTab = (
          <Tab key={'tab' + headMenu[0]} title={headMenu[1]}>
            <iframe
              src={headMenu[3] === '' ? '/superset/null' : '/superset/dashboard/'
                    + headMenu[3] + '?showHeader=false&isTitle=false'}
              style={{ width: '100%', height: '100%' }}
            />
          </Tab>
        );
        this.setState({
          tabs: this.state.tabs.concat([newTab]),
          selectedTab: 'tab' + headMenu[0],
        });
      }
    }
    this.changeLeftMenu(headMenu[0]);
  }

  deepCopy(o) {
    if (o instanceof Array) {
      const n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Object) {
      const n = [];
      for (const i in o) {
        n[i] = this.deepCopy(o[i]);
      }
      return n;
    }
    return o;
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
            dashboard_href: menu[3],
            open_way: menu[4],
            is_index: menu[5],
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
          dashboard_href: menu[3],
          open_way: menu[4],
          is_index: menu[5],
        };
        node.children = this.getLeftMenu(menu[0], menus);
        nodes.push(node);
      }
    }
    return nodes;
  }

  changeLeftMenu(parentId) {
    this.state.leftMenus = [];
    const menus = this.deepCopy(this.props.form_data.menus);
    let k = 0;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i - k][2] === 0) {
        menus.splice(i - k, 1);
        k++;
      }
    }
    for (k = 0; k < menus.length; k++) {
      if (menus[k][2] === parentId) {
        menus[k][2] = 0;
      }
    }
    // console.log(menus)
    // console.log(this.props.form_data.menus)
    const menus2 = this.deepCopy(menus);
    this.state.leftMenus = this.getLeftMenu(0, menus2);

    // console.log("++++++++++++++")
    // console.log(this.state.leftMenus)
  }

  // get leftMenuDiv
  getMenuDiv(menuObj) {
    // let menuObj = this.state.leftMenus;
    const vdom = [];
    if (menuObj instanceof Array) {
      const list = [];
      for (const item of menuObj) {
        list.push(this.getMenuDiv(item));
      }
      vdom.push(
        <ul className="sub-menu" style={{ listStyleType: 'none' }}>
            {list}
        </ul>
      );
    } else {
      if (menuObj.is_index === 'true' && this.state.dashboard_href === 'init_url') {
        this.setState({ dashboard_href: menuObj.dashboard_href });
        this.setState({
          tabs: [
            (<Tab key={'tab' + menuObj.id} title={menuObj.name} disableClose={'true'}>
              <iframe
                src={menuObj.dashboard_href === '' ? '/superset/null' :
                      '/superset/dashboard/' + menuObj.dashboard_href
                      + '?showHeader=false&isTitle=false'}
                style={{ width: '100%', height: '100%' }}
              />
            </Tab>),
          ],
          selectedTab: 'tab' + menuObj.id,
        });
      }
      if (menuObj.children.length !== 0) {
        vdom.push(
          <li style={{ listStyleType: 'none' }}>
            <h1
              id={'li' + menuObj.id}
              className="menu"
              onClick={this.loadDashboard.bind(this, menuObj)}
            >
              <div>
                <i id={'icon' + menuObj.id} className="fa fa-caret-down" aria-hidden="true"></i>
                {menuObj.name}
              </div>
            </h1>
            {this.getMenuDiv(menuObj.children)}
          </li>
        );
      } else {
        vdom.push(
          <li style={{ listStyleType: 'none' }}>
            <h1
              id={'li' + menuObj.id}
              onClick={this.loadDashboard.bind(this, menuObj)}
            >
              <div>
                {menuObj.name}
              </div>
            </h1>
            {this.getMenuDiv(menuObj.children)}
          </li>
        );
      }
    }
    return vdom;
  }

  loadDashboard(menu) {
    // console.log(menu);
    if (menu.children.length === 0) {
      // is this table exist in tabs
      let flag = true;
      for (let i = 0; i < this.state.tabs.length; i++) {
        if ('tab' + menu.id === this.state.tabs[i].key) {
          flag = false;
          break;
        }
      }
      if (flag) {
        // doesn't exist
        let newTab = null;
        if (menu.dashboard_href !== '') {
          newTab = (
            <Tab key={'tab' + menu.id} title={menu.name}>
              <iframe
                src={'/superset/dashboard/' + menu.dashboard_href
                  + '?showHeader=false&isTitle=false'}
                style={{ width: '100%', height: '100%' }}
              />
            </Tab>
          );
        } else {
          newTab = (
            <Tab key={'tab' + menu.id} title={menu.name}>
              <div>
                <h2 style={{ marginLeft: '20px' }}>this menu has no link...</h2>
              </div>
            </Tab>
          );
        }
        this.setState({
          tabs: this.state.tabs.concat([newTab]),
          selectedTab: 'tab' + menu.id,
        });
      } else {
        // exist
        this.setState({
          selectedTab: 'tab' + menu.id,
        });
      }
    } else {
      if ($('#icon' + menu.id).attr('class') === 'fa fa-caret-down') {
        $('#icon' + menu.id).attr('class', 'fa fa-caret-right');
      } else {
        $('#icon' + menu.id).attr('class', 'fa fa-caret-down');
      }
      $('#li' + menu.id).next().toggle();
    }
  }


  handleTabSelect(e, key, currentTabs) {
    // console.log('handleTabSelect key:', key);
    this.setState({ selectedTab: key, tabs: currentTabs });
  }

  handleTabClose(e, key, currentTabs) {
    // console.log('tabClosed key:', key);
    this.setState({ tabs: currentTabs });
  }

  getIndexParentMenu(indexMenu) {
    if (indexMenu != null && indexMenu[2] !== 0) {
      let flag = false;
      let menu2 = null;
      this.props.form_data.menus.forEach((menu) => {
        if (menu[0] === indexMenu[2]) {
          flag = true;
          menu2 = menu;
          return;
        }
      });
      if (flag) {
        return this.getIndexParentMenu(menu2);
      }
      return null;
    }
    return indexMenu;
  }

  render() {
    const headMenus = [];
    this.props.form_data.menus.forEach((menu) => {
      if (menu[2] === 0) {
        headMenus.push(menu);
      }
    });

    // get index menu
    if (this.state.headMenuId === 0) {
      let indexMenu = null;
      this.props.form_data.menus.forEach((menu) => {
        if (menu[5] === 'true') {
          indexMenu = menu;
          return;
        }
      });
      const indexParentMenu = this.getIndexParentMenu(indexMenu);
      // if not set index, set first headMenu to index
      if (indexParentMenu === null) {
        this.changeHeadMenu(headMenus[0]);
      } else {
        this.changeHeadMenu(indexParentMenu);
      }
    }

    // get headMenuDiv
    const headMenuDiv = [];
    let i = 0;
    headMenus.forEach((headMenu) => {
      i++;
      if ((this.state.headMenuId === 0 && i === 1) || headMenu[0] === this.state.headMenuId) {
        headMenuDiv.push(
          <li
            role="presentation"
            className="active"
            style={{ fontSize: '20px', cursor: 'pointer' }}
          >
            <a onClick={this.changeHeadMenu.bind(this, headMenu)} style={{ float: 'left' }}>
              <i className={headMenu[6]} aria-hidden="true" style={{ fontSize: '20px' }}></i>
              {headMenu[1]}
            </a>
          </li>
        );
      } else {
        headMenuDiv.push(
          <li role="presentation" style={{ fontSize: '20px', cursor: 'pointer' }}>
            <a onClick={this.changeHeadMenu.bind(this, headMenu)}>
              <i className={headMenu[6]} aria-hidden="true" style={{ fontSize: '20px' }}></i>
              {headMenu[1]}
            </a>
          </li>
        );
      }
    });

    // get leftMenus
    const leftMenuDiv = this.getMenuDiv(this.state.leftMenus);

    return (
      <div className="App SqlLab">
        <div className="container-fluid" height={this.state.contentHeight}>
          <div style={{ width: '100%', height: '95%', overflow: 'hidden' }}>
            <div>
              <div className="menu-header" style={{ overflow: 'hidden' }}>
                <div style={{ float: 'left' }}>
                  <img
                    src={'/static/logo/logo_' + this.props.form_data.portal[0] + '_'
                          + this.props.form_data.portal[3] + '.png'}
                    alt="img"
                  />
                  <h2>{this.props.form_data.portal[1]}</h2>
                </div>
                <ul className="navbar navbar-tabs">
                  {headMenuDiv}
                </ul>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="menu-left">
                <div>
                    {leftMenuDiv}
                </div>
              </div>
              <div style={{ float: 'left', width: '85%', height: '90%' }}>
                <Tabs
                  selectedTab={this.state.selectedTab ? this.state.selectedTab : 'tab'}
                  onTabSelect={this.handleTabSelect.bind(this)}
                  onTabClose={this.handleTabClose.bind(this)}
                  tabs={this.state.tabs}
                  tabsStyles={{
                    tabBarAfter: {
                      height: '3px',
                      backgroundColor: '#666',
                      borderBottom: '0.5px solid #666',
                    },
                    tabBefore: {
                      display: 'none',
                    },
                    tab: {
                      marginLeft: '0px',
                      marginRight: '2px',
                      maxWidth: '130px',
                      backgroundImage: '',
                      backgroundColor: '#eee',
                      boxShadow: 'rgb(72, 72, 72) 1px 1px 0px inset, '
                             + 'rgba(0, 0, 0, 0.0980392) -4px 0px 4px;',
                    },
                    tabAfter: {
                      display: 'none',
                    },
                    tabActive: {
                      backgroundImage: '',
                      backgroundColor: '#999',
                      color: '#eee',
                    },
                    tabOnHover: {
                      backgroundImage: '',
                      backgroundColor: '#999',
                    },
                    tabTitle: {
                      color: '#666',
                      marginTop: '4px',
                    },
                    tabTitleOnHover: {
                      color: '#eee',
                    },
                    tabCloseIconOnHover: {
                      backgroundColor: '#999',
                      color: 'white',
                    },
                    tabAddButton: {
                      display: 'none',
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '5%', backgroundColor: '#ddd' }}>
            <p style={{ textAlign: 'center', lineHeight: '50px' }}>
              {this.props.form_data.portal[4]}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

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

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
