/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-24 18:56:31
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-25 09:22:08
 * 数据维护 删除
 */
import React from 'react';
import { Modal, message } from 'antd';
import { DOCUMENT_OPERATION_LIST } from '@/api';
import {  postData } from 'utils/fetchData';

const DmDeleteModal = (props) => {
  return (
    <i className="iconfont" onClick={() => {
      Modal.confirm({
        title: null,
        content: props.content,
        onOk() {
          let url = `${DOCUMENT_OPERATION_LIST}/${props.record.id}/delete`;
          postData(`${url}`, {})
            .then((res) => {
              console.log('res :', res);
              if (!res.data)
                message.error(res.data.msg || '操作失败，请重试！');
              else {
                props.callback && props.callback();
                message.success('删除成功');
              }
            });
        }
      });
    }}>&#xe66b;</i>
  );
};

export default DmDeleteModal;
