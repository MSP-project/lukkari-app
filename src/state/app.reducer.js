import { combineReducers } from 'redux';

import * as types from './actiontypes';
import Immutable from 'immutable';


const eventsInitialState = [];

// Reducer for event specific actions.
function events(state = eventsInitialState, action) {
  switch (action.type) {
    case types.UPDATE_EVENT:
      return state;
    default:
      return state;
  }
}


const coursesInitialState = [];

// Reducer for course specific actions
function courses(state = coursesInitialState, action) {
  switch (action.type) {
    case types.SHOW_ALL_COURSES:
      return state;
    case types.SET_ALL_COURSES:
      return [action.newCourses];
    default:
      return state;
  }
}

const selectedCourseInitialState = {
  courseMeta: {},
  events: []
};

function selectedCourse(state = selectedCourseInitialState, action) {
  switch (action.type) {
    case types.SET_COURSE_DATA:
      return {
        courseMeta: action.data.course,
        events: action.data.events
      };
    default:
      return state;
  }
}

const mapInitialState = {
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

function mapData(state = mapInitialState, action) {
  switch (action.type) {
    case types.ADD_ROUTE:
      const newOverlay = state.overlays.concat([{
        coordinates: action.coordinates,
        strokeColor: '#f007',
        lineWidth: 3,
        id: "Route"
      }]);
      return Object.assign({}, state, state.overlays = newOverlay);
    default:
      return state;
  }
}

const userSessionState = true;

function userSession(state = userSessionState, action) {
  switch (action.type) {
    case types._IS_LOGGED_IN:
      return action.statusBool;
    default:
      return state;
  }
}

const loginFormState = {
  usernameDublicate: false,
};

function loginForm(state = loginFormState, action) {
  switch (action.type) {
    case types.REGISTRATION_FAIL:
      return Object.assign(state, { usernameDublicate: true });
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  events,
  courses,
  selectedCourse,
  mapData,
  userSession,
  loginForm
});

export default rootReducer;
