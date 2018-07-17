/*
 * @Author: daijialing
 * @Date: 2018-07-09 10:45:44
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-10 15:48:46
 */

// 登录信息
import React from "react";
import { connect } from "react-redux";
import {Table} from 'antd';
import { NetTypes,LoginAppTypes } from "utils/dtoTypes";
import { isValidValue, getPagination, getTableScrollY,getFileSize,isEmptyObj } from "utils/util";
import ConditionsOfQuery from "./ConditionsOfQuery";

import * as actions from "actions";

class LoginInfo extends React.Component{
  constructor(props) {
    super(props);
    console.log('props :', props);
    const {userLoginInfo, match} = props;
    const pagination = getPagination(props.userLoginInfo.pagination || {});
    const requestParams = Object.assign({},userLoginInfo.requestParams || {currentPage: pagination.current},match.params)
    this.state = {
      list: [],
      pagination,
      requestParams,
      scrollY: 0
    }
  }

  componentWillMount() {
    const {requestParams} = this.state;
    this.fetchList(requestParams);
  }

  componentDidMount() {
    console.log('LoginInfo :', this.props);
    this.setState({
        scrollY: getTableScrollY()
    })
  }
  componentWillReceiveProps(nextProps) {
    const {params} = nextProps.match;
    if(this.props.match.url !== nextProps.match.url){
      if(!isEmptyObj(params) && !params.userId){
        this.setState({
          requestParams: {currentPage: this.state.pagination.current}
        }, () => {
          this.fetchList();
        })
      }
    }
  }

  fetchList = (param = {}) => {
    this.props.dispatch(actions.userLoginInfoList(param))
    .then(res => {
      const data = res.data;
      console.log('data :', data);
      if(data.success){
        this.setState({
          list: data.data.pageData,
          pagination: getPagination({current: data.data.currentPage,total: data.data.totalRecords}),
          requestParams: this.props.userLoginInfo.requestParams
        })
      }
    })
  }
  handleTableChange = (page) => {
    this.fetchList(Object.assign(this.state.requestParams,{currentPage: page.current}));
    this.props.dispatch(actions.pageChange(page));
  }

  onChange = (e) => {
    Object.assign(this.state.requestParams, {[e.target.name]: e.target.value,currentPage: 1});
    this.props.dispatch(actions.pageChange(Object.assign(this.state.pagination,{current: 1})));
  }

  selectChange = (newState) => {
    Object.assign(this.state.requestParams, newState, {currentPage: 1});
    this.props.dispatch(actions.pageChange(Object.assign(this.state.pagination,{current: 1})));
  }

  handleClickQuery = () => {
    this.fetchList(this.state.requestParams);
  }


  render(){
    const columns = [
      {
        title: '记录编号',
        dataIndex: 'id',
        key: 'id',
        width: '6%',
      },
      {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '版本号',
        dataIndex: 'vid',
        key: 'vid',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '设备名',
        dataIndex: 'deviceName',
        key: 'deviceName',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '系统版本',
        dataIndex: 'osVersion',
        key: 'osVersion',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '网络类型',
        dataIndex: 'netType',
        key: 'netType',
        width: '6%',
        render: text => text != null ? `${NetTypes[+text]}` : `--`
      },
      {
        title: '磁盘空闲',
        dataIndex: 'diskFree',
        key: 'diskFree',
        width: '8%',
        render: text => getFileSize(text)
      },
      {
        title: 'ip',
        dataIndex: 'ip',
        key: 'ip',
        width: '12%',
        render: text => !!text ? <a href={'http://www.gpsspg.com/ip/?q=' + text} target="_blank">{text}</a> : `--`
      },
      {
        title: 'app平台',
        dataIndex: 'appType',
        key: 'appType',
        width: '6%',
        render: text => text != null ? `${LoginAppTypes[+text]}` : `--`
      },
      {
        title: '渠道',
        dataIndex: 'channel',
        key: 'channel',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '登录时间',
        dataIndex: 'gmtCreate',
        key: 'loginTime',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '地理位置',
        width: '6%',
        render: (text, record) => {
          const lat = record.lat, lon = record.lon;
          if (lat === 0 && lon === 0)
            return <i className="iconfont">&#xe6a5;</i>
          else
            return <a href={"http://www.gpsspg.com/maps.htm?s=" + lat + "," + lon}
              target="_blank"><i className="iconfont">&#xe639;</i></a>
        }
      }
    ];
    return(
      <div>
        <ConditionsOfQuery onChange={this.onChange}
            callbackParent={this.selectChange}
            onClick={this.handleClickQuery}
            // reload={this.reload}
            requestParams = {this.state.requestParams}
            _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.userLoginInfo.isLoading}
          className="table"
          onChange={this.handleTableChange}
          pagination={this.state.pagination}
          rowKey={record => record.userId}
          scroll={{ y: this.state.scrollY}}
        />
      </div>
    )
  }
}

export default connect(
  state => ({login: state.login, other: state.other,userLoginInfo: state.userLoginInfo})
)(LoginInfo);
