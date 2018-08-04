/* global window*/
/*
 * @Author: daijialing
 * @Date: 2018-06-13 17:50:39
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-23 17:22:51
 */
const DEVELOPMENT = 'iwatch.daily.bookln.cn';
const PRODUCTION = window.location.host;
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

export const DOCUMENT_OPERATION_LIST = `${HOST}/apptexts`; // 文案列表
export const BANNER_MANAGEMENT_LIST = `${HOST}/banners`; // banner列表
export const BANNER_MANAGEMENT_LOCATIONS = `${HOST}/banners/locations`; // banner位置
export const BANNER_MANAGEMENT_ACTIONS = `${HOST}/banners/actions`; // banner动作
export const PUSH_MANAGEMENT_LIST = `${HOST}/pushes/list`; // 推送列表
export const PUSH_MANAGEMENT_ADD = `${HOST}/pushes/save`; // 新增push
export const PUSH_MANAGEMENT_MODIFY = `${HOST}/pushes/modify`; // 更新push
export const PUSH_MANAGEMENT_STOP = `${HOST}/pushes/stop`; // 停止push
export const PUSH_MANAGEMENT_DELETE = `${HOST}/pushes/delete`; // 更新push
export const PUSH_MANAGEMENT_TEST = `${HOST}/pushes/test`; // 测试push
export const PUSH_MANAGEMENT_PUSH = `${HOST}/pushes/push`; // 执行push
export const CLICK_READ_BOOK_LIST = `${HOST}/click_read_books`; // 点读书列表
export const CLICK_READ_BOOK_CATALOG_LIST = `${HOST}/click_read_books/catalogs`; // 点读书目录列表
export const CLICK_READ_BOOK_PAGE_LIST = `${HOST}/click_read_books/pages`; // 点读书 页列表
export const CLICK_READ_BOOK_TRACK_LIST = `${HOST}/click_read_books/tracks`; // 点读书 轨迹列表
export const GET_SOME_RESOURCE = `${HOST}/resources`; // 获取某一资源
export const COUPON_BATCH_LIST = `${HOST}/coupon_batches`; // 优惠券批次列表
export const COUPON_LIST = `${HOST}/coupons`; // 优惠券列表
