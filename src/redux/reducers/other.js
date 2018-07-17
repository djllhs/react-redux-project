/*
 * @Author: daijialing
 * @Date: 2018-07-04 16:20:38
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-05 15:29:54
 */
import  * as types  from "../actions/actionTypes";
let menuKeyPath = sessionStorage.getItem('menuKeyPath');
menuKeyPath = menuKeyPath ? menuKeyPath.split(',') : ['2','1'];
console.log('menuKeyPath :', menuKeyPath);

let menu = localStorage.getItem('menuJson');
menu = menu ? JSON.parse(menu) : [];
const initialState = {
  menuKeyPath,
  menu,
}
export function other(state=initialState,action) {
  switch (action.type) {
    case types.GET_MENU:
      return Object.assign({},state, {menu:action.menu});
    case types.MENU_CHANGE:
      return Object.assign({},state, {menuKeyPath: action.menuKeyPath});
    case types.CLEAR_MENU:
      return Object.assign({},state, {menu:action.menu,menuKeyPath: action.menuKeyPath});
    default:
      return state;
  }
}
