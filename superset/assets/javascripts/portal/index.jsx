const $ = window.$ = require('jquery');
const jQuery = window.jQuery = $; // eslint-disable-line
require('bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { initialState, portalReducer } from './reducers';
import { enhancer } from '../reduxUtils';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import Setting from './components/Setting';

const appContainer = document.getElementById('app');
const bootstrapData = JSON.parse(appContainer.getAttribute('data-bootstrap'));

const state = Object.assign(
  initialState(bootstrapData.portal, bootstrapData.menus, bootstrapData.dashboards), {
    portal: bootstrapData.portal,
    menus: bootstrapData.menus,
    dashboards: bootstrapData.dashboards,
  }
);

// console.log('=================');
// console.log(state);

let store = createStore(
  portalReducer, state, compose(applyMiddleware(thunkMiddleware), enhancer()));

// jquery hack to highlight the navbar menu
$('a:contains("portal")').parent().addClass('active');

if (bootstrapData.edit === 'false') {
  render(
    <Provider store={store}>
      <App form_data={state} />
    </Provider>,
    appContainer
  );
} else {
  render(
    <Provider store={store}>
      <Setting form_data={state} />
    </Provider>,
    appContainer
  );
}
