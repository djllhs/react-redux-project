UE.registerUI('kityformula', function(editor, uiname){


    // 创建dialog
    var kfDialog = new UE.ui.Dialog({

        // 指定弹出层路径
        iframeUrl: editor.options.UEDITOR_HOME_URL + 'kityformula-plugin/kityFormulaDialog.html',
        // 编辑器实例
        editor: editor,
        // dialog 名称
        name: uiname,
        // dialog 标题
        title: '插入公式',

        // dialog 外围 css
        cssRules: 'width:783px; height: 386px;',

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                    kfDialog.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    kfDialog.close(false);
                }
            }
        ]});


    editor.ready(function(){
        UE.utils.cssRule('kfformula', 'img.kfformula{vertical-align: middle;}', editor.document);
    });

    var iconUrl = editor.options.UEDITOR_HOME_URL + 'kityformula-plugin/kf-icon.png';
    var tmpLink = document.createElement('a');
    tmpLink.href = iconUrl;
    tmpLink.href = tmpLink.href;
    iconUrl = tmpLink.href;

    var kfBtn = new UE.ui.Button({
        name:'插入' + uiname,
        title:'插入公式-' + uiname,
        //需要添加的额外样式，指定icon图标
        cssRules :'background: url("' + iconUrl + '") !important',
        onclick:function () {
            //渲染dialog
            kfDialog.render();
            kfDialog.open();

            /******* MathType start ********/

            $('.edui-dialog-foot').append('<div class="mathtype-btn">点击使用MathType插入更多公式</div>');


            var MathTypeTemplate = [
                '<div class="math-box"><p class="math-hint">如无MathType软件工具请直接打开百度搜索"MathType"进行下载，谢谢〜</p>',
                '<div class="math-code-box"><input class="math-code" type="text" placeholder="请在此粘贴公式代码"><span class="math-code-btn math-btn">预览</span><a class="math-btn" href="http://yuntiexamitempig.oss-cn-qingdao.aliyuncs.com/mathtex.pdf" target="_blank">语法说明</a></div>',
                '<div class="math-preview"><p class="math-default">在此预览公式效果</p></div></div>'
            ].join('');

            var mathUrl = 'http://texmath.bookln.cn/cgi-bin/math.cgi?'

            // 创建dialog
            var mathtypeDialog = new UE.ui.Dialog({

                // 指定弹出层路径
                // iframeUrl: editor.options.UEDITOR_HOME_URL + 'kityformula-plugin/kityFormulaDialog.html',
                content: MathTypeTemplate,
                // 编辑器实例
                editor: editor,
                // dialog 名称
                name: 'mathtype',
                // dialog 标题
                title: '插入公式 - MathType',

                // dialog 外围 css
                cssRules: 'width:783px; height: 386px;',

                //如果给出了buttons就代表dialog有确定和取消
                buttons:[
                    {
                        className:'edui-okbutton',
                        label:'确定',
                        onclick:function () {

                            var codeInput = $('.math-code');
                            var code = codeInput.val().trim();
                            if (code) {
                                editor.execCommand('insertHtml', '<img style="max-width:100%;" src="'+mathUrl+code+'">');
                            }
                            mathtypeDialog.close(true);
                        }
                    },
                    {
                        className:'edui-cancelbutton',
                        label:'取消',
                        onclick:function () {
                            mathtypeDialog.close(false);
                        }
                    }
                ]});

            $('body').on('click','.mathtype-btn',function(){
                $('.edui-for-mathtype').remove();
                mathtypeDialog.render();
                mathtypeDialog.open();
                // kfDialog.close(false)
                $('.edui-for-kityformula').remove();

            });

            $('body').on('click','.math-code-btn',function(){
                var codeInput = $('.math-code');
                var code = codeInput.val().trim();
                if (!code) {
                    codeInput.addClass('hint-animations');
                    setTimeout(function(){
                        codeInput.removeClass('hint-animations');
                    }, 2000);
                } else {
                    $('.math-preview').html('<img src="'+mathUrl+code+'">');
                }
            });

            /******* MathType end ********/



        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiname);
        if (state == -1) {
            kfBtn.setDisabled(true);
            kfBtn.setChecked(false);
        } else {
            kfBtn.setDisabled(false);
            kfBtn.setChecked(state);
        }
    });

    return kfBtn;


});