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
    component: dynamicWrapper(app, ["user", "login"], () =>
      import("../layouts/StoreLayout")
    ),
    layout: "StoreLayout",
    name: "Store", // for breadcrumb
    path: "/",

    children: [
      {
        name: "Attraction Power",
        category: "Overview",
        description:
          "Know your attraction power from total pedestrians to sales and take a general perspective of target.",
        icon: "IC-LUCA-STORE.svg",
        path: "store/attraction",
        margin: "24px 24px 0 ",
        component: dynamicWrapper(app, ["districtvisitors", "purchase"], () =>
          import("../routes/Store/Attraction/index")
        )
      },

      {
        name: 'Attraction Power Limited',
        category: "Overview",
        description: '___',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/attraction2',
        margin: '24px 24px 0 ',
        component: dynamicWrapper(app, ['districtvisitors', 'purchase'], () => import('../routes/Store/Attraction/index')),
      },

      {
        name: "Full Perspective",
        category: "Profiles",
        description:
          "Full and detailed profiles in each segment: catchment area, nearby, in-store and sales. It helps you to know your purchase profile compared to potential visitors.",
        icon: "IC-LUCA-AUDIENCE.svg",
        path: "store/fullperspective",
        component: dynamicWrapper(app, ["districtvisitors"], () =>
          import("../routes/Store/Attraction/index")
        )
      },

      {
        name: "Comparitive Zones",
        category: "Battleground",
        description:
          "Know the attraction power of different zones compared to your store for a given profile",
        icon: "IC-LUCA-STORE.svg",
        path: "store/battleground",
        component: dynamicWrapper(app, ["profile"], () =>
          import("../routes/Store/Battleground/index")
        )
      },

      {
        name: "Something",
        category: "Some Category",
        description: "___",
        icon: "IC-LUCA-STORE.svg",
        path: "store/buyerprofile",
        component: dynamicWrapper(app, ["districtvisitors"], () =>
          import("../routes/Store/Attraction/index")
        )
      },

      {
        name: 'Battleground',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/battleground',
        component: dynamicWrapper(app, ['profile'], () => import('../routes/Store/Battleground/index')),
      },

      {
        name: 'Crossfilter',
        icon: 'IC-LUCA-STORE.svg',
        path: 'store/crossfilter',
        component: dynamicWrapper(app, ['purchase_affluence'], () => import('../routes/Store/Crossfilter/index')),
      }


    /*  {
        PageTitle component
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
    ]
  }
];
