/*
import { USER_BASIC_INFO_LIST } from './index';
 * @Author: daijialing
 * @Date: 2018-06-13 17:50:39
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-09 10:54:53
 */
const DEVELOPMENT = 'iwatch.daily.bookln.cn';
const PRODUCTION  = window.location.host;
const isDP        = !!~PRODUCTION.indexOf('localhost') || !!~PRODUCTION.indexOf('192.168.0.25');

const HOST        = 'https://' + (isDP ? DEVELOPMENT : PRODUCTION);

export const LOGIN = `${HOST}/users/login`; // 登录
export const LOGIN_OUT = `${HOST}/users/log_out`; // 退出登录

export const USER_BASIC_INFO_LIST = `${HOST}/userloginhistorys`; // 用户基本信息列表
export const USER_BASIC_INFO_CREATE_ACCOUNT = `${HOST}/users`; // 创建用户
export const USER_LOGIN_INFO_LIST = `${HOST}/userdeviceinfos`; // 登录信息列表
export const USER_PURCHASE_HISTORY_LIST = `${HOST}/userorders`; // 购买信息列表
export const USER_PURCHASE_HISTORY_LIST_EXPORT = `${HOST}/userorders/purchase_history/xls`; // 购买信息列表导出
export const USER_STUDY_CARD_LIST = `${HOST}/bookauths`; // 学习卡列表
export const USER_BOOK_LIST = `${HOST}/userbooks`; // 书籍列表
export const USER_ERROR_INFO_LIST = `${HOST}/resviewerrors`; // 错误信息列表
