/* global window*/
/*
 * @Author: daijialing
 * @Date: 2018-06-13 18:05:28
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-23 17:22:11
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // 异步操作
import logger from 'redux-logger';
import promiseMiddleware from '../middleware/promiseMiddleware';
// import promiseMiddleware  from 'redux-promise';
import reducer from '../reducers';

const configStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(promiseMiddleware('_FULFILLED', '_REJECTED'), thunk, logger)
);

export default configStore;
