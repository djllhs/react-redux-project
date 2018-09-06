/* global console sessionStorage localStorage require*/
import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, message } from 'antd';

import { IWMenu } from 'components';
import ChildrenRoutes from '../../routes';
import { deleteAllCookies, myRouter } from 'utils/util';
import * as actions from 'actions';
import './index.css';
const {Header, Sider, Content} = Layout;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    if (this.props.other.menu.length === 0)
      this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    const {pathname} = nextProps.location;
    // 菜单选中问题
    if (this.props.location.pathname !== pathname) {
      myRouter.setMenuActive(pathname, (menuId) => {
        this.iwMenu.setMenuSelected([menuId + '']);
        let menuKeyPath = nextProps.other.menuKeyPath;
        menuKeyPath[0] = menuId + '';
        // console.log('menuKeyPath :', menuKeyPath);
        this.menuChange(menuKeyPath);
        sessionStorage.setItem('menuKeyPath', menuKeyPath);
      });
    }

  }
  // 导航改变
  menuChange = (keyPath) => {
    this.props.dispatch(actions.menuChange(keyPath));
  }

  // 退出登录
  clickLogOut = () => {
    this.setState({
      loading: true
    }, () => {
      this.props.dispatch(actions.loginOut())
        .then(res => {
          this.setState({loading: false});
          if (res.data.success) {
            localStorage.clear();
            sessionStorage.clear();
            deleteAllCookies();
            this.props.history.push('/');
            this.props.dispatch(actions.clearMenu());
            this.props.dispatch(actions.clearUserInfo());

          } else
            message.error(res.data.msg || '网络错误请重试');
        });
    });
  }

  render() {
    const {login, other} = this.props;
    return (
      <Layout className='home_layout'>
        <Sider className='home_sider'>
          <div className='home_logo_wrap'>
            <img src={ require('../../../img/new-logo.png') } className='home_logo' alt=''/>
          </div>
          <IWMenu menu={other.menu} onChange = {this.menuChange} menuKeyPath = {other.menuKeyPath} ref = {(ref) => this.iwMenu = ref}/>
        </Sider>

        <Layout className='home_inner_layout'>
          <Header className='home_inner_header'>
            <div style={{marginRight: 10}}>{login.userInfo.userName}</div>
            <Button onClick={this.clickLogOut} loading={this.state.loading}>退出</Button>
          </Header>
          <Content className='home_inner_content'>
            <ChildrenRoutes match={this.props.match}/>
          </Content>
        </Layout>

      </Layout>
    );
  }
}

export default connect(
  state => ({login: state.login,  other: state.other})
)(Home);
