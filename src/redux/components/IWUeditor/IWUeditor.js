/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export default class IWUeditor extends React.Component {
  constructor(props){
    super(props);
    this.state={
      id:this.props.id?this.props.id:null,
      ueditor :null,
    }
  }
  componentDidMount(){
    let UE = window.UE;
    console.log('UE :', UE);
    let {id} = this.state;
    if(id){
      try {
        /*加载之前先执行删除操作，否则如果存在页面切换，
        再切回带编辑器页面重新加载时不刷新无法渲染出编辑器*/
        UE.delEditor(id);
    }catch (e) {}
    let editor = UE.getEditor(id, {
         //工具栏
            toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload',
                'horizontal', 'date', 'time', 'preview',
            ]]
            ,lang:"zh-cn"
            //字体
            ,'fontfamily':[
               { label:'',name:'songti',val:'宋体,SimSun'},
               { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
               { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
               { label:'',name:'heiti',val:'黑体, SimHei'},
               { label:'',name:'lishu',val:'隶书, SimLi'},
               { label:'',name:'andaleMono',val:'andale mono'},
               { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
               { label:'',name:'arialBlack',val:'arial black,avant garde'},
               { label:'',name:'comicSansMs',val:'comic sans ms'},
               { label:'',name:'impact',val:'impact,chicago'},
               { label:'',name:'timesNewRoman',val:'times new roman'}
            ]
            //字号
            ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]
            , enableAutoSave : false
            , autoHeightEnabled : false
            , initialFrameHeight: this.props.height
            , initialFrameWidth: '100%'
            ,readonly:this.props.disabled
    });
    var me = this;
    editor.ready( function( ueditor ) {
        var value = me.props.value?me.props.value:'<p></p>';
        editor.setContent(value);
    });
  }
}
  render() {
    return (
      <script id={this.props.id} name="content" type="text/plain">

      </script>
    )
  }
}
