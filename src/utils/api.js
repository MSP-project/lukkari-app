// All API calls

const TIMEOUT = 5000;

function url(path) {
  // 146.185.150.48
  const apiRoot ='http://146.185.150.48:8082';
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;

}

async function request(path='/register', options) {
  // Get full path
  const endpoint = url(path);
  console.log("OPTIONS", options);
  console.log("ENDPOINT", endpoint);
  try {
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    return {
      body: responseJson,
      status: response.status
    }
  } catch(error) {
    throw error;
  }
}

export async function get(path, token='') {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await request(path, options);
  return response;
}

export async function put(path, data, token='') {
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  const response = await request(path, options);

  return response;
}

export async function post(path, data, token='') {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  const response = await request(path, options);

  return response;
}
