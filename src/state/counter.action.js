import * as types from './counter.actiontypes';

export function increment() {
  return {
    type: types.INCREMENT,
  };
}

export function incrementAsync() {
  return {
    type: types.INCREMENT_ASYNC,
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function setProcessing() {
  return {
    type: types.STATE_PROCESSING
  };
}

export function setNormal() {
  return {
    type: types.STATE_NORMAL
  };
}
