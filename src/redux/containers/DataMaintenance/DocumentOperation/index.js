/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-17 10:42:30
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-08-01 15:36:22
 * 文案操作
 */
import React from 'react';
import { connect } from 'react-redux';
import {Table, message} from 'antd';
import { OnlineStatus } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY, getCurrentPage, PAGESIZE } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import AddOrEditModal from './AddOrEditModal';
import { ShowMoreInfoModal, DmOnlineOrOffline, DmDeleteModal } from 'components';
import { IWBreadcrumb } from 'components';
import * as actions from 'actions';
import { DOCUMENT_OPERATION_LIST } from '@/api';
class DocumentOperation extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.documentOperation.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.documentOperation.requestParams || {currentPage: pagination.current, pageSize: PAGESIZE},
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
  fetchList = (params = {}) => {
    this.props.dispatch(actions.asyncAction('DOCUMENT_OPERATION_LIST', {
      url: DOCUMENT_OPERATION_LIST,
      method: 'get',
      params
    }))
      .then(res => {
        if (!res.data.success) {
          message.error(res.data.msg);
          return;
        }
        let data = res.data,
          pageData = data.data.pageData,
          currentPage = data.data.currentPage,
          totalRecords = data.data.totalRecords;
        console.log('data :', data, this.props.documentOperation.requestParams);
        if (data.success) {
          this.setState({
            list: pageData,
            pagination: getPagination({current: currentPage, total: totalRecords}),
            requestParams: params
          });
        }
      })
      .catch(() => {
        console.log('Oops errors!');
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
    const { requestParams, pagination } = this.state;
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
          return <DmOnlineOrOffline record ={record} callback = {this.handleClickQuery}/>;
        }
      },
      {
        title: '操作',
        width: '12%',
        render: record => {
          let url = `${DOCUMENT_OPERATION_LIST}/${record.id}/delete`;
          return (
            <div style={{display: 'inline-flex'}}>
              <AddOrEditModal isEdit = {true} record = {record} _this = {this} reload = {this.handleClickQuery}/>
              <DmDeleteModal record = {record}
                callback = {() => {this.fetchList(Object.assign(requestParams, {currentPage: getCurrentPage(pagination.current, pagination)})); }}
                content = '确认删除该文案？'
                url = {url}
              />
              <a href={record.url} target="blank">
                <i className="iconfont" title="获取链接">&#xe6ad;</i>
              </a>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <IWBreadcrumb data={[{ name: '文案操作', link: null }]}/>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
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
