import {Menu, Icon} from 'antd';
import React, {PureComponent} from 'react';
import {Link} from "dva/router";

import ReactSVG from "react-svg";

import styles from './index.less';

const {SubMenu} = Menu;

class SideMenu extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <Menu
        style={{paddingLeft : 30, width: 120, float: 'left'}}
      >
        <Menu.Item >
          <Link to="/store/attraction">
            <ReactSVG path={require(`../../../assets/svg/ic-funnel-line.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item >
          <Link to="/store/attraction2">
            <ReactSVG path={require(`../../../assets/svg/ic-funnel-line.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item >
          <Link to="/store/battleground">
            <ReactSVG path={require(`../../../assets/svg/ic-battleground-line.svg`)}/>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/store/fullperspective">
            <ReactSVG path={require(`../../../assets/svg/ic-full-perspective-line.svg`)}/>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;