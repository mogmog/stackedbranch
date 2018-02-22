import dynamic from "dva/dynamic";
import { routerRedux } from "dva/router";

// wrapper of dynamic
const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models.map(m => import(`../models/Store/${m}.js`)),
    component
  });

// nav data
export const getStoreNavData = app => [
  {
    component: dynamicWrapper(app, ["user", "login"], () => import("../layouts/StoreLayout")),
    layout: "StoreLayout",
    name: "Store", // for breadcrumb
    path: "/",

    children: [
      {
        name: "Attraction Power",
        icon: "ic-luca-store.svg",
        path: "store/attraction",
        margin: "24px 24px 0 ",
        component: dynamicWrapper(app, ["districtvisitors", "purchase"], () => import("../routes/Store/Attraction/index"))
      },

      {
        name: 'Attraction Power Limited',
        icon: 'ic-luca-store.svg',
        path: 'store/attraction2',
        margin: '24px 24px 0 ',
        component: dynamicWrapper(app, ['districtvisitors', 'purchase'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: "Full Perspective",
        icon: "ic-luca-audience.svg",
        path: "store/fullperspective",
        component: dynamicWrapper(app, ["districtvisitors"], () => import("../routes/Store/Attraction/index")),
      },

      {
        name: "Comparitive Zones",
        icon: "ic-luca-store.svg",
        path: "store/battleground",
        component: dynamicWrapper(app, ["profile"], () => import("../routes/Store/Battleground/index")),
      },

      {
        name: "Something",
        icon: "ic-luca-store.svg",
        path: "store/buyerprofile",
        component: dynamicWrapper(app, ["districtvisitors"], () => import("../routes/Store/Attraction/index")),
      },

      {
        name: 'Crossfilter',
        icon: "ic-luca-store.svg",
        path: 'store/crossfilter',
        component: dynamicWrapper(app, ['purchase_affluence'], () => import('../routes/Store/Crossfilter/index')),
      },
    ],
  },
];
