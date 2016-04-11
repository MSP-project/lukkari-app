import React from 'react-native';

const { AsyncStorage } = React;

async function _getValue(key) {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    throw error;
  }
}

async function _addValue(key, value) {
  try {
    return AsyncStorage.setItem(key, value)
  } catch (error) {
    throw error;
  }
}

async function _addValue(key, value) {
  try {
    return AsyncStorage.setItem(key, value)
  } catch (error) {
    throw error;
  }
}

async function _removeValue(key, value) {
  try {
    return AsyncStorage.removeItem(key)
  } catch (error) {
    throw error;
  }
}



export async function isUserAuthenticated() {
  return _getValue('@AsyncStorage:session_token')
    .then( (token) => token ? true : false)
    .catch( (error) => console.log('FAILED TO VALIDATE SESSION', error));
}

export async function getSessionToken() {
  return _getValue('@AsyncStorage:session_token')
    .then( (token) => token)
    .catch( (error) => console.log('FAILED TO GET TOKEN'));
}

export async function addSessionToken(token) {
  return _addValue('@AsyncStorage:session_token', token)
    .then(true)
    .catch(false);
}

export async function removeSessionToken() {
  return _removeValue('@AsyncStorage:session_token')
    .then(true)
    .catch(false);
}
