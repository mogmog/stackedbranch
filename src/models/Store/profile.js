import { queryProfile} from '../../services/ng_event_api';
import crossfilter from 'crossfilter2/crossfilter';
import _ from 'lodash';
import * as d3 from 'd3';

class Profile {

  constructor(data) {
    this.data = data;

    const ndx = crossfilter(this.data);

    this.genderDimension = ndx.dimension(d => d.gender);
    this.genderDimensionCount = this.genderDimension.group();

    this.ageDimension = ndx.dimension(d => d.age);
    this.ageDimensionCount = this.ageDimension.group();
  }

  getGroupedByGender(district) {
    const buckets = {f : 0, m: 0, total : 0};
    const grouped= _(this.data).filter(x => x.name_province === district).groupBy(x => x.gender).value();
    _(grouped).forEach((items, key) => {
      buckets[key] = items.length;
      buckets.total += items.length;
    });

    return buckets;
  }

  getGroupedByGenderAndAge(district) {
    const entries= _(this.data).filter(x => x.name_province === district).value();

    /*'group by' 2 fields*/
    return d3.nest()
      .key((d) => d.gender).sortKeys(d3.descending)
      .key((d) => d.age).sortKeys(d3.ascending)
      .entries(entries);
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
