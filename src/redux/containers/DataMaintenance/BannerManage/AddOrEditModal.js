/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-25 17:46:19
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-08-02 09:38:03
 */

import React from 'react';
import {Modal, Button, Form, Input, message, Select, InputNumber, DatePicker} from 'antd';
import {forms, IWUpload, DmSecondaryCategory} from 'components';
import { BANNER_MANAGEMENT_LIST } from '@/api';
import * as actions from 'actions';
import {LoginAppTypes} from 'utils/dtoTypes';
import {YMDHMS, getKeyByValue, uploadFile} from 'utils/util';
import moment from 'moment';
const FormItem = Form.Item;

const AppTypes = Object.assign({'': '全部'}, LoginAppTypes, {3: undefined});
class AddOrEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: [],
      isShowUpload: true // 是否显示上传
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
    if (this.props.isEdit) {
      const locationNumber = getKeyByValue(this.props.locations, this.props.record.locationString),
        isShowUpload = locationNumber !== 151 && locationNumber !== 161;
      this.setState({
        fileList: [{
          uid: this.props.record.id,
          status: 'done',
          url: this.props.record.imgUrl,
          thumbUrl: this.props.record.imgUrl
        }],
        isShowUpload
      });
    }

  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }
  onOk = () => {
    const {_this, record, isEdit} = this.props;
    this.props.form.validateFields((errors, values) => {
      console.log('values :', values);
      if (!!errors) return;

      if (values.startTime)
        values.startTime = values.startTime.format(YMDHMS);
      if (values.endTime)
        values.endTime = values.endTime.format(YMDHMS);
      console.log('values :', values);
      // return;
      _this.props.dispatch(actions.asyncAction('BANNER_MANAGEMENT_LIST', {
        url: isEdit ? `${BANNER_MANAGEMENT_LIST}/${record.id}` : BANNER_MANAGEMENT_LIST,
        params: values
      })).then(res => {
        console.log('res :', res);
        if (res.data.success) {
          this.props.reload();
          message.success(isEdit ? '创建成功' : '保存成功');
          this.onCancel();
        } else
          message.error(res.data.msg);
      });

    });
  }

  handleLocationChange = value => {
    this.setState({
      isShowUpload: value !== 151 && value !== 161
    });
  }

  handleImgChange = (info) => {
    if (info.file.size / Math.pow(1024, 2) > 2) {
      message.warning('图片大小不能超过2M，请重新上传');
      return;
    }
    const { setFieldsValue } = this.props.form;
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    uploadFile(info);
    if (info.file.status === 'done')
      setFieldsValue({'imgUrl': info.file.response.data});

    this.setState({fileList: fileList});
  }

  handleImgRemove = () => {
    let {setFieldsValue} = this.props.form;
    setFieldsValue({'imgUrl': null});
    this.setState({
      fileList: []
    });
  }


  render() {
    const {isEdit, record, _this} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        {
          isEdit
            ?  <i className='iconfont' title='编辑' onClick={this.showModal}>&#58980;</i>
            :  <Button type='primary' onClick={this.showModal}>新增</Button>
        }
        <Modal visible={this.state.visible}
          title = {isEdit ? '编辑banner' : '新增banner'}
          onCancel = {this.onCancel}
          key = {record.id || 0}
          width = {800}
          footer = {[
            <Button onClick = {this.onCancel}>取消</Button>,
            <Button onClick = {this.onOk} loading = {_this.props.bannerManage.isLoading}  type='primary'>确定</Button>
          ]}
        >
          <Form horizontal='true' style = {{maxHeight: window.innerHeight - 310, overflowY: 'auto'}}>
            <FormItem {...formItemLayout} label='名称' hasFeedback>
              {
                getFieldDecorator('name', {
                  rules: [{required: true, message: '值不能为空', whitespace: true}],
                  initialValue: record.name
                })(
                  <Input placeholder='请输入名称'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='位置' hasFeedback>
              {
                getFieldDecorator('location', {
                  rules: [{required: true, message: '请选择位置'}],
                  initialValue: getKeyByValue(this.props.locations, record.locationString),
                  onChange: this.handleLocationChange
                })(
                  <Select placeholder= '请选择位置' >
                    {this.props.locations && forms.renderOptions(this.props.locations)}
                  </Select>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='图片'  style = {{display: this.state.isShowUpload ? 'block' : 'none'}}>
              {
                <IWUpload getFieldDecorator = {this.props.form.getFieldDecorator}
                  paramName = 'imgUrl'
                  initialValue = {record.imgUrl}
                  handleImgChange = {this.handleImgChange}
                  handleImgRemove = {this.handleImgRemove}
                  fileList = {this.state.fileList}
                  isRequired = {this.state.isShowUpload}
                />
              }
            </FormItem>

            <FormItem label='顺序' {...formItemLayout} hasFeedback>
              {
                getFieldDecorator('orders', {
                  initialValue: record.orders
                })(
                  <InputNumber min={0}/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='动作' hasFeedback>
              {
                getFieldDecorator('actionType', {
                  rules: [{required: true, message: '请选择动作'}],
                  initialValue: getKeyByValue(this.props.actions, record.actionTypeString)
                })(
                  <Select placeholder= '请选择动作' >
                    {this.props.actions && forms.renderOptions(this.props.actions)}
                  </Select>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='参数' hasFeedback>
              {
                getFieldDecorator('actionContent', {
                  initialValue: record.actionContent
                })(
                  <Input placeholder='不同动作对应不同参数'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='app平台' hasFeedback>
              {
                getFieldDecorator('appPlatform', {
                  initialValue: record.appPlatform ? record.appPlatform + '' : ''
                })(
                  <Select placeholder= '请选择app平台' >
                    {forms.renderOptions(AppTypes)}
                  </Select>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='app版本号' hasFeedback>
              {
                getFieldDecorator('appVid', {
                  initialValue: record.appVid
                })(
                  <Input placeholder='多个数字用逗号隔开，具体值寻开发'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='app渠道' hasFeedback>
              {
                getFieldDecorator('appChannel', {
                  initialValue: record.appChannel
                })(
                  <Input placeholder='多个值用逗号隔开，具体值寻开发'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='用户列表' hasFeedback>
              {
                getFieldDecorator('userIds', {
                  initialValue: record.userIds
                })(
                  <Input.TextArea placeholder='限于指定用户id访问,用,号分隔。如:23,1098,22' rows = '2'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='商家id' hasFeedback>
              {
                getFieldDecorator('sellerIds', {
                  initialValue: record.sellerIds
                })(
                  <Input.TextArea placeholder='输入商家id列表,用,号分隔。如:23,1024' rows = '2'/>
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='书籍id'>
              {
                getFieldDecorator('bookIds', {
                  initialValue: record.bookIds
                })(
                  <Input.TextArea placeholder='输入书籍id列表,用,号分隔。如：23,1024' rows = '2'/>
                )
              }
            </FormItem>

            <FormItem label='二级类目' {...formItemLayout} hasFeedback>
              <DmSecondaryCategory getFieldDecorator = {this.props.form.getFieldDecorator}
                paramName = 'catIds'
                initialValue = {record.catIds}
              />
            </FormItem>

            <FormItem {...formItemLayout} label='生效时间'>
              {
                getFieldDecorator('startTime', {
                  rules: [{
                    type: 'object'
                  }],
                  initialValue: record.startTime ? moment(record.startTime, YMDHMS) : null
                })(
                  <DatePicker showTime
                    format = {YMDHMS}
                    style={{ width: '100%'}}
                  />
                )
              }
            </FormItem>

            <FormItem {...formItemLayout} label='失效时间'>
              {
                getFieldDecorator('endTime', {
                  rules: [{
                    type: 'object'
                  }],
                  initialValue: record.endTime ? moment(record.endTime, YMDHMS) : null
                })(
                  <DatePicker showTime
                    format = {YMDHMS}
                    style={{ width: '100%'}}
                  />
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
