import key from 'keymaster';

export default {
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return {...state, current: state.current - 1};
    },
  },
  effects: {
    * add(action, {call, put}) {
      yield call(delay, 10);
      yield put({type: 'minus'});
    },
  },
  subscriptions: {
    keyboardWatcher({dispatch}) {
      key('⌘+up, ctrl+up', () => {
        dispatch({type: 'add'})
      });
    },
  },
};



// ---------
// Helpers

function delay(timeout){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
