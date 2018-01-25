import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/Travel/${m}.js`)),
  component,
});

// nav data
export const getTravelNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/TravelLayout')),
    layout: 'TravelLayout',
    name: 'Travel', // for breadcrumb
    path: '/',

    children: [

      {
        name: 'TRAVELY THING',
        icon: 'compass',
        path: 'travel/areas',
        component: (x) => <span>blah</span>,
      },


    ],
  },
];
