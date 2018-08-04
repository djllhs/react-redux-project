/*
 * @Author: daijialing
 * @Date: 2018-07-17 11:24:11
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-27 18:47:43
 * 文案操作
 */


import  * as types  from '../actions/actionTypes';
import {resolve, reject} from '../middleware/promiseMiddleware';
export default (state = {}, action) => {
  switch (action.type) {
    case types.DOCUMENT_OPERATION_LIST:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.DOCUMENT_OPERATION_LIST):
      return Object.assign({}, state, {isLoading: false}, action.payload);
    case reject(types.DOCUMENT_OPERATION_LIST):
      return Object.assign({}, state, {isLoading: false}, action.payload);
    case types.PAGE_CHANGE:
      return Object.assign({}, state, {pagination: action.pagination});

    case types.DOCUMENT_OPERATION_UPDATE:
      return Object.assign({}, state, {isLoading: true});
    case resolve(types.DOCUMENT_OPERATION_UPDATE):
      return Object.assign({}, state, {isLoading: false});
    case reject(types.DOCUMENT_OPERATION_UPDATE):
      return Object.assign({}, state, {isLoading: false});
    default:
      return state;
  }
};
