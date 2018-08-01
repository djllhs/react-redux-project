/* global console,window  localStorage*/
import React, { Component } from 'react';
import { Form, Input, Button, Icon, Row, Col, message } from 'antd';
import './App.css';
import { connect } from 'react-redux';
import * as actions from 'actions';
const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!!err) return;
      this.setState({
        loading: true
      }, () => {
        this.props.dispatch(actions.login(values))
          .then(res => {
            console.log('res :', res);
            this.setState({loading: false});
            if (!res.data.success) {
              message.error(res.data.msg || '登录失败');
              return;
            }
            const menuArr = res.data.data,
              menuJson = JSON.stringify(menuArr);
            localStorage.setItem('menuJson', menuJson);
            localStorage.setItem('userName', values.userName);
            this.props.dispatch(actions.getMenu(menuArr));
            this.props.dispatch(actions.getUserInfo({userName: values.userName}));
            this.props.dispatch(actions.menuChange());
            this.props.history.push('/index');

          });
      });
    });

  }
  render() {
    const {counter} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='app_container'>
        <span>{counter.count}</span>
        <Button onClick={this.handleClick}>Increase</Button>
        <Form horizontal='true' className='formWrap'>
          <Row className='app_row'>
            <Col span={13}>
              <FormItem>
                {
                  getFieldDecorator('userName', {
                    rules: [
                      {required: true, message: '用户名不能为空', whitespace: true}
                    ]
                  })(
                    <Input prefix={<Icon type='user' />} placeholder='用户名'/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row className='app_row'>
            <Col span={13}>
              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [
                      {required: true, message: '密码不能为空', whitespace: true}
                    ]
                  })(
                    <Input prefix={<Icon type='lock' />} placeholder='密码'/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row className='app_row'>
            <Col span={13}>
              <FormItem>
                <Button style={{width: '100%'}} type='primary'
                  onClick={this.handleSubmit} loading={this.state.loading}
                >登录</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
// App.contextTypes = { store: PropTypes.object };
App = Form.create()(App);

export default connect(
  state => ({ counter: state.counter, login: state.login}),
  // dispatch => bindActionCreators({getTest}, dispatch)
)(App);
