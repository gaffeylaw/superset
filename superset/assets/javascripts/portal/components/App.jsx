const $ = window.$ = require('jquery');
import * as Actions from '../actions';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alerts from './Alerts';

import {Tab, Tabs} from 'react-draggable-tab';

require('../app.css');

const propTypes = {
  form_data: React.PropTypes.array.isRequired,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    let icon = (<image src='icon.png' style={{height:'13px'}}/>);
    let fonticon = (<icon className='icon-html5'/>);
    this.state = {
      hash: window.location.hash,
      contentHeight: this.getHeight(),
      headMenuId: 0,
      leftMenus: [],
      dashboard_href: 'init_url',
      tabs:[],
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
    console.log(headMenu)
    this.setState({ headMenuId: headMenu[0] });
    if (headMenu[3] !== '') {
      if (headMenu[5] === 'true') {
        // is index and is link
        if (this.state.dashboard_href === 'init_url') {
          this.state.dashboard_href = headMenu[3];
          this.setState({
            tabs: [
              (<Tab key={'tab' + headMenu[0]} title={headMenu[1]} disableClose={true}>
                <iframe src={headMenu[3] ==='' ? '/superset/null' : '/superset/dashboard/' + headMenu[3] + '?showHeader=false'} style={{width: '100%', height: '100%'}}>
                </iframe>
              </Tab>)
            ],
            selectedTab: 'tab' + headMenu[0],
          })
        } else {
          this.setState({
            selectedTab: 'tab' + headMenu[0],
          })
        }
      } else {
        // not index, is link
        let newTab = (<Tab key={'tab' + headMenu[0]} title={menu.name}>
                        <iframe src={menu.dashboard_href ==='' ? '/superset/null' : '/superset/dashboard/' + menu.dashboard_href + '?showHeader=false'} style={{width: '100%', height: '100%'}}>
                        </iframe>
                      </Tab>);
        this.setState({
          tabs: this.state.tabs.concat([newTab]),
          selectedTab: 'tab' + headMenu[0]
        });
      }
    }
    this.changeLeftMenu(headMenu[0]);
  }

  deepCopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = this.deepCopy(o[i]);
        }
        return n;

    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = this.deepCopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
  }

  getLeftMenu(id, menus) {
    if(id !== 0) {
      const children = [];
      for(let i=0; i<menus.length; i++) {
        let menu = menus[i];
        if(menu[2] === id) {
          let node = {
            id: menu[0],
            name: menu[1],
            dashboard_href: menu[3],
            open_way: menu[4],
            is_index: menu[5],
          }
          node.children = this.getLeftMenu(menu[0], menus);
          children.push(node);
        }
      }
      return children;
    } else {
      const nodes = [];
      for(let i=0; i<menus.length; i++) {
        let menu = menus[i];
        if(menu[2] === 0) {
          let node = {
            id: menu[0],
            name: menu[1],
            dashboard_href: menu[3],
            open_way: menu[4],
            is_index: menu[5],
          }
          node.children = this.getLeftMenu(menu[0], menus);
          nodes.push(node);
        }
        
      }
      return nodes;
    }
  }

  changeLeftMenu(parentId) {
    this.state.leftMenus = [];
    const menus = this.deepCopy(this.props.form_data.menus);
    let k = 0;
    for(var i=0; i<menus.length; i++) {
      if(menus[i-k][2] === 0) {
        menus.splice(i-k, 1);
        k++;
      }
    }
    for(var i=0; i<menus.length; i++) {
      if(menus[i][2] === parentId) {
          menus[i][2] = 0;
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
    let vdom = [];
    if (menuObj instanceof Array) {
        let list = [];
        for (var item of menuObj) {
            list.push(this.getMenuDiv(item));
        }
        vdom.push(
            <ul className="sub-menu" style={{listStyleType: 'none'}}>
                {list}
            </ul>
        );
    } else {
        if (menuObj.is_index === 'true' && this.state.dashboard_href === 'init_url') {
          this.setState({dashboard_href: menuObj.dashboard_href});
          this.setState({
            tabs: [
              (<Tab key={'tab' + menuObj.id} title={menuObj.name} disableClose={true}>
                <iframe src={menuObj.dashboard_href ==='' ? '/superset/null' : '/superset/dashboard/' + menuObj.dashboard_href + '?showHeader=false'} style={{width: '100%', height: '100%'}}>
                </iframe>
              </Tab>)
            ],
            selectedTab: 'tab' + menuObj.id,
          })
        }
        if (menuObj.children.length !== 0) {
           vdom.push(
                <li style={{listStyleType: 'none'}}>
                     <h1 id={'li'+menuObj.id} className='menu'
                        onClick={this.loadDashboard.bind(this, menuObj)}>
                        <div>
                          <i id={"icon" + menuObj.id} className="fa fa-caret-down" aria-hidden="true"></i>
                          {menuObj.name}
                        </div>
                    </h1>
                  {this.getMenuDiv(menuObj.children)}
                </li>
            );
        } else {
          vdom.push(
              <li style={{listStyleType: 'none'}}>
                  <h1 id={'li'+menuObj.id}
                      onClick={this.loadDashboard.bind(this, menuObj)}>
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
    console.log(menu);
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
        let newTab = (<Tab key={'tab' + menu.id} title={menu.name} tabStyles = {{backgroundColor: 'gray'}}>
                        <iframe src={menu.dashboard_href ==='' ? '/superset/null' : '/superset/dashboard/' + menu.dashboard_href + '?showHeader=false'} style={{width: '100%', height: '100%'}}>
                        </iframe>
                      </Tab>);
        this.setState({
          tabs: this.state.tabs.concat([newTab]),
          selectedTab: 'tab' + menu.id
        });
      } else {
        // exist
        this.setState({
          selectedTab: 'tab' + menu.id
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
    console.log('handleTabSelect key:', key);
    this.setState({selectedTab: key, tabs: currentTabs});
  }

  handleTabClose(e, key, currentTabs) {
    console.log('tabClosed key:', key);
    this.setState({tabs: currentTabs});
  }

  // handleTabPositionChange(e, key, currentTabs) {
  //   console.log('tabPositionChanged key:', key);
  //   this.setState({tabs: currentTabs});
  // }

  render() {
    const headMenus = [];
    this.props.form_data.menus.forEach((menu) => {
      if(menu[2] === 0) {
        headMenus.push(menu);
      }
    })

    if(this.state.headMenuId === 0) {
      this.changeHeadMenu(headMenus[0]);
    }
    // get headMenuDiv
    const headMenuDiv = [];
    let i = 0;
    headMenus.forEach((headMenu) => {
      i++;
      if((this.state.headMenuId === 0 && i === 1) || headMenu[0] === this.state.headMenuId) {
        headMenuDiv.push(
          <li role="presentation" className="active" style={{fontSize: '20px', cursor: 'pointer'}}>
            <a onClick={this.changeHeadMenu.bind(this, headMenu)} style={{float: 'left'}}>
              <i className={headMenu[6]} aria-hidden="true" style={{fontSize: '20px'}}></i>
              {headMenu[1]}
            </a>
          </li>
        );
      } else {
        headMenuDiv.push(
          <li role="presentation" style={{fontSize: '20px', cursor: 'pointer'}}>
            <a onClick={this.changeHeadMenu.bind(this, headMenu)}>
               <i className={headMenu[6]} aria-hidden="true" style={{fontSize: '20px'}}></i>
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
          <div style={{width: '100%', height: '95%', overflow: 'hidden'}}>
            <div> 
              <div className="menu-header" style={{overflow: 'hidden'}}>
                <div style={{float: 'left'}}>
                  <img src={'/static/logo/logo_' + this.props.form_data.portal[0] + '_' + this.props.form_data.portal[3] + '.png'} />
                  <h2>{this.props.form_data.portal[1]}</h2>
                </div>
                <ul className="navbar navbar-tabs">
                  {headMenuDiv}
                </ul>
              </div>
            </div>
            <div style={{overflow: 'hidden'}}>
              <div className="menu-left">
                <div>
                    {leftMenuDiv}
                </div>
              </div>
              <div style={{float: 'left', width: '85%', height: '90%'}}>
                <Tabs
                  
                  selectedTab={this.state.selectedTab ? this.state.selectedTab : "tab"}
                  onTabSelect={this.handleTabSelect.bind(this)}
                  onTabClose={this.handleTabClose.bind(this)}
                  // onTabPositionChange={this.handleTabPositionChange.bind(this)}
                  tabs={this.state.tabs}
                  shortCutKeys={
                    {
                      'close': ['alt+command+w', 'alt+ctrl+w'],
                      'create': ['alt+command+t', 'alt+ctrl+t'],
                      'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
                      'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
                    }
                  }
                />
              </div>
            </div>
          </div>
          <div style={{width: '100%', height: '5%', backgroundColor: '#ddd'}}>
            <p style={{textAlign: 'center', lineHeight: '50px'}}>{this.props.form_data.portal[4]}</p>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  alerts: React.PropTypes.array,
  actions: React.PropTypes.object,
};

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
