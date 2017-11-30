import dva from 'dva';
import { queryBasicProfile } from '../services/api';

export default {
  namespace: 'products',
  state: [],

  effects: {
    *fetchy({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryBasicProfile, payload);

      yield put({
        type: 'appendList',
        payload: Array.isArray(response.basicGoods) ? response : [],
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        products: (action.payload.basicGoods),
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

