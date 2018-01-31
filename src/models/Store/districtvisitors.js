import { queryDistrictVisitors } from '../../services/ng_event_api';

export default {
  namespace: 'districtvisitors',

  state: {
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
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDistrictVisitors, payload);

      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        visitors: action.payload,
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
