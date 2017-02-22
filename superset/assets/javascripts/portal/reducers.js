import shortid from 'shortid';
import * as actions from './actions';
import { now } from '../modules/dates';
import { addToObject, alterInObject, alterInArr, removeFromArr, getFromArr, addToArr }
  from '../reduxUtils.js';

export function initialState(portal, menus, dashboards) {
  return {
    portal: portal,
    menus: menus,
    dashboards: dashboards,
  };
}

export const portalReducer = function (state, action) {
  const actionHandlers = {
    [actions.RESET_STATE]() {
      return Object.assign({}, getInitialState());
    },
  };
  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }
  return state;
};
