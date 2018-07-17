/*
 * @Author: daijialing
 * @Date: 2018-07-10 14:23:27
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-10 15:05:09
 * 多行文本处理
 */

import React from "react";
import { Popover} from "antd";
import "./index.css";
const MultiLineText = (props) => {
    const content =
        <div style={{width:props.width||200,wordWrap:"break-word"}}>{props.text} </div>

    return(
        <Popover
            content={content}
            title={null} placement="topLeft"
            >
            <div className="twoLine">{props.text}</div>
        </Popover>
    )
};

export default MultiLineText;
