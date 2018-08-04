/*
 * @Author: daijialing
 * @Date: 2018-07-10 10:28:44
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-27 19:41:32
 * 查询条件组件
 */

import React from 'react';
import { Row, Col, Form, Select  } from 'antd';
import { OnlineStatus } from 'utils/dtoTypes';
import { FormInput, FormSelect, FormDate } from '@/redux/components/FormItems';
import AddOrEditModal from './AddOrEditModal';
const Option = Select.Option;

class ConditionsOfQuery extends React.Component {
  getStatus(value) {
    this.props.callbackParent({status: value});
    this.props.onClick();
  }
  render() {
    const formLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 17 }
    };
    const {_this} = this.props;
    return (
      <Form horizontal='true' className='conditionForm'>
        <Row style={{padding: '10px 0'}}>
          <AddOrEditModal isEdit = {false} record = {{}}  _this = {_this} reload = {this.props.onClick}/>
        </Row>
        <Row type='flex' justify='start' align='start'>
          <Col span={6}>
            <FormInput labelName='名称'
              formLayout = {formLayout}
              inputName = 'code'
              placeholder = '请输入名称'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='标题'
              formLayout = {formLayout}
              inputName = 'title'
              placeholder = '请输入标题'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='状态'
              formLayout = {formLayout}
              defaultValue={''}
              onChange = { this.getStatus.bind(this) }
              defaultOption = {<Option value=''>请选择状态</Option>}
              typesObj = {OnlineStatus}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ConditionsOfQuery;
