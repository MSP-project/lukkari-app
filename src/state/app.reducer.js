import { combineReducers } from 'redux';
import _ from 'lodash';

import { Actions } from 'react-native-router-flux';

import * as types from './actiontypes';

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


const coursesInitialState = {
  calendarFormat: {
    sections: [],
    rows: [],
    dataBlob: {}
  },
  allEvents: {},
  courses: [],
  isFetching: false
};

// Reducer for course specific actions
function courses(state = coursesInitialState, action) {
  switch (action.type) {
    case types.UPDATE_COURSE:
      const allEvents = _
        .chain(action.courseData.events)
        .map( (event) => event.subEvents
          .map( (subEvent, index) => Object.assign(_.omit(event, 'subEvents'), subEvent) ))
        .flatten()
        .sortBy(['date'])
        .value();

      const calendarFormat = _
        .chain(allEvents)
        .groupBy('date')
        .map( (value, key) => value )
        .value();

      const tmpCalendarFinal = {
        dataBlob: {},
        sections: calendarFormat.map( (section, index) => `SectionID${index}` ),
        rows: calendarFormat.map( (section) => section.map( (row, index) => `RowID${index}`))
      };

      const calendarFormatFinal = calendarFormat
        .reduce( (obj, section, index) => {
          const sectionObj = { [`SectionID${index}`]: { date: section[0].date } };
          const itemObj = section.reduce( (itemPrev, itemCurr, itemIndex, arr ) => {
            const eventObj = {
              header: itemCurr.type,
              start: itemCurr.startTime,
              end: itemCurr.endTime,
              location: 'NaN',
              last: (arr.length - 1) === itemIndex ? true : false
            };
            return Object.assign(itemPrev, { [`SectionID${index}:RowID${itemIndex}`]: eventObj })
          }, sectionObj)
          return Object.assign(obj, { dataBlob: Object.assign(obj.dataBlob, itemObj) });
        }, tmpCalendarFinal);
      console.log(state);
      return Object.assign(state, { calendarFormat: calendarFormatFinal });
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

const appState = {
  redirect: false,
  redirectLocation: null,
  token: null,
  uid: null
};

function application(state = appState, action) {
  switch (action.type) {
    case types.CREDENTIALS:
      const { token, uid } = action;
      return Object.assign(state, { token, uid });
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
  loginForm,
  application
});

export default rootReducer;
