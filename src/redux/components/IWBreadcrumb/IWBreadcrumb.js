/*
 * @Author: daijialing
 * @Date: 2018-07-25 15:19:12
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-09-06 11:45:21
 * 面包屑导航
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const BreadcrumbItem = Breadcrumb.Item;

class IWBreadcrumb extends React.Component {
  render() {
    let { data, collapse, extra } = this.props;
    collapse = collapse === true;

    if (data.length && data[data.length - 1] === '搜索“”')
      data.splice(data.length - 1, 1);


    if (collapse && data.length > 3) {
      data.splice(1, data.length - 3);
      data.splice(1, 0, {link: null, name: '...'});
    }

    return (
      <div className="breadcrumb">
        <Breadcrumb>
          {
            data.map((item, idx) => {
              return (
                <BreadcrumbItem key={idx}>
                  {
                    item.link && data.length - 1 !== idx
                      ?
                      <Link className="breadcrumb-item" to={item.link}>{item.name}</Link>
                      :
                      <div className="breadcrumb-item">{item.name}</div>
                  }
                </BreadcrumbItem>
              );
            })
          }
        </Breadcrumb>
        { extra ? extra : null}
      </div>
    );
  }
}

export default IWBreadcrumb;
