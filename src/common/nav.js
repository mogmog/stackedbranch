import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: 'Basic', // for breadcrumb
    path: '/',

    children: [

      {
        name: 'Luca Store',
        icon: 'shop',
        path: 'store',
        children: [

          {
            name: 'Area Definition',
            icon: 'compass',
            path: 'areas',
            component: dynamicWrapper(app, ['area'], () => import('../routes/AreaDefinition/index')),
          },

          {
            name: 'Compare my areas',
            icon: 'profile',
            path: 'areacomparison',
            component: dynamicWrapper(app, ['area', 'comparisoncard'], () => import('../routes/AreaComparison/index')),
          },

          {
            name: 'Small cells',
            icon: 'api',
            path: 'smallcells',
            component: dynamicWrapper(app, ['smallcell', 'site'], () => import('../routes/SmallCell')),
          },

          {
            name: 'Key dates',
            icon: 'calendar',
            path: 'dates',
            component: dynamicWrapper(app, ['date'], () => import('../routes/Dates/Define')),
          },

          {
            name: 'Cell Select',
            icon: 'api',
            path: 'cellselect',
            component: dynamicWrapper(app, [], () => import('../routes/CellSelect')),
          },

          {
            name: 'Site Dashboard',
            icon: 'shop',
            path: 'sites',
            component: dynamicWrapper(app, ['site', 'sitecomparison'], () => import('../routes/SiteComparison')),
          },

          {
            name: 'Analysis',
            icon: 'form',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },


        ],
      },

      {
        name: 'Luca Tourism',
        icon: 'global',
        path: 'tourism',
        children: [],
      },

      {
        name: 'Luca Transit',
        icon: 'car',
        path: 'transit',
        children: [],
      },

      {
        name: 'Luca Audience',
        icon: 'user',
        path: 'audience',
        children: [],
      },

    ],
  },
];
