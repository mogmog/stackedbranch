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
      <Menu inlineCollapsed={true}>

        <Menu.Item className={styles.menuItem}>
          <Link to="/store/home">
            <div className={['icon', styles.icon, styles.icFunnel].join(' ')} />
            <span>Home</span>
          </Link>
        </Menu.Item>

        <Menu.Item className={styles.menuItem}>
          <Link to="/store/attraction">
            <div className={['icon', styles.icon, styles.icFunnel].join(' ')} />
            <span>Attraction Power</span>
          </Link>
        </Menu.Item>

        <Menu.Item className={styles.menuItem}>
          <Link to="/store/attraction2">
            <div className={['icon', styles.icon, styles.icFunnel].join(' ')} />
            <span>Attraction Power Funnel</span>
          </Link>
        </Menu.Item>

        <Menu.Item className={styles.menuItem}>
          <Link to="/store/battleground">
            <div className={['icon', styles.icon, styles.icBattleground].join(' ')} />
            <span>Battleground</span>
          </Link>
        </Menu.Item>

        <Menu.Item className={styles.menuItem}>
          <Link to="/store/fullperspective">
            <div className={['icon', styles.icon, styles.icFullPerspective].join(' ')} />
            <span>Full perspective</span>
          </Link>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default SideMenu;
