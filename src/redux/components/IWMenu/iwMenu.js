import React from "react";
import {Menu} from 'antd';
import { NavLink } from "react-router-dom";
import "./iwMenu.css";
const SubMenu = Menu.SubMenu,
  MenuItem = Menu.Item;
class IWMenu extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: Array.of(props.menuKeyPath[0]),
      openKeys: props.menuKeyPath,
      _map: []
    }
  }

  componentDidMount() {
    // console.log('IWMenu -----:', this.props);
    if(!this.props.menu){
      return ;
    }
    const _map = this.getRootSubMenu(this.props.menu);
    this.setState({
      _map,
    })
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps :', nextProps);
  }

  getRootSubMenu = (menu) => {
    let _map = []
    _map = menu.map((m) => String(m.id));
    console.log('_map :', _map);
    return _map;
  }
  handleClick = ({ item, key, keyPath }) => {
    this.setState({
      current: [key],
    });
    this.props.onChange(keyPath);
    sessionStorage.setItem('menuKeyPath',keyPath);
  }
  onOpenChange = (openKeys) => {
    console.log('openKeys :', openKeys);
    let {_map} = this.state;
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    if (_map.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }

  }
  setMenuSelected = (current) => {
    this.setState({
        current: current
    })
  }
  renderMenu = (menu) => {
    if(menu){
     return menu.map((m) => {
        if(!m.childNodes){
          return <MenuItem key={m.id + ''}>
                  <NavLink to={"/index"+m.url}>{m.name}</NavLink>
              </MenuItem>
          }
        else
          return (
            <SubMenu key={m.id+''} title={<span>
                <i className="iconfont" dangerouslySetInnerHTML={{__html: m.icon}}></i>
                <span style={{marginLeft: 10}}>{m.name}</span>
              </span>
            }>
              {
                this.renderMenu(m.childNodes)
              }
            </SubMenu>
            )
          }
      )
    }
  }
  render(){
    const {menu}  = this.props;
    // console.log('menu :', menu);
    return(
      <div className="home_menu_wrap">
        <Menu mode="inline"
          theme="light"
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
          selectedKeys={this.state.current}
          openKeys={this.state.openKeys}
        >
          {this.renderMenu(menu)}
        </Menu>
      </div>
    )
  }
}

export default IWMenu;
