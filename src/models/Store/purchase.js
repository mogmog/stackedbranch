import { queryPurchase } from '../../services/ng_event_api';
import _ from 'lodash';

class Purchases {

  constructor(data) {
    this.days             = data.days;
    this.gender_totals    = _(data.gender).groupBy('gender').value();
    this.groupedByGender  = _(data.gender_age).groupBy('gender').value();

  }

}

export default {
  namespace: 'purchase',

  state: {
    purchase : new Purchases({days : [], gender : [], gender_age : []}),
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
