import { queryPurchaseAffluence } from '../../services/ng_event_api';

export default {
  namespace: 'purchaseaffluence',

  state: {
    purchaseaffluence : {gender_age_rent: [], gender : []},
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryPurchaseAffluence, payload);

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
        purchaseaffluence: (action.payload),
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
