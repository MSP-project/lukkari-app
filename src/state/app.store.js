import { createStore, combineReducers, applyMiddleware } from 'redux';
// Import reducers
import * as reducers from './index.reducers';
// Import saga related modules
import sagaMiddleware from 'redux-saga';
import sagas from '../sagas/index.saga';

// Combine reducers
const reducer = combineReducers(reducers);
// Create store
const createStoreWithSaga = applyMiddleware(
  sagaMiddleware(...sagas)
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithSaga(reducer, initialState);
}
