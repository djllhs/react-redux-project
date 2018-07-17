/*
 * @Author: daijialing
 * @Date: 2018-06-13 15:18:41
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-04 16:36:44
 * @title reducer
 */
import  * as types  from "../actions/actionTypes";
export function counter(state={count:0},action) {
  switch (action.type) {
    case types.INCREASE:
      return Object.assign({},state,{count: action.count+1})
    default:
      return state;
  }
}
