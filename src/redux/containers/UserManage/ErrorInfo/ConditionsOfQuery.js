/**
 * Created by admin on 2017/1/9.
 * 用户管理/基本信息
 */
import React from 'react';
import { Row, Col, Form, Select, Input  } from 'antd';
import { FormInput, FormSelect, FormDate } from '@/redux/components/FormItems';

const Option = Select.Option,
  FormItem = Form.Item;

class ConditionsOfQuery extends React.Component {
  getResType(value) {
    this.props.callbackParent({resType: value});
    this.props.onClick();
  }
  getAppType(value) {
    this.props.callbackParent({
      appType: value
    });
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
    const formLayout = { labelCol: {span: 7}, wrapperCol: {span: 17 }},
      {requestParams} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Form horizontal='true' onChange={this.props.onChange} className='conditionForm'>
        <Row style={{padding: '10px 0'}}>
        </Row>
        <Row type='flex' justify='start' align='start'>
          <Col span={6}>
            <FormItem label='用户编号' {...formLayout} >
              {
                getFieldDecorator('userId', {
                  initialValue: requestParams.userId
                })(
                  <Input placeholder='请输入用户编号' name='userId'  onPressEnter={this.props.onClick}/>
                )
              }

            </FormItem>
          </Col>
          <Col span={6}>
            <FormInput labelName='版本号'
              formLayout = {formLayout}
              inputName = 'vid'
              placeholder = '请输入版本号'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.userName }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='资源ID'
              formLayout = {formLayout}
              inputName = 'resId'
              placeholder = '请输入资源ID'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.resId }
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='资源类型'
              formLayout = {formLayout}
              defaultValue={requestParams.appType || ''}
              onChange = { this.getResType.bind(this) }
              defaultOption = {<Option value=''>请选择资源类型</Option>}
              typesObj = {{1: '视频', 2: '音频', 24: '直播'}}
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='appType'
              formLayout = {formLayout}
              defaultValue={requestParams.appType || ''}
              onChange = { this.getAppType.bind(this) }
              defaultOption = {<Option value=''>请选择appType</Option>}
              typesObj = {{1: 'ios', 2: 'android'}}
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
            <FormDate labelName='截止日期'
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
ConditionsOfQuery = Form.create()(ConditionsOfQuery);
export default ConditionsOfQuery;
