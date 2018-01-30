import { queryOriginDestination  } from '../../services/api';

export default {
  namespace: 'origindestination',

  state: {
    origindestination: {
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
      const response = yield call(queryOriginDestination, payload);

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
        origindestination: action.payload,
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
