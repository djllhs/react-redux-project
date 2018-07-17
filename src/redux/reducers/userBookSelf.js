/*
 * @Author: daijialing
 * @Date: 2018-07-10 17:19:00
 * @Last Modified by:   daijialing
 * @Last Modified time: 2018-07-10 17:19:00
 */
import  * as types  from "../actions/actionTypes";
import {resolve, reject} from "../middleware/promiseMiddleware";
export default (state = {},action) =>{
  switch (action.type) {
    case types.USER_BOOK_LIST:
      return Object.assign({},state,{isLoading: true});
    case resolve(types.USER_BOOK_LIST):
      return Object.assign({}, state, {isLoading: false},action.meta);
    case reject(types.USER_BOOK_LIST):
      return Object.assign({}, state, {isLoading: false}, action.meta);
    case types.PAGE_CHANGE:
      return Object.assign({},state,{pagination: action.pagination});

    default:
      return state;
  }
}
