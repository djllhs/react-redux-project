/* global console, window */
/*
 * @Author: daijialing
 * @Date: 2018-07-10 17:29:43
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-25 17:01:29
 * 错误信息
 */

import React from 'react';
import { connect } from 'react-redux';
import {Table} from 'antd';
import { ResourceTypes, NetTypes } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY, isEmptyObj } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import ErrorLogModal from './ErrorLogModal';
import { USER_ERROR_INFO_LIST } from '@/api';
import * as actions from 'actions';
import { IWBreadcrumb } from 'components';
import './index.css';

class ErrorInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const {userErrorInfo, match} = props;
    const pagination = getPagination(props.userErrorInfo.pagination || {});
    const requestParams = Object.assign({}, userErrorInfo.requestParams || {currentPage: pagination.current}, match.params);
    this.state = {
      list: [],
      pagination,
      requestParams,
      scrollY: 0
    };
  }

  componentWillMount() {
    const {requestParams} = this.state;
    this.fetchList(requestParams);
  }

  componentDidMount() {
    console.log('ErrorInfo :', this.props);
    this.setState({
      scrollY: getTableScrollY()
    });
  }
  componentWillReceiveProps(nextProps) {
    const {params} = nextProps.match;
    if (this.props.match.url !== nextProps.match.url) {
      if (!isEmptyObj(params) && !params.userId) {
        this.setState({
          requestParams: {currentPage: this.state.pagination.current}
        }, () => {
          this.fetchList();
        });
      }
    }
  }

  fetchList = (param = {}) => {
    this.props.dispatch(actions.userErrorInfoList(param))
      .then(res => {
        const data = res.data;
        console.log('data :', data);
        if (data.success) {
          this.setState({
            list: data.data.pageData,
            pagination: getPagination({current: data.data.currentPage, total: data.data.totalRecords}),
            requestParams: this.props.userErrorInfo.requestParams
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

  handleExport = (id) => {
    const url = `${USER_ERROR_INFO_LIST}/${id}/txt`;
    console.log('url----', url);
    window.location.href = url;
  }

  render() {
    const columns = [
      {
        title: '记录编号',
        dataIndex: 'id',
        key: 'id',
        width: '4%'
      },
      {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '资源编号',
        dataIndex: 'resId',
        key: 'resId',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: '资源名',
        dataIndex: 'resName',
        key: 'resName',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '资源类型',
        dataIndex: 'resType',
        key: 'resType',
        width: '4%',
        render: text => text != null ? `${ResourceTypes[+text]}` : '--'
      },
      {
        title: '节编号',
        dataIndex: 'sectionId',
        key: 'sectionId',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: '节名',
        dataIndex: 'sectionName',
        key: 'sectionName',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '书籍编号',
        dataIndex: 'entityId',
        key: 'entityId',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: '书籍名称',
        dataIndex: 'bookName',
        key: 'bookName',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '网络类型',
        dataIndex: 'netType',
        key: 'netType',
        width: '4%',
        render: text => text != null ? `${NetTypes[+text]}` : '--'
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        width: '8%',
        render: text => !!text
          ? text.substr(0, 4) === 'http' ? <a href={text} target='_blank'><i className='iconfont'>&#xe6ae;</i></a> : text
          : '--'
      },
      {
        title: 'ip',
        dataIndex: 'ip',
        key: 'ip',
        width: '8%',
        render: text => !!text ? <a href={'http://www.gpsspg.com/ip/?q=' + text} target='_blank'>{text}</a> : '--'
      },
      {
        title: '设备名',
        dataIndex: 'deviceName',
        key: 'deviceName',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '系统版本',
        dataIndex: 'osVersion',
        key: 'osVersion',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: 'app版本',
        dataIndex: 'vid',
        key: 'vid',
        width: '4%',
        render: text => isValidValue(text)
      },
      {
        title: '发生时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '错误日志',
        width: '4%',
        render: (record) => {
          return (
            <div style={{display: 'inline-flex'}}>
              {record.errorLog && <ErrorLogModal data={record}/>}
              <i className='iconfont' onClick={this.handleExport.bind(this, record.id)}title='导出'>&#59057;</i>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <IWBreadcrumb data={[{ name: '错误信息', link: null }]}/>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
          requestParams = {this.state.requestParams}
          _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.userErrorInfo.isLoading}
          className='table'
          onChange={this.handleTableChange}
          pagination={this.state.pagination}
          rowKey={record => record.id}
          scroll={{ y: this.state.scrollY}}
        />
      </div>
    );
  }
}

export default connect(
  state => ({login: state.login, other: state.other, userErrorInfo: state.userErrorInfo})
)(ErrorInfo);
