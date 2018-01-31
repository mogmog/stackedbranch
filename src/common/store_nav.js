import dynamic from 'dva/dynamic';

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
        name: 'Attraction',
        icon: 'compass',
        path: 'store/attraction',
        component: dynamicWrapper(app, ['districtvisitors'], () => import('../routes/Store/Attraction/index')),
      },

      {
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
      },

      {
        name: 'Analysis',
        icon: 'form',
        path: 'store/analysis',
        component: dynamicWrapper(app, ['chart', 'date'], () => import('../routes/Store/Dashboard/Analysis')),
      },
    ],
  },
];
