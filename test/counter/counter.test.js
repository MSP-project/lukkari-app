import {expect} from 'chai';
import Immutable from 'immutable';
import * as types from '../../src/state/counter.actiontypes';
import counter from '../../src/state/counter.reducer'

describe('Counter functionality', () => {

  describe('Increment and Decrement', () => {
    it('Increment by one', () => {
      const state = Immutable.Map({
        processing: false,
        count: 666
      });
      const action = {type: types.INCREMENT};
      const nextState = counter(state, action);

      const result = Immutable.Map({
        processing: false,
        count: 667
      });

      expect(nextState).to.equal(result);
    });

    it('Decrement by one', () => {
      const state = Immutable.Map({
        processing: false,
        count: 666
      });
      const action = {type: types.DECREMENT};
      const nextState = counter(state, action);

      const result = Immutable.Map({
        processing: false,
        count: 665
      });

      expect(nextState).to.equal(result);
    });

    it('Increment by three', () => {
      const state = Immutable.Map({
        processing: false,
        count: 666
      });
      const action = {type: types.INCREMENT};

      var tmpStage;
      for (let i=0; i < 3; i++) {
          tmpStage = counter(tmpStage, action);
      };
      const nextState = tmpStage;

      const result = Immutable.Map({
        processing: false,
        count: 669
      });

      expect(nextState).to.equal(result);
    });
  });

  describe('Increment and Decrement', () => {
    it('State to processing', () => {
      const state = Immutable.Map({
        processing: false,
        count: 666
      });
      const action = {type: types.STATE_PROCESSING};
      const nextState = counter(state, action);

      const result = Immutable.Map({
        processing: true,
        count: 666
      });

      expect(nextState).to.equal(result);
    });

    it('State to normal', () => {
      const state = Immutable.Map({
        processing: true,
        count: 666
      });
      const action = {type: types.STATE_NORMAL};
      const nextState = counter(state, action);

      const result = Immutable.Map({
        processing: false,
        count: 666
      });

      expect(nextState).to.equal(result);
    });
  });
});
// Import modules from redux-saga
import { take, put, call } from 'redux-saga'
// Import store
import configureStore from '../../src/state/app.store';
// Import sagas
import sagas from '../../src/sagas/index.saga'
// Import mock API
import { delay } from '../../src/services'
// Import actions
import { increment, setProcessing, setNormal } from '../../src/state/counter.action'

describe('Counter Async functionality', () => {
  const store = configureStore();
  // Get generator function (saga)
  const iterator = sagas[0]();

  describe('IncrementAsync by one', () => {
    it('Take INCREMENT_ASYNC', () => {
      // First yield
      let actual = iterator.next().value;
      let expected = take(types.INCREMENT_ASYNC);
      expect(actual).to.deep.equal(expected);

    });

    it('Put STATE_PROCESSING', () => {
      // Second yield
      let actual = iterator.next().value;
      let expected = put(setProcessing());
      expect(actual).to.deep.equal(expected);

    });

    it('Call API', () => {
      // Third yield
      let actual = iterator.next().value;
      let expected = call(delay, 1000);
      expect(actual).to.deep.equal(expected);

    });
  });
});
