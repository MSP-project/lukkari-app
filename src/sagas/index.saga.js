import { take, put, call } from 'redux-saga'
import { delay } from '../services'
import * as types from '../state/counter.actiontypes';
import { increment, setProcessing, setNormal } from '../state/counter.action'

function* incrementAsync() {
  // This function simulates async call e.g. to external API.

  while(true) {

    // Wait for each INCREMENT_ASYNC action
    yield take(types.INCREMENT_ASYNC);
    // Set app state to processing
    yield put( setProcessing() );

    // Delay is a sample function
    // Return a Promise that resolves after (ms) milliseconds
    // Use call to improve testability
    yield call(delay, 1000);

    // Dispatch action INCREMENT_COUNTER with put
    yield put( increment() );
    yield put( setNormal() );
  }

}

export default [incrementAsync]
