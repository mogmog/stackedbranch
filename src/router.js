import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils/utils';

import styles from './index.less';

/* react-intl imports */
import { addLocaleData, IntlProvider } from 'react-intl';
import i18nConfig from './il8nConfig_en';



/* Import basic support for another locale if needed
 ('en' is included by default) */
//const frLocaleData = require('react-intl/locale-data/fr');
//addLocaleData(frLocaleData);



dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(route.children);
  return nodeList;
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const route = navData.filter(item => item.layout === path)[0];
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  };
}

function RouterConfig({ history, app }) {
  const navData = getNavData(app);
  const BasicLayout = getLayout(navData, 'BasicLayout').component;

  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path);
    },
  };

  return (
    <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
      <LocaleProvider locale={enGB}>
        <Router history={history}>
          <Switch>
            <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />

          </Switch>
        </Router>
      </LocaleProvider>
    </IntlProvider>
  );
}

export default RouterConfig;
