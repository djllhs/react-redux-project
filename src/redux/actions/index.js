import * as types from "./actionTypes";
import {
  postData,
  getData,
  putData,
  deleteData,
} from "utils/fetchData";
import {
  LOGIN,
  LOGIN_OUT,
  USER_BASIC_INFO_LIST,
  USER_BASIC_INFO_CREATE_ACCOUNT,
  USER_LOGIN_INFO_LIST,
  USER_PURCHASE_HISTORY_LIST,
  USER_STUDY_CARD_LIST,
  USER_BOOK_LIST,
  USER_ERROR_INFO_LIST,
} from "../../api";

const defaultListParams = {
  currentPage: 1,
  pageSize: 10
}

export const increaseAction = {
  type: types.INCREASE,
}
export const login = (param = {}) => ({
  type: types.LOGIN,
  payload: {
    promise: postData(`${LOGIN}`, param)
  }
})

export const login_out = (param = {}) => ({
  type: types.LOGIN_OUT,
  payload: {
    promise: getData(`${LOGIN_OUT}`, param)
  }
})

// 获取用户信息
export const getUserInfo = (userInfo = {}) => ({
  type: types.GET_USER_INFO,
  userInfo
})

// 清除用户信息
export const clearUserInfo = (userInfo = {}) => ({
  type: types.CLEAR_USER_INFO,
  userInfo
})

// 获取导航 数据
export const getMenu = (menu = []) => ({
  type: types.GET_MENU,
  menu
})
// 清除 菜单数据
export const clearMenu = (menu = [], menuKeyPath = null) => ({
  type: types.CLEAR_MENU,
  menu,
  menuKeyPath
})

// 左侧导航栏改变
export const menuChange = (menuKeyPath = []) => ({
  type: types.MENU_CHANGE,
  menuKeyPath
})

// 页面改变
export const pageChange = (pagination={}) => ({
  type: types.PAGE_CHANGE,
  pagination
})

// 用户基本信息列表
export const userBasicInfoList = (param = {}) => {
  param = Object.assign({},defaultListParams,param)
  return {
    type: types.USER_BASIC_INFO_LIST,
    payload: {
      promise: getData(`${USER_BASIC_INFO_LIST}`,param),
      requestParams: param
    },
  }
}

// 创建用户
export const userBasicInfoCreateUser = (param) => ({
  type: types.USER_BASIC_INFO_CREATE_USER,
  payload: {
    promise: postData(`${USER_BASIC_INFO_CREATE_ACCOUNT}`, param)
  }
})

// 用户 登录信息列表
export const userLoginInfoList = (param = {}) => {
  param = Object.assign({},defaultListParams,param)
  return {
    type: types.USER_LOGIN_INFO_LIST,
    payload: {
      promise: getData(`${USER_LOGIN_INFO_LIST}`,param),
      requestParams: param
    },
  }
}
// 用户 购买历史列表
export const userPurchaseHistoryList = (param = {}) => {
  param = Object.assign({orderBy: "id DESC",excludeConsignmentSale: true},defaultListParams,param)
  return {
    type: types.USER_PURCHASE_HISTORY_LIST,
    payload: {
      promise: getData(`${USER_PURCHASE_HISTORY_LIST}`,param),
      requestParams: param
    },
  }
}

// 用户 购买历史 退款
export const userPurchaseHistoryItemRefund = (id, param ={}) =>{
  return {
    type: types.USER_PURCHASE_HISTORY_ITEM_REFUND,
    payload: {
      promise: putData(`${USER_PURCHASE_HISTORY_LIST}/${id}/refund`,param)
    }
  }
}


// 用户 学习卡列表
export const userStudyCardList = (param = {}) => {
  param = Object.assign({},defaultListParams,param)
  return {
    type: types.USER_STUDY_CARD_LIST,
    payload: {
      promise: getData(`${USER_STUDY_CARD_LIST}`,param),
      requestParams: param
    },
  }
}

// 用户 书籍列表
export const userBookSelfList = (param = {}) => {
  param = Object.assign({},defaultListParams,param)
  return {
    type: types.USER_BOOK_LIST,
    payload: {
      promise: getData(`${USER_BOOK_LIST}`,param),
      requestParams: param
    },
  }
}

// 用户 错误信息列表
export const userErrorInfoList = (param = {}) => {
  param = Object.assign({},defaultListParams,param)
  return {
    type: types.USER_ERROR_INFO_LIST,
    payload: {
      promise: getData(`${USER_ERROR_INFO_LIST}`,param),
      requestParams: param
    },
  }
}
