import { googleDirectionApiKey } from '../services/.env';
import _ from 'lodash';

export async function getDirectionCoordinates(startPoint, endPoint) {
  const endpoint = 'https://maps.googleapis.com/maps/api/directions/json?';

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  };
  const queryString = `origin=${startPoint.latitude},${startPoint.longitude}&destination=${endPoint.latitude},${endPoint.longitude}&key=${googleDirectionApiKey}`;

  try {
    let response = await fetch(endpoint + queryString, options);
    let responseJson = await response.json();

    // Reshape the data for map overlay
    const coordinateArray = _
      .chain(responseJson.routes[0].legs[0].steps)
      .map( (obj) => {
        return [
          {
            latitude: obj.start_location.lat,
            longitude: obj.start_location.lng
          },
          {
            latitude: obj.end_location.lat,
            longitude: obj.end_location.lng,
          }
        ]}
      )
      .flatten()
      .value();
    return coordinateArray;
  }
  catch(error) {
    throw error;
  }
}
