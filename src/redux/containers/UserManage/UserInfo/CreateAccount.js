/* global console*/
/*
 * @Author: daijialing
 * @Date: 2018-07-06 16:24:44
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-27 18:06:47
 * 创建账户
 */

import React from 'react';
import { Col, Button, Modal, Form, Input, message } from 'antd';
import * as actions from 'actions';
const FormItem = Form.Item;
const createForm = Form.create;


class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      success: false,
      passwordDirty: false, // antd Form表单校验
      loading: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
    this.props.form.resetFields();
    console.log('this.props :', this.props);

  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit = (e) => {
    const {_this} = this.props;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) return;
      this.setState({loading: true});
      _this.props.dispatch(actions.userBasicInfoCreateUser(values))
        .then(res => {
          this.setState({loading: false});
          console.log('res :', res);
          if (res.data.success) {
            this.props.onClick();
            message.success('创建成功');
            this.handleCancel();
          } else
            message.error(res.data.msg);

        });
    });
  }
  /**
   * 验证手机号格式
   * @param rule
   * @param value
   * @param callback
   */
  mobileRule = (rule, value, callback) => {
    let pattern = /0?(12|13|14|15|16|17|18|19)[0-9]{9}/;
    if (!value)
      callback();
    else {
      if (!pattern.test(value))
        callback([new Error('抱歉，你输入的手机格式不正确')]);
      else
        callback();

    }
  }

  handlePasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }
  /**
   * 密码验证
   * @param rule
   * @param value
   * @param callback
   */
  checkPass = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.passwordDirty)
      form.validateFields(['rePasswd'], { force: true });

    callback();
  }
  /**
   * 验证两次输入的密码是否相同
   * @param rule
   * @param value
   * @param callback
   */
  checkPass2 = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;/* 获取一个输入控件的值*/
    if (value && value !== getFieldValue('password'))
      callback('两次输入密码不一致！');
    else
      callback();

  }
  render() {
    const { getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    return (
      <Col  span={12}>
        <Button type='primary' onClick={this.props.onClick} style={{marginLeft: 10}}>查询</Button>
        <Button type='primary' onClick={this.showModal} style={{marginLeft: 10}}>创建用户</Button>
        <Modal title='创建用户' visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' type='ghost' onClick={this.handleReset}>重置</Button>,
            <Button key='submit' type='primary'
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >提交</Button>
          ]}
        >
          <Form horizontal='true' >
            <FormItem {...formItemLayout} label='手机号' hasFeedback>
              {
                getFieldDecorator('mobile', {
                  rules: [
                    { required: true, message: '手机号为11位'},
                    { validator: this.mobileRule }
                  ]
                })(<Input placeholder='请输入手机号' maxLength={11}/>)
              }

            </FormItem>
            <FormItem {...formItemLayout} label='密码' hasFeedback>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, whitespace: true, message: '请填写密码' },
                    { validator: this.checkPass }
                  ]
                })(<Input type='password' placeholder='请输入密码'
                  onBlur={this.handlePasswordBlur}/>)
              }

            </FormItem>
            <FormItem {...formItemLayout} label='确认密码' hasFeedback>
              {
                getFieldDecorator('rePasswd', {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入确认密码'
                  }, {
                    validator: this.checkPass2
                  }]
                })(<Input type='password' placeholder='请输入确认密码'/>)
              }

            </FormItem>
          </Form>
        </Modal>
      </Col>
    );
  }
}
CreateAccount = createForm()(CreateAccount);

export default CreateAccount;
