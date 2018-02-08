import dynamic from 'dva/dynamic';
import {routerRedux} from "dva/router";

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/Store/${m}.js`)),
  component,
});

// nav data
export const getStoreNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/StoreLayout')),
    layout: 'StoreLayout',
    name: 'Store', // for breadcrumb
    path: '/',

    children: [

      {
        name: 'Attraction Power',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/attraction',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: 'Full perspective',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/fullperspective',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: 'Buyer profile',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/buyerprofile',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: 'Comparative Zones',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/comparativezones',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: 'Comparative Profiles',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/comparativeprofiles',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

    /*  {
        name: 'Area Definition',
        icon: 'compass',
        path: 'store/areas',
        component: dynamicWrapper(app, ['area'], () => import('../routes/Store/AreaDefinition/index')),
      },

      {
        name: 'Compare my areas',
        icon: 'profile',
        path: 'store/areacomparison',
        component: dynamicWrapper(app, ['area', 'comparisoncard'], () => import('../routes/Store/AreaComparison/index')),
      },

      {
        name: 'Small cells',
        icon: 'api',
        path: 'store/smallcells',
        component: dynamicWrapper(app, ['smallcell', 'site'], () => import('../routes/Store/SmallCell')),
      },

      {
        name: 'Key dates',
        icon: 'calendar',
        path: 'store/dates',
        component: dynamicWrapper(app, ['date'], () => import('../routes/Store/Dates/Define')),
      },

      {
        name: 'Cell Select',
        icon: 'api',
        path: 'store/cellselect',
        component: dynamicWrapper(app, [], () => import('../routes/Store/CellSelect')),
      },

      {
        name: 'Site Dashboard',
        icon: 'shop',
        path: 'store/sites',
        component: dynamicWrapper(app, ['site', 'sitecomparison'], () => import('../routes/Store/SiteComparison')),
      },*/

/*      {
        name: 'Analysis',
        icon: 'form',
        path: 'store/analysis',
        component: dynamicWrapper(app, ['chart', 'date'], () => import('../routes/Store/Dashboard/Analysis')),
      },*/

      /*{
        name: 'Logout',
        icon: 'user',
        path: 'store/logout',
        component: (app) => { (app.history.push('/login')); return <span></span>},
      },*/

    ],
  },
];
