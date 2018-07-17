/*
 * @Author: daijialing
 * @Date: 2018-07-10 16:38:13
 * @Last Modified by:   daijialing
 * @Last Modified time: 2018-07-10 16:38:13
 */

import  * as types  from "../actions/actionTypes";
import {resolve, reject} from "../middleware/promiseMiddleware";
export default (state = {},action) =>{
  switch (action.type) {
    case types.USER_STUDY_CARD_LIST:
      return Object.assign({},state,{isLoading: true});
    case resolve(types.USER_STUDY_CARD_LIST):
      return Object.assign({}, state, {isLoading: false},action.meta);
    case reject(types.USER_STUDY_CARD_LIST):
      return Object.assign({}, state, {isLoading: false}, action.meta);
    case types.PAGE_CHANGE:
      return Object.assign({},state,{pagination: action.pagination});

    default:
      return state;
  }
}
