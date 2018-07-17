/*
 * @Author: daijialing
 * @Date: 2018-07-17 09:56:05
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-17 10:02:56
 * 展示更多的信息
 */
import React, {
  Component
} from "react";
import {
  Modal
} from "antd";
import './index.css';

export default class ShowMoreInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  }
  onCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible } = this.state,
      { record, text, type} = this.props;
    return (
    <div>
      <div className = "twoLine" style = {{cursor: "pointer",color: '#3ca6fe'}}
        onClick = {this.showModal}>
        {text == null ? `无` : text}
      </div>
      <Modal title = {null} visible = {visible}
        onCancel = { this.onCancel.bind(this) }
        footer = { null }
        key = { record.id }
        style = {{ top: 15 }}>
        <br/>
        {
          type === "richText"
          ? <div dangerouslySetInnerHTML = {{__html: text}} > </div>
          :<div className="info_wrap" >{this.props.text}</div>
        }
      </Modal>
    </div>
    )
  }
}
