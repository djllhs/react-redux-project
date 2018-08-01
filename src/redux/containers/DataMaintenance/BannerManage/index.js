/*
 * @Author: daijialing
 * @Date: 2018-07-30 15:18:52
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-30 16:25:52
 * banner管理
 */
/* global console */

import React from 'react';
import { connect } from 'react-redux';
import {Table, message} from 'antd';
import { BannerEffectiveStatus } from 'utils/dtoTypes';
import { isValidValue, getPagination, getTableScrollY, getCurrentPage, PAGESIZE } from 'utils/util';
import ConditionsOfQuery from './ConditionsOfQuery';
import AddOrEditModal from './AddOrEditModal';
import { ShowMoreInfoModal, DmOnlineOrOffline, DmDeleteModal } from 'components';
import { IWBreadcrumb } from 'components';
import * as actions from 'actions';
import { BANNER_MANAGEMENT_LIST, BANNER_MANAGEMENT_LOCATIONS,  BANNER_MANAGEMENT_ACTIONS} from '@/api';
class BannerManage extends React.Component {
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.bannerManage.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.bannerManage.requestParams || {currentPage: pagination.current, pageSize: PAGESIZE},
      scrollY: 0,
      locations: {},
      actions: {}
    };
  }

  componentWillMount() {
    const {requestParams} = this.state;
    console.log('requestParams :', requestParams);
    this.fetchList(requestParams);
    this.fetchLocations();
    this.fetchActions();
  }
  componentDidMount() {
    this.setState({
      scrollY: getTableScrollY()
    });
  }
  fetchList = (params = {}) => {
    this.props.dispatch(actions.asyncAction('BANNER_MANAGEMENT_LIST', {
      url: BANNER_MANAGEMENT_LIST,
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
  fetchLocations = (params = {}) => {
    this.props.dispatch(actions.asyncAction('BANNER_MANAGEMENT_LOCATIONS', {
      url: BANNER_MANAGEMENT_LOCATIONS,
      method: 'get',
      params
    })).then((res) => {
      console.log('locations :', res);
      if (res.data.success) {
        this.setState({
          locations: res.data.data
        });
      }
    });
  }
  fetchActions = (params = {}) => {
    this.props.dispatch(actions.asyncAction('BANNER_MANAGEMENT_ACTIONS', {
      url: BANNER_MANAGEMENT_ACTIONS,
      method: 'get',
      params
    })).then((res) => {
      console.log('actions :', res);
      if (res.data.success) {
        this.setState({
          actions: res.data.data
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
    const { requestParams, pagination } = this.state;
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: '12%',
        render: text => isValidValue(text)
      },
      {
        title: '位置',
        dataIndex: 'locationString',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '图片',
        dataIndex: 'imgUrl',
        width: '6%',
        render: text => {
          return text != null ?
            <a href={text} target="_blank"><i className="iconfont">&#xe6ae;</i></a>
            : '--';
        }
      },
      {
        title: '顺序',
        dataIndex: 'orders',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '动作',
        dataIndex: 'actionTypeString',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '参数',
        dataIndex: 'actionContent',
        width: '12%',
        render: text => isValidValue(text)
      },
      {
        title: '上线情况',
        dataIndex: 'effectiveStatus',
        width: '8%',
        render: (text) => text != null ? BannerEffectiveStatus[+text] : '--'
      },
      {
        title: '生效时间',
        dataIndex: 'startTime',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '失效时间',
        dataIndex: 'endTime',
        width: '10%',
        render: text => isValidValue(text)
      },
      {
        title: '操作',
        width: '10%',
        render: record => {
          return (
            <div style={{display: 'inline-flex'}}>
              <AddOrEditModal isEdit = {true} record = {record} _this = {this} reload = {this.handleClickQuery}/>
              <DmDeleteModal record = {record}
                callback = {() => {this.fetchList(Object.assign(requestParams, {currentPage: getCurrentPage(pagination.current, pagination)})); }}
                content = '确认删除该文案？'
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
        <IWBreadcrumb data={[{ name: 'banner管理', link: null }]}/>
        <ConditionsOfQuery onChange={this.onChange}
          callbackParent={this.selectChange}
          onClick={this.handleClickQuery}
          _this = {this}
          locations = {this.state.locations}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.bannerManage.isLoading}
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
  state => ({login: state.login, other: state.other, bannerManage: state.bannerManage})
)(BannerManage);
