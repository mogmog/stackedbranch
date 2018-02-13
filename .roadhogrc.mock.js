import mockjs from 'mockjs';
import { getArea} from './mock/area';
import { getActivities, getNotice, getFakeList } from './mock/api';
import {getDistricts, getAttractionTotals} from './mock/ng_event';
import { getNotices } from './mock/notices';

const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  'GET /api/currentUser': {
    $desc: "Graham",
    $params: {
      pageSize: {
        desc: 'Blah',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /api/dates': {list : []},
  'GET /api/smallcells': {list : []},
  'GET /api/sites': {list : []},
  'GET /api/ng_event/districts' : getDistricts,
  'GET /api/ng_event/attractiontotals' : getAttractionTotals,
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/areas': getArea,
  'POST /api/areas': {
    $params: {
      pageSize: {
        desc: 'No idea',
        exp: 2,
      },
    },
    $body: getArea,
  },

};

export default noProxy ? {} : (proxy);
