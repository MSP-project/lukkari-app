import React from 'react-native';

const { AsyncStorage } = React;

async function _getValue(key) {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    throw error;
  }
}

async function _getMultiValue(keys) {
  try {
    return AsyncStorage.multiGet(keys);
  } catch (error) {
    throw error;
  }
}

async function _addValue(key, value) {
  try {
    if (value) {
      return AsyncStorage.setItem(key, value)
    }
  } catch (error) {
    throw error;
  }
}

async function _addMultipleValue(keyValues) {
  try {
    return AsyncStorage.multiSet(keyValues)
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

[['@AsyncStorage:token', "asdtoken"], ['@AsyncStorage:uid', "asduid"]].reduce( (prev, store) => {
  const key = store[0].substring(store[0].indexOf(":") + 1);
  const value = store[1];
  return Object.assign(prev, {[key]: value});
}, {})

export async function isUserAuthenticated() {
  return _getValue('@AsyncStorage:token')
    .then( (token) => token ? true : false)
    .catch( (error) => console.log('FAILED TO VALIDATE SESSION', error));
}

export async function getSession() {
  return _getMultiValue(['@AsyncStorage:token', '@AsyncStorage:uid'])
    .then(
      (stores) => stores.reduce(
        (prev, store) => {
          const key = store[0].substring(store[0].indexOf(":") + 1);
          const value = store[1];
          return Object.assign(prev, {[key]: value});
        }, {})
      )
    .catch( (error) => console.log('FAILED TO GET TOKEN'));
}

export async function addSession(token, uid) {
  return _addMultipleValue([['@AsyncStorage:token', token], ['@AsyncStorage:uid', uid]])
    .then(console.log(`SESSION ADDED: token=${token} uid=${uid}`))
    .catch(console.log(`SESSION ADD FAILED: token=${token} uid=${uid}`));
}

export async function removeSessionToken() {
  return _removeValue('@AsyncStorage:token')
    .then(true)
    .catch(false);
}
