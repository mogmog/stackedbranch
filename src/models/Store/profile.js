import { queryProfile} from '../../services/ng_event_api';
import crossfilter from 'crossfilter2/crossfilter';
import _ from 'lodash';

class Profile {

  constructor(data) {
    this.data = data;

    const ndx = crossfilter(this.data);

    this.genderDimension = ndx.dimension(d => d.gender);
    this.genderDimensionCount = this.genderDimension.group();

    this.ageDimension = ndx.dimension(d => d.age);
    this.ageDimensionCount = this.ageDimension.group();


    this.ageDimensionCountPercent = this.ageDimensionCount.reduce(
      function(p, v) {
        console.log(p);
        ++p.count;
        return p;
      },
      function(p, v) {
        --p.count;
        return p;
      },
      function() {
        return {
          count: 0,
        };
      }
    );
  }

  getGroupedByGender(district) {
    const buckets = {f : 0, m: 0, total : 0};
    const grouped= _(this.data).filter(x => x.name_province === district).groupBy(x => x.gender).value();

    _(grouped).forEach((items, key) => {
      buckets[key] = items.length;
      buckets.total += items.length;
    });

    buckets.getHighest = function() {
      if (this.total === 0) return 0;
      return (this.f > this.m) ? (this.f/this.total) : (this.m/this.total)
    };

    return buckets;
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
