import { queryDistrictVisitors, queryDistrictAttractionTotals } from '../../services/ng_event_api';
import * as d3 from 'd3';

class AttractionTotal {

  constructor(data) {
    this.data = data.totals.list;

    const total = "Influence area";

    const keys = this.data.map(x => ({name: x.zone_visitors, value: x.num_visitors}));

    keys.forEach(x => {
      x.percent = x.value / (keys.find(y => (y.name === total))).value;
      x.difference = ((keys.find(y => (y.name === total))).value) - x.value;
    });

    this.keys =  keys.reduce(function(map, obj) {
      map[obj.name] = obj;
      return map;
    }, {});

  }

  getDifference(key) {
    const formatter = x => d3.format('s')(Math.ceil(x/1000)*1000);
    return this.keys[key] ? formatter((this.keys[key].difference)) : 0;
  }

  getPercent(key) {
    return this.keys[key] ? d3.format('.1%')(this.keys[key].percent) : 0;
  }

  getValue(key) {
    return this.keys[key] ? d3.format(",")(this.keys[key].value) : 0;

  }

}

export default {
  namespace: 'districtvisitors',

  state: {
    attraction_totals : new AttractionTotal({totals : {list : []}}),
    visitors: {
      work : {
        list: [],
        pagination: {},
      },

      home : {
        list: [],
        pagination: {},
      }

    },
    loading: true,
  },

  effects: {
    *fetch_visitors({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDistrictVisitors, payload);

      yield put({
        type: 'save_visitors',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *fetch_attraction_totals({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDistrictAttractionTotals, payload);

      yield put({
        type: 'save_attraction_totals',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

  },

  reducers: {
    save_visitors(state, action) {
      return {
        ...state,
        visitors: action.payload,
      };
    },
    save_attraction_totals(state, action) {
      return {
        ...state,
        attraction_totals: new AttractionTotal(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
