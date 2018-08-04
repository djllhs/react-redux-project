/* global console */
import React from 'react';
import BraftEditor  from 'braft-editor';
import 'braft-editor/dist/braft.css';
import './IWBraftEditor.css';

class IWBraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  // 指定编辑器内容发生变化时候的回调
  handleChange = (value) => {
    console.log(value);
  }

  // 指定编辑器内容发生变化时候的回调，参数为Raw格式的编辑器内容
  handleRawChange = (value) => {
    console.log(value);
  }

  getContent = () => {
    console.log(this.braftEditor);
    console.log(this.braftEditor.getContent());
    return this.braftEditor.getContent();
  }

  isEmpty = () => {
    console.log('object :', this.braftEditor.isEmpty());
    if (this.braftEditor.isEmpty())
      return true;
    else
      return false;
  }

  render() {
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: this.props.initialContent,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
      contentId: this.props.contentId || 0
    };
    return (
      <div className='braft_editor_wrap'>
        <BraftEditor {...editorProps} ref={ref => this.braftEditor = ref}/>
      </div>
    );
  }
}

export default IWBraftEditor;
