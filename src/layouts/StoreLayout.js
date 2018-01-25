import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Redirect, Switch } from 'dva/router';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import HeaderSearch from '../components/HeaderSearch';
import NoticeIcon from '../components/NoticeIcon';
import GlobalFooter from '../components/GlobalFooter';
import NotFound from '../routes/Store/Exception/404';
import styles from './StoreLayout.less';
import SVGInline from "react-svg-inline"

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class StoreLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  constructor(props) {
    super(props);
    console.log(props);
    // 把一级 Layout 的 children 作为菜单项
    this.menus = props.storenavData.reduce((arr, current) => arr.concat(current.children), []);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }
  getChildContext() {
    const { location, storenavData, getRouteData } = this.props;
    const routeData = getRouteData('StoreLayout');
    const firstMenuData = storenavData.reduce((arr, current) => arr.concat(current.children), []);
    const menuData = this.getMenuData(firstMenuData, '');
    const breadcrumbNameMap = {};

    routeData.concat(menuData).forEach((item) => {
      breadcrumbNameMap[item.path] = item.name;
    });
    return { location, breadcrumbNameMap };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.children) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  }
  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuSelectedKeys;
  }
  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key];
    }
    return keys;
  }
  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf('http') === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : item.name
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path}>
          {
            /^https?:\/\//.test(itemPath) ? (
              <a href={itemPath} target={item.target}>
                {icon}<span>{item.name}</span>
              </a>
            ) : (
              <Link
                to={itemPath}
                target={item.target}
                replace={itemPath === this.props.location.pathname}
              >
                {icon}<span>{item.name}</span>
              </Link>
            )
          }
        </Menu.Item>
      );
    });
  }
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    getRouteData('StoreLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }
  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
    this.triggerResizeEvent();
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  }
  render() {
    const { currentUser, collapsed, fetchingNotices, getRouteData } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();

    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys: this.state.openKeys,
    };

    const layout = (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onCollapse={this.onCollapse}
          width={256}
          className={styles.sider}
        >
          <div>
            <Link to="/travel/areas">
              <SVGInline svg={"<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 411.82 80\"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:#fff;}.cls-3{stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;fill:url(#New_Gradient_Swatch);stroke:url(#linear-gradient-2);}</style><linearGradient id=\"linear-gradient\" x1=\"98.5\" y1=\"146.11\" x2=\"98.5\" y2=\"106.24\" gradientTransform=\"matrix(1, 0, 0, -1, 0, 166)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#00e6a3\"/><stop offset=\"1\" stop-color=\"#29a5e9\"/></linearGradient><linearGradient id=\"New_Gradient_Swatch\" x1=\"210.6\" y1=\"59.95\" x2=\"210.6\" y2=\"19.8\" gradientTransform=\"matrix(1, 0, 0, 1, 0, 0)\" xlink:href=\"#linear-gradient\"/><linearGradient id=\"linear-gradient-2\" x1=\"210.6\" y1=\"18.8\" x2=\"210.6\" y2=\"60.95\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#29a5e9\"/><stop offset=\"1\" stop-color=\"#29a5e9\"/></linearGradient></defs><title>Artboard 1</title><path class=\"cls-1\" d=\"M29.72,60A3.82,3.82,0,0,1,27,58.85L21.13,53A3.84,3.84,0,0,1,20,50.26V21.15a1.09,1.09,0,0,1,1.09-1.09H29A1.09,1.09,0,0,1,30,21.15V49a1.24,1.24,0,0,0,1.33,1.33h14.3a1.09,1.09,0,0,1,1.09,1.09v7.53A1.09,1.09,0,0,1,45.67,60Zm51.09,0a3.82,3.82,0,0,0,2.72-1.13L89.41,53a3.84,3.84,0,0,0,1.13-2.72V21.15a1.09,1.09,0,0,0-1.09-1.09H81.58a1.09,1.09,0,0,0-1.09,1.09V49a1.24,1.24,0,0,1-1.33,1.33H68.37A1.24,1.24,0,0,1,67,49V21.15a1.09,1.09,0,0,0-1.09-1.09H58.08A1.09,1.09,0,0,0,57,21.15V50.26A3.82,3.82,0,0,0,58.12,53L64,58.85A3.84,3.84,0,0,0,66.71,60Zm20.62-9.72A3.82,3.82,0,0,0,102.56,53l5.88,5.88A3.84,3.84,0,0,0,111.16,60h19.69a1.09,1.09,0,0,0,1.09-1.09V51.36a1.09,1.09,0,0,0-1.09-1.09H112.79a1.24,1.24,0,0,1-1.33-1.33V31.08a1.24,1.24,0,0,1,1.33-1.33h18.05a1.09,1.09,0,0,0,1.09-1.09V21.09A1.09,1.09,0,0,0,130.84,20H111.16a3.82,3.82,0,0,0-2.72,1.13L102.56,27a3.84,3.84,0,0,0-1.13,2.72Zm51.74-30.2a3.82,3.82,0,0,0-2.72,1.13l-5.88,5.88a3.84,3.84,0,0,0-1.13,2.72V58.89A1.09,1.09,0,0,0,144.53,60h7.87a1.09,1.09,0,0,0,1.09-1.09V47.45a1.24,1.24,0,0,1,1.33-1.33h10.79a1.24,1.24,0,0,1,1.33,1.33V58.89A1.09,1.09,0,0,0,168,60h7.87A1.09,1.09,0,0,0,177,58.89V29.78a3.82,3.82,0,0,0-1.13-2.72L170,21.19a3.84,3.84,0,0,0-2.72-1.13ZM167,37.63A1.24,1.24,0,0,1,165.62,39H154.83a1.24,1.24,0,0,1-1.33-1.33V31.09a1.24,1.24,0,0,1,1.33-1.33h10.79A1.24,1.24,0,0,1,167,31.09Z\"/><path class=\"cls-2\" d=\"M264.71,24.05A30.84,30.84,0,0,0,256.57,23c-5.64,0-9.11,1.91-9.11,6.53,0,10,20,7,20,20,0,7.09-4.9,10.46-12.87,10.46a32.62,32.62,0,0,1-10.42-1.63l.63-2.87A31.18,31.18,0,0,0,254.18,57c3.64,0,6-.56,7.63-1.8a6.66,6.66,0,0,0,2.45-5.57c0-10.52-20-7.37-20-19.8a9.21,9.21,0,0,1,2.51-6.69c2.22-2.25,5.7-3.15,9.68-3.15a30.73,30.73,0,0,1,8.94,1.35Z\"/><path class=\"cls-2\" d=\"M271.28,20.73h28.64l-.4,2.93h-12.3V59.21h-3.42V23.66H271.28Z\"/><path class=\"cls-2\" d=\"M317.19,60c-10.08,0-14.81-7.09-14.81-20s4.73-20,14.81-20S332,27.14,332,40,327.27,60,317.19,60Zm0-36.79c-8.43,0-11.28,6.41-11.28,16.82s2.85,16.77,11.28,16.77S328.47,50.44,328.47,40,325.62,23.21,317.19,23.21Z\"/><path class=\"cls-2\" d=\"M342.86,44.08V59.21h-3.42V20.73h10.88c5.13,0,8.37,1,10.36,3.26,1.59,1.8,2.73,4.28,2.73,8.21,0,6.19-2.79,9.73-7.46,11.14l8.31,15.87h-3.7L352.77,44c-.57.06-1.71.11-2.51.11Zm0-3h7.63c3.13,0,5.52-.62,7-2,1.71-1.63,2.39-3.94,2.39-6.92s-.63-4.78-2-6.24-3.64-2.25-7.8-2.25h-7.23Z\"/><path class=\"cls-2\" d=\"M374.28,56.29h17.54v2.92h-21V20.73h20.5l-.4,2.93H374.28V38.23H388v3H374.28Z\"/><line class=\"cls-3\" x1=\"210.6\" y1=\"19.8\" x2=\"210.6\" y2=\"59.95\"/></svg>\n"} />

            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            {...menuProps}
            onOpenChange={this.handleOpenChange}
            selectedKeys={this.getCurrentMenuSelectedKeys()}
            style={{ margin: '16px 0', width: '100%' }}
          >
            {this.getNavMenuItems(this.menus)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className={styles.right}>
              <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={(value) => {
                  console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={(value) => {
                  console.log('enter', value); // eslint-disable-line
                }}
              />
              <NoticeIcon
                className={styles.action}
                count={currentUser.notifyCount}
                onItemClick={(item, tabProps) => {
                  console.log(item, tabProps); // eslint-disable-line
                }}
                onClear={this.handleNoticeClear}
                onPopupVisibleChange={this.handleNoticeVisibleChange}
                loading={fetchingNotices}
                popupAlign={{ offset: [20, -16] }}
              >
                <NoticeIcon.Tab
                  list={noticeData['通知']}
                  title="通知"
                  emptyText="你已查看所有通知"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['消息']}
                  title="消息"
                  emptyText="您已读完所有消息"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                />
                <NoticeIcon.Tab
                  list={noticeData['待办']}
                  title="待办"
                  emptyText="你已完成所有待办"
                  emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                />
              </NoticeIcon>
              {currentUser.name ? (
                <Dropdown overlay={menu}>
                  <span className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    {currentUser.name}
                  </span>
                </Dropdown>
              ) : <Spin size="small" style={{ marginLeft: 8 }} />}
            </div>
          </Header>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 260px)' }}>
              <Switch>
                {
                  getRouteData('StoreLayout').map(item =>
                    (
                      <Route
                        exact={item.exact}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  )
                }
                <Redirect exact from="/" to="/store/areas" />
                <Route component={NotFound} />
              </Switch>
            </div>
            <GlobalFooter
              copyright={
                <div>
                  Copyright <Icon type="copyright" /> 2017 Telefonica
                </div>
              }
            />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
}))(StoreLayout);
