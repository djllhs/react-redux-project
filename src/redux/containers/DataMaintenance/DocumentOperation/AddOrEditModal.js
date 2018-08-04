/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-25 17:46:19
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-30 11:10:58
 */

import React from 'react';
import {Modal, Button, Form, Input, message} from 'antd';
import { IWBraftEditor } from 'components';
import { DOCUMENT_OPERATION_LIST } from '@/api';
import * as actions from 'actions';
const FormItem = Form.Item;

class AddOrEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showContentError: false // 显示 content 错误提示
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
      const content = this.iWBraftEditor.isEmpty() ? null :  this.iWBraftEditor.getContent();

      this.setState({
        showContentError: !content
      });
      if (!content) return;

      const params = Object.assign({}, values, {content});
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
    const {showContentError} = this.state;
    const {isEdit, record, _this} = this.props;
    const {getFieldDecorator} = this.props.form;
    const editorProps = {
      contentId: 0,
      initialContent: record.content || null
    };
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        {
          isEdit
            ?  <i className='iconfont' title='编辑' onClick={this.showModal}>&#58980;</i>
            :  <Button type='primary' onClick={this.showModal}>新增文案</Button>
        }
        <Modal visible={this.state.visible}
          title = {isEdit ? '编辑文案' : '新增文案'}
          onCancel = {this.onCancel}
          key = {record.id || 0}
          width = {800}
          footer = {[
            <Button onClick = {this.onCancel}>取消</Button>,
            <Button onClick = {this.onOk} loading = {_this.props.documentOperation.isLoading}  type="primary">确定</Button>
          ]}
        >
          <Form horizontal="true">
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
            <FormItem label="标题" {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('title', {
                  rules: [{required: true, message: '值不能为空'}],
                  initialValue: record.title
                })(
                  <Input placeholder="请输入标题" name="title"/>
                )
              }
            </FormItem>
          </Form>
          <IWBraftEditor {...editorProps} ref={ref => this.iWBraftEditor = ref}/>
          {showContentError && <p style={{color: 'red'}}>值不能为空</p>}
        </Modal>
      </div>
    );
  }
}
AddOrEditModal = Form.create()(AddOrEditModal);
export default AddOrEditModal;
