/*
 * @Author: daijialing
 * @Date: 2018-06-14 10:05:12
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-06 10:42:19
 */
import  * as types  from "../actions/actionTypes";

const userName = localStorage.getItem('userName') || '游客',
  userInfo = {userName},
  initialState = {
    userInfo
  }
export function login(state=initialState,action) {
  switch (action.type) {
    case types.LOGIN:
      return Object.assign({},state)
    case types.GET_USER_INFO:
      return Object.assign({},state, {userInfo:action.userInfo});
    case types.CLEAR_USER_INFO:
      console.log('initialState :', initialState,action);
      return Object.assign({},state, {userInfo:action.userInfo});
    default:
      return state;
  }
}
