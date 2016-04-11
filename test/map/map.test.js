import { expect } from 'chai';
import Immutable from 'immutable';

import * as types from '../../src/state/actiontypes';
import reducers from '../../src/state/app.reducer'

import configureStore from '../../src/state/app.store';

describe('Map functionality', () => {

  describe('Initial state', () => {
    const store = configureStore();
    it('Map object initial state', () => {
      const state = {
        region: {
          latitude: 60.1887073,
          longitude: 24.8282191,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        },
        annotations: [{
          latitude: 60.1887073,
          longitude: 24.8282191,
          title: 'T-Talo',
          subtitle: 'Otakaari 8'
        }],
        overlays: []
      };
      console.log()
      const action = {type: types.INCREMENT};
      const result = mapData();

      expect(state).to.equal(result);
    });
  });
});
// // Import modules from redux-saga
// import { take, put, call } from 'redux-saga'
// // Import store
// import configureStore from '../../src/state/app.store';
// // Import sagas
// import sagas from '../../src/sagas/index.saga'
// // Import mock API
// import { delay } from '../../src/services'
// // Import actions
// import { increment, setProcessing, setNormal } from '../../src/state/counter.action'
//
// describe('Counter Async functionality', () => {
//   const store = configureStore();
//   // Get generator function (saga)
//   const iterator = sagas[0]();
//
//   describe('IncrementAsync by one', () => {
//     it('Take INCREMENT_ASYNC', () => {
//       // First yield
//       let actual = iterator.next().value;
//       let expected = take(types.INCREMENT_ASYNC);
//       expect(actual).to.deep.equal(expected);
//
//     });
//
//     it('Put STATE_PROCESSING', () => {
//       // Second yield
//       let actual = iterator.next().value;
//       let expected = put(setProcessing());
//       expect(actual).to.deep.equal(expected);
//
//     });
//
//     it('Call API', () => {
//       // Third yield
//       let actual = iterator.next().value;
//       let expected = call(delay, 1000);
//       expect(actual).to.deep.equal(expected);
//
//     });
//   });
// });
