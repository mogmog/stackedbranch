import { queryProfile} from '../../services/ng_event_api';
import crossfilter from 'crossfilter2/crossfilter';

class Profile {

  constructor(data) {
    this.data = data;

    const ndx = crossfilter(this.data);

    this.genderDimension = ndx.dimension(d => d.gender);
    this.genderDimensionCount = this.genderDimension.group();

    this.ageDimension = ndx.dimension(d => d.age);
    this.ageDimensionCount = this.ageDimension.group();


  }
}

export default {
  namespace: 'profile',

  state: {
    profile : new Profile([]),
    loading: true,
    },

  effects: {
    *fetch({ payload }, { call, put }) {

      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryProfile, payload);

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
        profile: new Profile(action.payload),
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
