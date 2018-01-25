import { querySites } from '../../services/api';

export default {
  namespace: 'site_namespace',

  state: {
    sites: {
      list: [],
      pagination: {},
    },
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySites, payload);

      yield put({
        type: 'store',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    store(state, action) {
      return {
        ...state,
        sites: action.payload,
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
