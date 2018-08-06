/*
 * @Author: daijialing
 * @Date: 2018-08-01 17:40:05
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-08-01 18:21:36
 */

import React from 'react';
// import PropTypes from 'prop-types';
import {Upload, Input, Button, Icon, message} from 'antd';
import { UPLOAD_FILE } from '@/api';
import './IWUpload.css';

class IWUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const {getFieldDecorator, paramName, isRequired, initialValue} = this.props;
    const uploadProps = {
      name: 'file',
      action: UPLOAD_FILE,
      onChange: this.props.handleImgChange,
      listType: 'picture',
      onRemove: this.props.handleImgRemove,
      beforeUpload(file) {
        const isPicture = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isPicture)
          message.error('只能上传图片文件哦！');
        return isPicture;
      }
    };
    return (
      <div>
        <Upload {...uploadProps} fileList={this.props.fileList}>
          <Button type='ghost'>
            <Icon type='upload'/> 点击上传
          </Button>
        </Upload>
        {
          getFieldDecorator(paramName, {
            rules: [{
              required: isRequired, message: '请上传图片'
            }],
            initialValue: initialValue
          })(
            <Input type='hidden'  className='imgInput'/>
          )
        }
      </div>
    );
  }
}
// IWUpload.propTypes = {
//   getFieldDecorator: PropTypes.func
// };
export default IWUpload;
