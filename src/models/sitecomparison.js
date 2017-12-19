import { querySitesComparison } from '../services/api';

export default {
  namespace: 'sitecomparison_namespace',

  state: {
    sitecomparison: {list : [], grouped : []},

    filter : {
      selectedRow : [],
      selectedDates : [],
    },
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySitesComparison, payload);
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
        sitecomparison: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    clear() {

      return {
        sitecomparison: {list : [], grouped : []},

        filter : {
          selectedRow : [],
          selectedDates : [],
        },
        loading: true,
      };
    },
  },
};
