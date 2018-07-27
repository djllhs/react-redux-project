/* global console*/
/*
 * @Author: daijialing
 * @Date: 2018-07-05 17:38:03
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-25 17:02:52
 */
// 基本信息
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Table} from 'antd';
import { AppTypes } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import { IWBreadcrumb } from 'components';

import * as actions from 'actions';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.userBasicInfo.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.userBasicInfo.requestParams || {currentPage: pagination.current},
      scrollY: 0
    };
  }

  componentWillMount() {
    const {requestParams} = this.state;
    console.log('requestParams :', requestParams);
    this.fetchList(requestParams);
  }
  componentDidMount() {
    this.setState({
      scrollY: getTableScrollY()
    });
  }
  fetchList = (param = {}) => {
    this.props.dispatch(actions.userBasicInfoList(param))
      .then(res => {
        const data = res.data;
        console.log('data :', data);
        if (data.success) {
          this.setState({
            list: data.data.pageData,
            pagination: getPagination({current: data.data.currentPage, total: data.data.totalRecords}),
            requestParams: this.props.userBasicInfo.requestParams
          });
        }
      });
  }
  handleTableChange = (page) => {
    this.fetchList(Object.assign(this.state.requestParams, {currentPage: page.current}));
    this.props.dispatch(actions.pageChange(page));
  }

  onChange = (e) => {
    Object.assign(this.state.requestParams, {[e.target.name]: e.target.value, currentPage: 1});
    this.props.dispatch(actions.pageChange(Object.assign(this.state.pagination, {current: 1})));
  }

  selectChange = (newState) => {
    Object.assign(this.state.requestParams, newState, {currentPage: 1});
    this.props.dispatch(actions.pageChange(Object.assign(this.state.pagination, {current: 1})));
  }

  handleClickQuery = () => {
    this.fetchList(this.state.requestParams);
  }


  render() {
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        width: '10%'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: '20%',
        render: text => isValidValue(text)
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '12%',
        render: text => !!text ?
          <a href={'http://www.gpsspg.com/phone/?q=' + text} target='_blank'>{text}</a> : ' --'
      },
      {
        title: '注册时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: '14%',
        render: text => isValidValue(text)
      },
      {
        title: '注册IP',
        dataIndex: 'ip',
        key: 'ip',
        width: '12%',
        render: text => !!text ? <a href={'http://www.gpsspg.com/ip/?q=' + text} target='_blank'>{text}</a> : ' --'
      },
      {
        title: '注册平台',
        dataIndex: 'appType',
        key: 'appType',
        width: '10%',
        render: text => {
          return text != null ? `${AppTypes[+text]}` : '--';
        }
      },
      {
        title: '渠道',
        dataIndex: 'channel',
        key: 'channel',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '操作',
        key: 'operation',
        width: '12%',
        render: (text, record) => {
          return (
            <div>
              <NavLink to={'/index/loginInfo/' + record.userId}>
                <i className='iconfont' title='登陆信息'>&#xe6a3;</i>
              </NavLink>
              <NavLink to={'/index/errorInfo/' + record.userId}>
                <i className='iconfont' title='错误信息' style={{marginLeft: 10}}>&#xe62a;</i>
              </NavLink>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <IWBreadcrumb data={[{ name: '基本信息', link: null }]}/>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
          reload={this.reload}
          requestParams = {this.state.requestParams}
          _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.userBasicInfo.isLoading}
          className='table'
          onChange={this.handleTableChange}
          pagination={this.state.pagination}
          rowKey={record => record.userId}
          scroll={{ y: this.state.scrollY}}
        />
      </div>
    );
  }
}

export default connect(
  state => ({login: state.login, other: state.other, userBasicInfo: state.userBasicInfo})
)(UserInfo);
