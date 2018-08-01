/*
 * @Author: daijialing
 * @Date: 2018-07-17 11:24:11
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-30 16:17:12
 * 文案操作
 */


import  * as types  from '../actions/actionTypes';
import {resolve, reject} from '../middleware/promiseMiddleware';
export default (state = {}, action) => {
  switch (action.type) {
    case types.BANNER_MANAGEMENT_LIST:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.BANNER_MANAGEMENT_LIST):
      return Object.assign({}, state, {isLoading: false}, action.payload);
    case reject(types.BANNER_MANAGEMENT_LIST):
      return Object.assign({}, state, {isLoading: false}, action.payload);
    case types.PAGE_CHANGE:
      return Object.assign({}, state, {pagination: action.pagination});

    case types.BANNER_MANAGEMENT_LOCATIONS:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.BANNER_MANAGEMENT_LOCATIONS):
      return Object.assign({}, state, {isLoading: false}, {locations: action.payload});
    case reject(types.BANNER_MANAGEMENT_LOCATIONS):
      return Object.assign({}, state, {isLoading: false}, {locations: action.payload});
    case types.BANNER_MANAGEMENT_ACTIONS:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.BANNER_MANAGEMENT_ACTIONS):
      return Object.assign({}, state, {isLoading: false}, {actions: action.payload});
    case reject(types.BANNER_MANAGEMENT_ACTIONS):
      return Object.assign({}, state, {isLoading: false}, {actions: action.payload});

    case types.BANNER_MANAGEMENT_UPDATE:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.BANNER_MANAGEMENT_UPDATE):
      return Object.assign({}, state, {isLoading: false});
    case reject(types.BANNER_MANAGEMENT_UPDATE):
      return Object.assign({}, state, {isLoading: false});
    default:
      return state;
  }
};
