/*
 * @Author: daijialing
 * @Date: 2018-08-02 09:23:58
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-08-02 11:20:17
 * 二级类目
 */
import React from 'react';
import { Input, Button, Icon, Modal, Tag, Row, Col } from 'antd';
import { CATALOGUE_LIST } from '@/api';
import { fetchData } from 'utils/fetchData';
import { arrayToHeavy } from 'utils/util';

const { CheckableTag } = Tag;

class DmSecondaryCategory extends React.Component {
  constructor(props) {
    super(props);
    let {catIds} = props;
    catIds = catIds ? catIds.split(',').map(t => Number(t)) : [];
    this.state = {
      visible: false,
      catalogueList: [], // 所有目录列表
      parentCatalogueList: [], // 父目录列表
      selectedTags: catIds
    };
  }
  fetchCatalogueList = () => {
    fetchData({
      url: CATALOGUE_LIST,
      method: 'get',
      params: {
        level: 2,
        pageSize: 999
      }
    }).then(res => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      if (res.data.success) {
        let catalogueList = res.data.data.pageData,
          parentCatalogueList = catalogueList.map((t) => t.pname);
        parentCatalogueList = arrayToHeavy(parentCatalogueList);
        this.setState({
          catalogueList,
          parentCatalogueList
        });
      }
    });
  }
  showModal = () => {
    this.fetchCatalogueList();
    this.setState({
      visible: true
    });
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }

  onOk = () => {

  }
  handleCheckableTagChange = (k, checked) => {
    const {selectedTags} = this.state;
    const nextSelectedTags = checked ? [...selectedTags, k.id] : selectedTags.filter(t => t !== k.id);
    this.setState({
      selectedTags: nextSelectedTags
    });
  }
  render() {
    const {getFieldDecorator, paramName, initialValue} = this.props;
    const addonAfter = (
      <Icon type="select" onClick = {this.showModal}/>
    );

    return (
      <div>
        {
          getFieldDecorator(paramName, {
            initialValue: initialValue
          })(
            <Input readOnly addonAfter = {addonAfter}/>
          )
        }
        <Modal visible = {this.state.visible}
          title = '选择二级目录'
          onCancel = {this.onCancel}
          onOk = {this.onOk}
        >
          <div style = {{maxHeight: window.innerHeight - 310, overflowY: 'auto', overflowX: 'hidden'}}>
            {
              this.state.parentCatalogueList.map(p => {
                return (
                  <Row style={{marginTop: 10}}>
                    <Col span={13}>
                      <span style={{fontSize: 14, color: '#222'}}>{p}</span>
                    </Col>
                    <Col span={24} style={{marginLeft: 10}}>
                      {
                        this.state.catalogueList.map((k) => {
                          if (k.pname == p) {
                            return (
                              <div style = {{marginTop: 5, display: 'inline-flex'}}>
                                <CheckableTag
                                  style={{borderColor: '#49a9ee'}}
                                  key={k.id}
                                  checked={this.state.selectedTags.indexOf(k.id) > -1}
                                  onChange={checked => this.handleCheckableTagChange(k, checked)}
                                >
                                  {k.name}
                                </CheckableTag>
                              </div>
                            );
                          }
                        })
                      }
                    </Col>
                  </Row>
                );
              })
            }
          </div>
        </Modal>
      </div>
    );
  }
}

export default DmSecondaryCategory;
