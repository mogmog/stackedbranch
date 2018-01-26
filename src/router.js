import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getStoreNavData } from './common/store_nav';
import { getTravelNavData } from './common/travel_nav';
import { getPlainNode } from './utils/utils';

import styles from './index.less';

/* react-intl imports */
import { addLocaleData, IntlProvider } from 'react-intl';
import i18nConfig from './il8nConfig_en';
import {HighchartsProvider} from "react-highcharts-wrapper";

import Login from './routes/User/Login';


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
  const storenavData = getStoreNavData(app);
  const travelnavData = getTravelNavData(app);
  const StoreLayout = getLayout(storenavData, 'StoreLayout').component;
  const TravelLayout = getLayout(travelnavData, 'TravelLayout').component;

  const storepassProps = {
    app,
    storenavData,
    getRouteData: (path) => {
      return getRouteData(storenavData, path);
    },
  };

  const travelpassProps = {
    app,
    travelnavData,
    getRouteData: (path) => {
      return getRouteData(travelnavData, path);
    },
  };

  return (
    <HighchartsProvider>
      <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
        <LocaleProvider locale={enGB}>
          <Router history={history}>
            <Switch>

              <Redirect exact from="/" to="/store/areas" />
              <Route path="/login" render={props => <Login submitting={false} />} />
              <Route path="/store/" render={props => <StoreLayout {...props} {...storepassProps} />} />
              <Route path="/travel/" render={props => <TravelLayout {...props} {...travelpassProps} />} />

            </Switch>
          </Router>
        </LocaleProvider>
      </IntlProvider>
    </HighchartsProvider>
  );
}

export default RouterConfig;
