import { queryAreas, saveArea} from '../services/api';

export default {
  namespace: 'area',

  state: {
    areas: {
      list: [],
      pagination: {},
    },
    cards: [],
    comparisoncards: [],
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryAreas, payload);

      yield put({
        type: 'save',
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

      yield call(saveArea, payload);

      const queryresponse = yield call(queryAreas, payload);

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
    save(state, action) {
      return {
        ...state,
        areas: action.payload,
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
