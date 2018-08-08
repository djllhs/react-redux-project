/* global console */
/*
 * @Author: daijialing
 * @Date: 2018-07-24 18:28:17
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-25 09:22:25
 * 数据维护 上下线
 */
import React from 'react';
import { Button, Modal, message } from 'antd';
import {  postData } from 'utils/fetchData';

const DmOnlineOrOffline = (props) => {
  const requestType = !props.record.status ? '/online' : '/offline';
  const url = `${props.api}/${props.record.id}${requestType}`,
    tips = !props.record.status ? `${props.moduleName}上线成功` : `${props.moduleName}下线成功`,
    btn = props.record.status ? '点击下线' : '点击上线',
    icon = props.record.status ? 'delete' : 'check',
    color = props.record.status ? 'gray' : 'green',
    content = props.record.status ? `确定使该${props.moduleName}下线？` : `确定使该${props.moduleName}上线？`;

  return (
    <Button type = 'ghost' icon = {icon} style = {{color}} onClick = {() => {
      Modal.confirm({
        title: props.title || null,
        content,
        onOk: () => {
          postData(`${url}`, {})
            .then((res) => {
              console.log('res :', res);
              if (!res.data)
                message.error(res.data.msg || '操作失败，请重试！');
              else {
                props.callback && props.callback();
                message.success(tips);
              }
            });
        }
      });
    }}>{btn}</Button>
  );
};


export default DmOnlineOrOffline;
