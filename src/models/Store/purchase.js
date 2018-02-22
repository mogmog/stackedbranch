import { queryPurchase } from '../../services/ng_event_api';
import _ from 'lodash';

/*wrapper of what comes back from db*/
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
    visitors : new Purchases({days : [], gender : [], gender_age : []}),
    workers  : new Purchases({days : [], gender : [], gender_age : []}),
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryPurchase, payload);

      /*pick the right reducer depending on the payload*/
      yield put({
        type: payload.type_visitor === 'Visitor' ? 'save_visitors' : 'save_workers',
        payload: response,
      });

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

  },

  reducers: {

    clear() {
      return {
        visitors : new Purchases({days : [], gender : [], gender_age : []}),
        workers  : new Purchases({days : [], gender : [], gender_age : []}),
        loading: true,
      }
    },

    save_visitors(state, action) {
      return {
        ...state,
        visitors: new Purchases(action.payload),
      };
    },

    save_workers(state, action) {
      return {
        ...state,
        workers: new Purchases(action.payload),
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
