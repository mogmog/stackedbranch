import { Menu, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { Link } from 'dva/router';

import ReactSVG from 'react-svg';

import styles from './index.less';

const { SubMenu } = Menu;

class SideMenu extends PureComponent {
  render() {
    const {} = this.props;
    return (
      <div className={styles.menuContainer}>
      <Menu>
        <Menu.Item style={{ width: 80, height: 80, lineHeight: 80, padding: 0, margin: 0 }}>
          <Link to="/store/attraction">
            <div className={[styles.icon, styles.icFunnel].join(' ')} />
          </Link>
        </Menu.Item>

        <Menu.Item style={{ width: 80, height: 80, lineHeight: 80, padding: 0, margin: 0 }}>
          <Link to="/store/attraction2">
            <div className={[styles.icon, styles.icFunnel].join(' ')} />
          </Link>
        </Menu.Item>

        <Menu.Item style={{ width: 80, height: 80, lineHeight: 80, padding: 0, margin: 0 }}>
          <Link to="/store/battleground">
            <div className={[styles.icon, styles.icBattleground].join(' ')} />
          </Link>
        </Menu.Item>

        <Menu.Item style={{ width: 80, height: 80, lineHeight: 80, padding: 0, margin: 0 }}>
          <Link to="/store/fullperspective">
            <div className={[styles.icon, styles.icFullPerspective].join(' ')} />
          </Link>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default SideMenu;
