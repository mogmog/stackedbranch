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
        name: 'Area Definition',
        icon: 'compass',
        path: 'areas',
        component: dynamicWrapper(app, ['area'], () => import('../routes/AreaDefinition/AreaDefinitionTable')),
      },

      {
        name: 'Compare my areas',
        icon: 'profile',
        path: 'areacomparison',
        component: dynamicWrapper(app, ['area', 'comparisoncard'], () => import('../routes/AreaComparison/AreaComparison')),
      },

      {
        name: 'Site Stuff',
        icon: 'shopping-cart',
        path: 'sites',
        component: dynamicWrapper(app, ['site', 'sitecomparison'], () => import('../routes/SiteComparison')),
      },

      {
        name: 'Dwell Dashboard',
        icon: 'dashboard',
        path: 'dwell',
        component: dynamicWrapper(app, ['form', 'rule'], () => import('../routes/Dwells/DwellSearchWizard')),
        children: [
          {
            path: 'date',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Dwells/DwellSearchWizard/Step2')),
          },
          {
            path: 'summary',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Dwells/DwellSearchWizard/Step3')),
          },
        ],
      },

      {
        name: 'Analysis',
        icon: 'form',
        path: 'analysis',
        component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
      },


    ],
  },
];
