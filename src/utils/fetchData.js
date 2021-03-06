/*
 * @Author: daijialing
 * @Date: 2018-06-14 14:33:20
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-06 18:07:08
 */
import axios from "axios";
import Qs from "qs";
const DEVELOPMENT = 'iwatch.daily.bookln.cn';
const PRODUCTION  = window.location.host;
const isDP        = !!~PRODUCTION.indexOf('localhost') || !!~PRODUCTION.indexOf('192.168.0.25');

const HOST        = 'https://' + (isDP ? DEVELOPMENT : PRODUCTION);
axios.defaults.baseURL = HOST;
const headers = {
  'Content-Type':'application/x-www-form-urlencoded'
}

export const getData = (url, param) => {
  return (
    axios.get(`${url}`,{params: param,headers})
  )
}

export const postData = (url, param) => {
  param = Qs.stringify(param);
  return (
    axios.post(`${url}`, param,{headers})
  )
}

export const putData = (url, param) => {
  return (
    axios.put(`${url}`, param)
  )
}
export const deleteData = (url, param) => {
  return (
    axios.put(`${url}`, param)
  )
}
