// All API calls
import { delay } from '../services';
// Dummy data
import { courseA0107 as MSA0107 } from '../state/dummydata';


const TIMEOUT = 5000;

function url(path) {
  const apiRoot ='localhost:8082';
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;

}

async function request(path='/dummypath', options) {
  // Get full path
  const endpoint = url(path);

  try {
    // No real API connected yet
    switch (options.method) {
      case 'GET':
        await delay(500);
        return { body: MSA0107 };
      case 'PUT':
        return [];
      case 'POST':
        return {
          body: [options.body]
        };
      default:
        return [];

    }
    // WHEN API connected
    // const response = await timeout(fetch(endpoint, options), TIMEOUT);
    // return resonse;
  } catch(error) {
    throw error;
  }
}

export async function get(path) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  };

  const response = await request(path, options);

  return response.body;
}

export async function put(path, data) {
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  };

  const response = await request(path, options);

  return response.body;
}

export async function post(path, data) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  };

  const response = await request(path, options);

  return response.body;
}
