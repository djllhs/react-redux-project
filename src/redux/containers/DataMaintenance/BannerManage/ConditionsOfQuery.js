/*
 * @Author: daijialing
 * @Date: 2018-07-10 10:28:44
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-09-06 11:46:48
 * 查询条件组件
 */

import React from 'react';
import { Row, Col, Form, Select  } from 'antd';
import { BannerEffectiveStatus } from 'utils/dtoTypes';
import {  FormSelect } from '@/redux/components/FormItems';
import AddOrEditModal from './AddOrEditModal';
const Option = Select.Option;

class ConditionsOfQuery extends React.Component {
  getLocations(value) {
    this.props.callbackParent({location: value});
    this.props.onClick();
  }
  getStatus(value) {
    this.props.callbackParent({effectiveStatus: value});
    this.props.onClick();
  }
  render() {
    const formLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 17 }
    };
    const {_this, locations} = this.props;
    return (
      <Form horizontal='true' className='conditionForm'>
        <Row style={{padding: '10px 0'}}>
          <AddOrEditModal isEdit = {false} record = {{}}
            _this = {_this} reload = {this.props.onClick}
            locations = {this.props.locations}
            actions = {this.props.actions}
          />
        </Row>
        <Row type='flex' justify='start' align='start'>
          <Col span={6}>
            <FormSelect labelName='位置'
              formLayout = {formLayout}
              defaultValue={''}
              onChange = { this.getLocations.bind(this) }
              defaultOption = {<Option value=''>请选择位置</Option>}
              typesObj = {locations}
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='上线情况'
              formLayout = {formLayout}
              defaultValue={''}
              onChange = { this.getStatus.bind(this) }
              defaultOption = {<Option value=''>请选择上线情况</Option>}
              typesObj = {BannerEffectiveStatus}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ConditionsOfQuery;
