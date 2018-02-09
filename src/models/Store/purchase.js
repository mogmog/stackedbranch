import { queryPurchase } from '../../services/ng_event_api';

class Purchases {

  constructor(data) {
    this.data = data;
  }

}

export default {
  namespace: 'purchase',

  state: {
    purchase : new Purchases([]),
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryPurchase, payload);

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
        purchase: new Purchases(action.payload),
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
