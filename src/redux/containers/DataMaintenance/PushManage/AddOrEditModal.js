/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-25 17:46:19
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-30 11:10:58
 */

import React from 'react';
import {Modal, Button, Form, Input, message, Select} from 'antd';
import { DOCUMENT_OPERATION_LIST } from '@/api';
import * as actions from 'actions';
const FormItem = Form.Item;
const Option = Select.Option;
class AddOrEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });

  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }
  onOk = () => {
    const {_this, record, isEdit} = this.props;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) return;

      const params = Object.assign({}, values);
      _this.props.dispatch(actions.asyncAction('DOCUMENT_OPERATION_UPDATE', {
        url: isEdit ? `${DOCUMENT_OPERATION_LIST}/${record.id}` : DOCUMENT_OPERATION_LIST,
        params
      })).then(res => {
        console.log('res :', res);
        if (res.data.success) {
          this.props.reload();
          message.success('创建成功');
          this.onCancel();
        } else
          message.error(res.data.msg);
      });

    });
  }
  render() {
    const {isEdit, record, _this} = this.props;
    const {getFieldDecorator} = this.props.form;
 
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 }
    };
    return (
      <div className='conditionForm'>
        {
          isEdit
            ?  <i className='iconfont' title='编辑' onClick={this.showModal}>&#58980;</i>
            :  <Button type='primary' onClick={this.showModal} style={{margin: 5}}>新增推送</Button>
        }
        <Modal visible={this.state.visible}
          title = {isEdit ? '编辑推送' : '新增推送'}
          onCancel = {this.onCancel}
          key = {record.id || 0}
          width = {800}
          footer = {[
            <Button onClick = {this.onCancel}>取消</Button>,
            <Button onClick = {this.onOk} loading = {false}  type="primary">确定</Button>
          ]}
          style = {{top: 10}}
        >
          <Form style={{maxHeight: window.innerHeight - 200, overflowY: 'auto'}}>
          
            <FormItem {...formItemLayout} label="推送编号" hasFeedback>
              {
                getFieldDecorator('id', {
                  initialValue: record.id
                })(
                  <Input disabled={true}/>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="推送类型" hasFeedback>
              {
                getFieldDecorator('bizType', {
                  rules: [{required: true, message: '请选择推送类型'}],
                  initialValue: record.bizType
                })(
                  <Select>
                    <Option value='5' key="推送书籍">推送书籍</Option>
                    <Option value='6' key="链接地址">推送链接</Option>
                    <Option value='7' key="apptextcode">推送apptext</Option>
                    <Option value='11' key="course">推送课程</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="名称" hasFeedback>
              {
                getFieldDecorator('code', {
                  rules: [{required: true, message: '值不能为空'}],
                  initialValue: record.code
                })(
                  <Input placeholder="请输入名称" name="code"/>
                )
              }
            </FormItem>
      
            <FormItem label="推送内容" {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('content', {
                  rules: [{required: true, message: '值不能为空'}],
                  initialValue: record.content
                })(
                  <Input placeholder="请输入推送内容"/>
                )
              }
            </FormItem>
            <FormItem label="提示语" {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('tips', {
                  rules: [{required: true, message: '值不能为空'}],
                  initialValue: record.tips
                })(
                  <Input placeholder="请输入提示语"/>
                )
              }
            </FormItem>
            <FormItem label="缩略图" {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('thumbnails', {
                  rules: [{required: true, message: '值不能为空'}],
                  initialValue: record.tips
                })(
                  <Input placeholder="请输入提示语"/>
                )
              }
            </FormItem>
      
          </Form>
          
        </Modal>
      </div>
    );
  }
}
AddOrEditModal = Form.create()(AddOrEditModal);
export default AddOrEditModal;
