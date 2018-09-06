import React, {Component  } from 'react';
import { connect } from 'react-redux';
import {Table, message} from 'antd';
import { isValidValue, getPagination, getTableScrollY,  PAGESIZE } from 'utils/util';
import * as actions from 'actions';
import { PUSH_MANAGEMENT_LIST } from '@/api';
import { PushTypes, PushStatus } from 'utils/dtoTypes';
import { IWBreadcrumb } from 'components';
import AddOrEditModal from './AddOrEditModal';


class PushManage extends Component {
  constructor(props) {
    super(props);
    const pagination = getPagination(props.pushManage.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.pushManage.requestParams || {currentPage: pagination.current, pageSize: PAGESIZE},
      scrollY: 0
    };
  }

  componentDidMount() {
    this.setState({
      scrollY: getTableScrollY()
    });
    this.fetchList();
  }

  fetchList = (params = {}) => {
    this.props.dispatch(actions.asyncAction('PUSH_MANAGEMENT_LIST', {
      url: PUSH_MANAGEMENT_LIST,
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
        console.log('data :', data, this.props.pushManage.requestParams);
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

  render() {
    const columns = [
      {
        title: '推送编号',
        dataIndex: 'id',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '任务类型',
        dataIndex: 'bizType',
        width: '8%',
        render: text => text != null ? PushTypes[+text] : '--'
      },
      {
        title: '内容',
        dataIndex: 'content',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '提示',
        dataIndex: 'tips',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '过期时间',
        dataIndex: 'invalidTime',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '创建人',
        dataIndex: 'userName',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '8%',
        render: text => text != null ?  PushStatus[+text] : '--'
      },
      {
        title: '操作',
        width: '8%',
        render: reocrd => {

        }
      }
    ];
    return (
      <div>
        <IWBreadcrumb data={[{ name: '推送管理', link: null }]}/>
        <AddOrEditModal isEdit={false} record={{}} _this={this}/>
        <Table columns = {columns}
          dataSource={this.state.list}
          loading={this.props.pushManage.isLoading}
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
  state => ({login: state.login, other: state.other, pushManage: state.pushManage})
)(PushManage);
