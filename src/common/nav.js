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
        name: 'Areas',
        icon: 'compass',
        path: 'areas',
        component: dynamicWrapper(app, ['area'], () => import('../routes/AreaDefinition/AreaDefinitionTable')),
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

      {
        name: 'Comparison',
        icon: 'profile',
        path: 'comparison',
        component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      },
    ],

    childrenOld: [

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
        name: 'Comparison',
        icon: 'profile',
        path: 'comparison',
        component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      },
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: 'Analysis',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          {
            name: 'Monitor',
            path: 'monitor',
            component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
          },

        ],
      },
      {
        name: 'Form',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: 'Basic Form',
            path: 'basic-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
          },
          // {
          //   name: 'Step Form',
          //   path: 'step-form',
          //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
          //   children: [
          //     {
          //       path: 'confirm',
          //       component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
          //     },
          //     {
          //       path: 'result',
          //       component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
          //     },
          //   ],
          // },
          {
            name: 'Advanced Form',
            path: 'advanced-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
          },
        ],
      },
      {
        name: 'List',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: 'Table List',
            path: 'table-list',
            component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
          },
          {
            name: 'Basic List',
            path: 'basic-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
          },
          {
            name: 'Card List',
            path: 'card-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
          },
          {
            name: 'Cover Card List',
            path: 'cover-card-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/CoverCardList')),
          },
          {
            name: 'Filter Card',
            path: 'filter-card-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/FilterCardList')),
          },
          {
            name: 'Search',
            path: 'search',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/SearchList')),
          },
        ],
      },
      {
        name: 'PRofile',
        path: 'profile',
        icon: 'profile',
        children: [
          {
            name: 'Basic',
            path: 'basic',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
          },
          {
            name: 'Advanced',
            path: 'advanced',
            component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
          },
        ],
      },
      {
        name: 'Result',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: 'Success',
            path: 'success',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
          },
          {
            name: 'Fail',
            path: 'fail',
            component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
          },
        ],
      },
      {
        name: 'Pages',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: 'USer',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: 'Login',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: 'Register',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: 'Register',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: 'Blank',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
