/**
 * Created by admin on 2017/1/9.
 * 用户管理/基本信息
 */
import React from 'react';
import { Row, Col, Form, Select, Input  } from 'antd';
import { LoginAppTypes, ChannelTypes } from 'utils/dtoTypes';
import { FormInput, FormSelect, FormDate } from '@/redux/components/FormItems';

const Option = Select.Option,
  FormItem = Form.Item;

class ConditionsOfQuery extends React.Component {
  getChannel(value) {
    this.props.callbackParent({
      channel: value
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
  /**
   * 获取注册平台
   * @param  {[type]} value [注册平台]
   * @return {[type]}       [description]
   */
  getPlatform(value) {
    this.props.callbackParent({
      appType: value
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
            {/* <FormInput labelName='用户编号'
                  formLayout = {formLayout}
                  inputName = 'userId'
                  placeholder = '请输入用户编号'
                  onChange = { this.props.onChange }
                  onPressEnter = { this.props.onClick }
                  defaultValue = { requestParams.userId }
            /> */}
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
            <FormSelect labelName='登录平台'
              formLayout = {formLayout}
              defaultValue={requestParams.appType || ''}
              onChange = { this.getPlatform.bind(this) }
              defaultOption = {<Option value=''>请选择登录平台</Option>}
              typesObj = {LoginAppTypes}
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='登陆渠道'
              defaultValue={requestParams.channel || ''}
              defaultOption = {<Option value=''>请选择登陆渠道</Option>}
              typesObj = {ChannelTypes}
              onChange = { this.getChannel.bind(this) }
              formLayout = {formLayout}
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
