const $ = window.$ = require('jquery');
const jQuery = window.jQuery = $; // eslint-disable-line
require('bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { enhancer } from '../reduxUtils';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import ListPage from './components/ListPage';
import AddPage from './components/AddPage';
import ModifyPage from './components/ModifyPage';
import MailPage from './components/MailPage';

const appContainer = document.getElementById('app');
const bootstrapData = JSON.parse(appContainer.getAttribute('data-bootstrap'));

const initialState = function (type, schedulers, dashboards, scheduler,
                      condition, slices, mailPage, mail) {
  return {
    type: type,
    schedulers: schedulers,
    dashboards: dashboards,
    scheduler: scheduler,
    condition: condition,
    slices: slices,
    mailPage: mailPage,
    mail: mail,
  };
};
const state = Object.assign(
  initialState(bootstrapData.type, bootstrapData.schedulers, bootstrapData.dashboards,
              bootstrapData.scheduler, bootstrapData.condition, bootstrapData.slices,
              bootstrapData.mailPage, bootstrapData.mail), 
  {
    type: bootstrapData.type,
    schedulers: bootstrapData.schedulers,
    dashboards: bootstrapData.dashboards,
    scheduler: bootstrapData.scheduler,
    condition: bootstrapData.condition,
    slices: bootstrapData.slices,
    mailPage: bootstrapData.mailPage,
    mail: bootstrapData.mail,
  }
);

// console.log('=================');
// console.log(state);

const schedulerReducer = function (state) {
  return state;
};

let store = createStore(
  schedulerReducer, state, compose(applyMiddleware(thunkMiddleware), enhancer()));

if (state.type === 'list') {
  render(
    <Provider store={store}>
      <ListPage form_data={state} />
    </Provider>,
    appContainer
  );
} else if (state.type === 'add') {
  render(
    <Provider store={store}>
      <AddPage form_data={state} />
    </Provider>,
    appContainer
  );
} else if (state.type === 'modify') {
  render(
    <Provider store={store}>
      <ModifyPage form_data={state} />
    </Provider>,
    appContainer
  );
} else if (state.mailPage === 'true') {
  render(
    <Provider store={store}>
      <MailPage form_data={state} />
    </Provider>,
    appContainer
  );
}
