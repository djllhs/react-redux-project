/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-17 10:42:30
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-24 16:11:46
 * 文案操作
 */
import React from 'react';
import { connect } from 'react-redux';
import {Table} from 'antd';
import { OnlineStatus } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import { ShowMoreInfoModal } from 'components';

import * as actions from 'actions';

class DocumentOperation extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.documentOperation.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.documentOperation.requestParams || {currentPage: pagination.current},
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
    this.props.dispatch(actions.documentOperationList(param))
      .then(res => {
        const data = res.data;
        console.log('data :', data, this.props.documentOperation.requestParams);
        if (data.success) {
          this.setState({
            list: data.data.pageData,
            pagination: getPagination({current: data.data.currentPage, total: data.data.totalRecords}),
            requestParams: this.props.documentOperation.requestParams
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
        title: '名称',
        dataIndex: 'code',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: '20%',
        render: (text, record) => text != null
          ? <ShowMoreInfoModal text={text} record={record} type='richText'/>
          : '--'
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '8%',
        render: text => text != null ? OnlineStatus[+text] : '--'
      },
      {
        title: '浏览量',
        dataIndex: 'pv',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '管理',
        width: '10%',
        render: (record) => {

        }
      },
      {
        title: '操作',
        width: '12%',
        render: record => {

        }
      }
    ];
    return (
      <div>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
          requestParams = {this.state.requestParams}
          _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.documentOperation.isLoading}
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
  state => ({login: state.login, other: state.other, documentOperation: state.documentOperation})
)(DocumentOperation);
