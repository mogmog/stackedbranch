import { querySmallcells, saveSmallCell } from '../../services/api';

export default {
  namespace: 'smallcell_namespace',

  state: {
    smallcells: {
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
      const response = yield call(querySmallcells, payload);

      yield put({
        type: 'store',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *saveandfetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });

      yield call(saveSmallCell, payload);

      const queryresponse = yield call(querySmallcells, payload);

      yield put({
        type: 'save',
        payload: queryresponse,
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
        smallcells: action.payload,
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
