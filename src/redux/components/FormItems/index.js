/*
 * @Author: daijialing
 * @Date: 2018-07-06 14:39:25
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-08-01 15:57:52
 */

import React from 'react';
import {
  Select,
  Form,
  Input,
  DatePicker
} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;

// 下拉选项
export const renderOptions = (typesObj) => {
  const arr = [];
  for (let [key, value] of Object.entries(typesObj)) {
    const NewOption = <Option value = { key } key = { key } > { value} </Option>;
    arr.push(NewOption);
  }
  return arr;
};

// 输入表单组件
export const FormInput = (props) => {
  return (
    <FormItem label = { props.labelName } {...props.formLayout}>
      <Input name = { props.inputName }
        placeholder = { props.placeholder }
        onChange = { props.onChange }
        onPressEnter = { props.onPressEnter}
        defaultValue = { props.defaultValue }
      />
    </FormItem>
  );
};

// 下拉选择组件
export const FormSelect = (props) => {
  return (
    <FormItem label = { props.labelName } {...props.formLayout}>
      <Select defaultValue = {props.defaultValue }
        onChange = {props.onChange}
      >
        {props.defaultValue != null ? props.defaultOption : null}
        { renderOptions(props.typesObj)}
      </Select>
    </FormItem>
  );
};
// 时间组件
export const FormDate = (props) => {
  return (
    <FormItem label = { props.labelName } {...props.formLayout}>
      <DatePicker
        showTime = { props.showTime}
        format= { props.format }
        style={ props.dateStyle }
        onChange={ props.onChange }
        defaultValue = { props.defaultValue != null ? moment(props.defaultValue, props.format) : null }
      />
    </FormItem>
  );
};
