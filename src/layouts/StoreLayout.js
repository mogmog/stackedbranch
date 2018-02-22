import React from "react";
import PropTypes from "prop-types";
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Dropdown,
  Tag,
  message,
  Spin,
  Popover,
  Button
} from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "dva";
import { Link, Route, Redirect, Switch } from "dva/router";
import moment from "moment";
import groupBy from "lodash/groupBy";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import Debounce from "lodash-decorators/debounce";
import HeaderSearch from "../components/Common/HeaderSearch";
import NoticeIcon from "../components/Common/NoticeIcon";
import GlobalFooter from "../components/Common/GlobalFooter";
import NotFound from "../routes/Common/Exception/404";
import styles from "./StoreLayout.less";
import ReactSVG from "react-svg";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
};
class StoreLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.menus = props.storenavData.reduce(
      (arr, current) => arr.concat(current.children),
      []
    );
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props)
    };
  }
  getChildContext() {
    const { location, storenavData, getRouteData } = this.props;
    const routeData = getRouteData("StoreLayout");
    const firstMenuData = storenavData.reduce(
      (arr, current) => arr.concat(current.children),
      []
    );
    const menuData = this.getMenuData(firstMenuData, "");
    const breadcrumbNameMap = {};
    routeData.concat(menuData).forEach(item => {
      breadcrumbNameMap[item.path] = item.name;
    });
    return { location, breadcrumbNameMap };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "user/fetchCurrent"
    });
    this.toggle();
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  onCollapse = collapsed => {
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };
  onMenuClick = ({ key }) => {
    if (key === "logout") {
      this.props.dispatch({
        type: "login/logout"
      });
    }
  };
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach(item => {
      if (item.children) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
        arr = arr.concat(
          this.getMenuData(item.children, `${parentPath}/${item.path}`)
        );
      }
    });
    return arr;
  };
  getDefaultCollapsedSubMenus(props) {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
    currentMenuSelectedKeys.splice(-1, 1);
    if (currentMenuSelectedKeys.length === 0) {
      return ["dashboard"];
    }
    return currentMenuSelectedKeys;
  }
  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split("/").slice(1);
    if (keys.length === 1 && keys[0] === "") {
      return [this.menus[0].key];
    }
    return keys;
  }
  getNavMenuItems(menusData, parentPath = "") {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (item.path.indexOf("http") === 0) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ""}`.replace(/\/+/g, "/");
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {/*<Icon type={item.icon} />*/}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      //const icon = item.icon && <Icon type={item.icon} />;
      const icon = item.icon && (
        <ReactSVG path={require(`../assets/svg/${item.icon}`)} />
      );
      return (
        <Menu.Item key={item.key || item.path}>
          {/^https?:\/\//.test(itemPath) ? (
            <a href={itemPath} target={item.target}>
              {icon}
              <span>{item.name}</span>
            </a>
          ) : (
            <Link
              to={itemPath}
              target={item.target}
              replace={itemPath === this.props.location.pathname}
            >
              {icon}
              <span>{item.name}</span>
            </Link>
          )}
        </Menu.Item>
      );
    });
  }
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = "LUCA";
    getRouteData("StoreLayout").forEach(item => {
      if (item.path === pathname) {
        title = `${item.name} - LUCA`;
      }
    });
    return title;
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: "",
          processing: "blue",
          urgent: "red",
          doing: "gold"
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, "type");
  }
  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item =>
        lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys]
    });
  };
  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: !collapsed
    });
    this.triggerResizeEvent();
  };
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: "global/clearNotices",
      payload: type
    });
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: "global/fetchNotices"
      });
    }
  };
  handleButtonClick = e => {
    //message.info('Click on left button.');
    console.log("click left button", e);
  };
  handleMenuClick = e => {
    // message.info('Click on menu item.');
    console.log("click", e);
  };
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1">Luca Store</Menu.Item>
        <Menu.Item key="2">Luca Travel</Menu.Item>
      </Menu>
    );
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      getRouteData
    } = this.props;
    console.log(this.props);
    const noticeData = this.getNoticeData();
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys: this.state.openKeys
        };
    const header = (
      <Header className={styles.header}>
        {/* <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />*/}
        <div className={styles.appBar}>
          <div className={styles.appLogo} />
          <div className={styles.appTitle}>Store</div>
          <div className={styles.appDropdown}>
            <div>
              <Dropdown.Button
                onClick={this.handleButtonClick.bind(this)}
                overlay={menu}
              >
                Account services
              </Dropdown.Button>
            </div>
          </div>
        </div>
      </Header>
    );
    const layout = (
      <Layout>
        {header}
        <Content>
          <div id="StoreLayoutContent">
            <Switch>
              {getRouteData("StoreLayout").map(item => (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              ))}
              <Redirect exact from="/" to="/store/attraction" />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Sider
            theme={"light"}
            trigger={null}
            collapsible
            collapsed={true}
            breakpoint="md"
            onCollapse={this.onCollapse}
            width={76}
            className={styles.sider}
          >
            <Menu
              theme="light"
              mode="inline"
              {...menuProps}
              onOpenChange={this.handleOpenChange}
              selectedKeys={this.getCurrentMenuSelectedKeys()}
              style={{ margin: "16px 0", width: "100%" }}
            >
              {this.getNavMenuItems(this.menus)}
            </Menu>
          </Sider>{" "}
          <GlobalFooter
            copyright={
              <div>
                Copyright <Icon type="copyright" /> 2017 Telefonica
              </div>
            }
          />
        </Content>
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
  notices: state.global.notices
}))(StoreLayout);
