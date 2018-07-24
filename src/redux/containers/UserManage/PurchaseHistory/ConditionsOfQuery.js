/*
 * @Author: daijialing
 * @Date: 2018-07-10 10:28:44
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-24 15:38:49
 * 查询条件组件
 */

import React from 'react';
import { Row, Col, Form, Select, Button  } from 'antd';
import { OrderTypes } from 'utils/dtoTypes';
import { FormInput, FormSelect, FormDate } from '@/redux/components/FormItems';

const Option = Select.Option;

class ConditionsOfQuery extends React.Component {
  getOrderType(value) {
    this.props.callbackParent({orderType: value});
    this.props.onClick();
  }
  getStartDate(value, dateString) {
    this.props.callbackParent({
      startGmtCreate: dateString
    });
    this.props.onClick();
  }
  getEndDate(value, dateString) {
    this.props.callbackParent({
      endGmtCreate: dateString
    });
    this.props.onClick();
  }

  render() {
    const formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17 }
      },
      {requestParams} = this.props;
    return (
      <Form horizontal='true' onChange={this.props.onChange} className='conditionForm'>
        <Row style={{padding: '10px 0'}}>
          <Button type='primary' onClick={this.props.handleExport}>导出</Button>
        </Row>
        <Row type='flex' justify='start' align='start'>
          <Col span={6}>
            <FormInput labelName='用户编号'
              formLayout = {formLayout}
              inputName = 'userId'
              placeholder = '请输入用户编号'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.userId }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='订单编号'
              formLayout = {formLayout}
              inputName = 'id'
              placeholder = '请输入订单编号'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.id }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='商家名'
              formLayout = {formLayout}
              inputName = 'sellerName'
              placeholder = '请输入商家名'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.sellerName }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='书籍名'
              formLayout = {formLayout}
              inputName = 'bookName'
              placeholder = '请输入书籍名'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.bookName }
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='订单类型'
              formLayout = {formLayout}
              defaultValue={requestParams.orderType || ''}
              onChange = { this.getOrderType.bind(this) }
              defaultOption = {<Option value=''>请选择订单类型</Option>}
              typesObj = {OrderTypes}
            />
          </Col>
          <Col span={6}>
            <FormDate labelName='开始日期'
              formLayout = {formLayout}
              showTime = {true}
              format = 'YYYY-MM-DD HH:mm:ss'
              dateStyle = {{ width: '100%' }}
              onChange = {this.getStartDate.bind(this)}
              defaultValue = { requestParams.startGmtCreate }
            />
          </Col>
          <Col span={6}>
            <FormDate labelName='结束日期'
              formLayout = {formLayout}
              showTime = {true}
              format = 'YYYY-MM-DD HH:mm:ss'
              dateStyle = {{ width: '100%' }}
              onChange = {this.getEndDate.bind(this)}
              defaultValue = { requestParams.endGmtCreate }
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ConditionsOfQuery;
