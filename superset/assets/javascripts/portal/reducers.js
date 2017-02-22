// import shortid from 'shortid';
import * as actions from './actions';
// import { now } from '../modules/dates';
// import { addToObject, alterInObject, alterInArr, removeFromArr, getFromArr, addToArr }
  // from '../reduxUtils.js';

export function initialState(portal, menus, dashboards) {
  return {
    portal: portal,
    menus: menus,
    dashboards: dashboards,
  };
}

export const portalReducer = function (state, action) {
  return state;
};
