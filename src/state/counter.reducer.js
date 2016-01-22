import * as types from './counter.actiontypes';
import Immutable from 'immutable';

// Initial immutable data structure type of map
const initialState = Immutable.Map({
  processing: false,
  count: 666
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
      // Returns new immutable object with key count changed to new value
      // Temporary object for multiple changes.
      // This improves performance.
      return state.withMutations((state) => {
        state.set('count', state.get('count') + 1).set('processing', false)
      });
    case types.DECREMENT:
      return state.set('count', state.get('count') - 1);
    case types.STATE_PROCESSING:
      return state.set('processing', true);
    case types.STATE_NORMAL:
      return state.set('processing', false);
    default:
      return state;
  }
}
