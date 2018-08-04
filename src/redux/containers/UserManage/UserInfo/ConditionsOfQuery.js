/**
 * Created by admin on 2017/1/9.
 * 用户管理/基本信息
 */
import React from 'react';
import { Row, Col, Form, Select  } from 'antd';
import { AppTypes, ChannelTypes } from 'utils/dtoTypes';
import { FormInput, FormSelect, FormDate } from '@/redux/components/FormItems';
import CreateAccount from './CreateAccount';

const Option = Select.Option;

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
    const formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17 }
      },
      {requestParams} = this.props;
    return (
      <Form horizontal='true' onChange={this.props.onChange} className='conditionForm'>
        <Row style={{padding: '10px 0'}}>
          <CreateAccount onClick={this.props.onClick}
            reload={this.props.reload}
            _this = {this.props._this}
          />
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
            <FormInput labelName='用户名'
              formLayout = {formLayout}
              inputName = 'userName'
              placeholder = '请输入用户名'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.userName }
            />
          </Col>
          <Col span={6}>
            <FormInput labelName='手机号'
              formLayout = {formLayout}
              inputName = 'mobile'
              placeholder = '请输入手机号'
              onChange = { this.props.onChange }
              onPressEnter = { this.props.onClick }
              defaultValue = { requestParams.mobile }
            />
          </Col>
          <Col span={6}>
            <FormSelect labelName='注册平台'
              formLayout = {formLayout}
              defaultValue={requestParams.appType || ''}
              onChange = { this.getPlatform.bind(this) }
              defaultOption = {<Option value=''>请选择注册平台</Option>}
              typesObj = {AppTypes}
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
