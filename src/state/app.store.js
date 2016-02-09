import { createStore, applyMiddleware } from 'redux';
// Import reducers
import reducer from './app.reducer';
// Import saga related modules
import sagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index.saga';

// Create store
const createStoreWithSaga = applyMiddleware(
  sagaMiddleware(rootSaga)
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithSaga(reducer, initialState);
}
