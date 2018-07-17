/*
 * @Author: daijialing
 * @Date: 2018-07-05 17:38:03
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-10 15:49:07
 *购买历史
 */

import React from "react";
import { connect } from "react-redux";
import {Table, Popconfirm, message} from 'antd';
import { OrderTypes,OrderStatus } from "utils/dtoTypes";
import { isValidValue, getPagination, getTableScrollY,getAmount } from "utils/util";
import ConditionsOfQuery from "./ConditionsOfQuery";
import { MultiLineText } from "components";
import { USER_PURCHASE_HISTORY_LIST_EXPORT } from "@/api";

import * as actions from "actions";

class PurchaseHistory extends React.Component{
  constructor(props) {
    super(props);
    console.log('props :', props);
    const pagination = getPagination(props.userPurchaseHistory.pagination || {});
    this.state = {
      list: [],
      pagination,
      requestParams: props.userPurchaseHistory.requestParams || {currentPage: pagination.current},
      scrollY: 0
    }
  }

  componentWillMount() {
    const {requestParams} = this.state;
    console.log('requestParams :', requestParams);
    this.fetchList(requestParams);
  }
  componentDidMount() {
    this.setState({
        scrollY: getTableScrollY()
    })
  }
  fetchList = (param = {}) => {
    this.props.dispatch(actions.userPurchaseHistoryList(param))
    .then(res => {
      const data = res.data;
      console.log('data :', data,this.props.userPurchaseHistory.requestParams);
      if(data.success){
        this.setState({
          list: data.data.pageData,
          pagination: getPagination({current: data.data.currentPage,total: data.data.totalRecords}),
          requestParams: this.props.userPurchaseHistory.requestParams
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
  // 是否显示 退款按钮
  isShow = (payTime)=>{
    const newPayTime = new Date(payTime).valueOf(),
        todayStart = new Date(new Date().setHours(0, 0, 0, 0)).valueOf(),
        todayEnd = new Date(new Date().setHours(23,59,59,59)).valueOf();

    if(newPayTime >= todayStart && newPayTime <= todayEnd){
        return true;
    }
    return false;
  }
  // 退款
  refund = (id) => {
    this.props.dispatch(actions.userPurchaseHistoryItemRefund(id))
    .then(res => {
      if(res.data.success){
        message.success('退款成功');
        this.handleClickQuery()
      }else message.error(res.data.msg || '退款失败')
    })
  }

  // 导出
  handleExport = () => {
    let url =`${USER_PURCHASE_HISTORY_LIST_EXPORT}?download=true`,
      requestParams = this.state.requestParams;
    for (let i in  requestParams) {
        url += `&${i}=${requestParams[i]}`;
    }
    console.log("url----",url,requestParams);
    // return;
    window.location.href = url;
  }
  render(){
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'id',
        key: 'id',
        width: '6%',
        render: text => isValidValue(text)
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
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '10%',
        render:  text => !!text  ? <MultiLineText text={text}/> : "--"
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '12%',
        render: text => isValidValue(text)
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        width: '6%',
        render: text => text != null ? `${OrderTypes[+text]}` : `--`
      },
      {
        title: '商家名',
        dataIndex: 'sellerName',
        key: 'sellerName',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '交易金额(元)',
        dataIndex: 'amount',
        key: 'amount',
        width: '6%',
        render: text => getAmount(text)
      },
      {
        title: '实付金额(元)',
        dataIndex: 'payAmount',
        key: 'payAmount',
        width: '6%',
        render: text => getAmount(text)
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '6%',
        render: text => {
            return text != null ? `${OrderStatus[+text]}`:`--`
        }
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '支付时间',
        dataIndex: 'payTime',
        key: 'payTime',
        width: '8%',
        render: text => isValidValue(text)
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: '6%',
        render: text => isValidValue(text)
      },
      {
        title: '操作',
        key: 'operation',
        width: '6%',
        render: (text, record) => {
          return this.isShow(record.payTime) ? (
            <div>
              <Popconfirm placement="topRight"
                title={
                  <div>
                    <div>是否退款?</div>
                    <div style={{width: 250}}>用户实付金额会退还到用户书链账户,如支付时包含优惠券，优惠券不会退。</div>
                  </div>
                }
                onConfirm = {this.refund.bind(this, record.id)}
              >
                <i className="iconfont" title="退款" style={{color: "#3ca6fe", cursor: "pointer"}}>&#xe7a9;</i>
              </Popconfirm>
            </div>
          ) : null
        }
      }
    ];
    return(
      <div>
        <ConditionsOfQuery onChange={this.onChange}
            callbackParent={this.selectChange}
            onClick={this.handleClickQuery}
            handleExport={this.handleExport}
            requestParams = {this.state.requestParams}
            _this = {this}
        />
        <Table columns={columns}
          dataSource={this.state.list}
          loading={this.props.userPurchaseHistory.isLoading}
          className="table"
          onChange={this.handleTableChange}
          pagination={this.state.pagination}
          rowKey={record => record.id}
          scroll={{ y: this.state.scrollY}}
        />
      </div>
    )
  }
}

export default connect(
  state => ({login: state.login, other: state.other,userPurchaseHistory: state.userPurchaseHistory})
)(PurchaseHistory);
