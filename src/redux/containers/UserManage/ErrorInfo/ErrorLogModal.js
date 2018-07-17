/**
 * Created by admin on 2017/1/9.
 */
import React from 'react';
import { Modal, Input} from 'antd';

/**
 * 查询详细信息对话框
 */
export default class ErrorLogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    showModal = ()=> {
        this.setState({visible: true})
    }
    onCancel = ()=> {
        this.setState({visible: false});
    }

    render() {
        return (
            <div>
                <i className="iconfont" onClick={this.showModal} title="查看错误日志">&#xe639;</i>
                <Modal visible={this.state.visible}
                       title="错误日志"
                       width={800}
                       onCancel={this.onCancel}
                       footer = {[]}
                       key = {this.props.data.id}
                >
                    {/* <pre style={{maxHeight: 600,overflowY: 'scroll'}}>{this.props.data.errorLog}</pre>
                 */}
                 <Input.TextArea value={this.props.data.errorLog} rows={10} readOnly/>
                </Modal>
            </div>
        );
    }
}
