/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-10 16:36:32
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-25 17:01:36
 * 学习卡
 */


import React from 'react';
import { connect } from 'react-redux';
import {Table} from 'antd';
import { UserBookStatus } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import { IWBreadcrumb } from 'components';
import * as actions from 'actions';

class BookSelf extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.userBookSelf.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.userBookSelf.requestParams || {currentPage: pagination.current},
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
    this.props.dispatch(actions.userBookSelfList(param))
      .then(res => {
        const data = res.data;
        console.log('data :', data, this.props.userBookSelf.requestParams);
        if (data.success) {
          this.setState({
            list: data.data.pageData,
            pagination: getPagination({current: data.data.currentPage, total: data.data.totalRecords}),
            requestParams: this.props.userBookSelf.requestParams
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
        title: '记录编号',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '书籍编号',
        dataIndex: 'bookId',
        key: 'bookId',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: '20%',
        render: text => isValidValue(text)
      },
      {
        title: '书名',
        dataIndex: 'bookName',
        key: 'bookName',
        width: '20%',
        render: text => isValidValue(text)
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '8%',
        render: text => text != null ? `${UserBookStatus[+text]}` : '--'
      },
      {
        title: '首次加入时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: '14%',
        render: text => isValidValue(text)
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
        width: '14%',
        render: text => isValidValue(text)
      }
    ];
    return (
      <div>
        <IWBreadcrumb data={[{ name: '书架', link: null }]}/>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
          requestParams = {this.state.requestParams}
          _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.userBookSelf.isLoading}
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
  state => ({login: state.login, other: state.other, userBookSelf: state.userBookSelf})
)(BookSelf);
