import {Menu, Icon} from 'antd';
import React, {PureComponent} from 'react';
import {Link} from "dva/router";

import ReactSVG from "react-svg";

const {SubMenu} = Menu;

class SideMenu extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <Menu
        defaultSelectedKeys={['1']}
        style={{width: 120, float: 'left'}}
      >
        <Menu.Item key="1">
          <Link to="/store/attraction">
            <ReactSVG path={require(`../../../assets/svg/ic-luca-store.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/store/attraction2">
            <ReactSVG path={require(`../../../assets/svg/ic-luca-store.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to="/store/battleground">
            <ReactSVG path={require(`../../../assets/svg/ic-luca-store.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/store/crossfilter">
            <ReactSVG path={require(`../../../assets/svg/ic-luca-store.svg`)}/>
          </Link>
        </Menu.Item>




      </Menu>
    );
  }
}

export default SideMenu;
