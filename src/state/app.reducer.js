import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';

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
  allEvents: [],
  courses: [],
  isFetching: false
};

// Reducer for course specific actions
function courses(state = coursesInitialState, action) {
  switch (action.type) {
    case types.UPDATE_COURSE:
      // TODO: location
      // All events in one array with
      const allEvents = _
        .chain(action.courseData.events)
        .map( (event) => event.subEvents
          .map( (subEvent, index) => Object.assign({},
            _.omit(event, 'subEvents'),
            subEvent, action.courseData.course,
            { date: moment(subEvent.date, ['DD.MM.YY', 'MM-DD-YYYY']) })))
        .flatten()
        .concat(state.allEvents)
        .sortBy(['date', 'startTime'])
        .value();

      // List of events grouped to nested array based on date
      const eventsGroupedByDate = _
        .chain(allEvents)
        .filter( (event) => event.date >= moment().startOf('day'))
        .groupBy('date')
        .map( (value, key) => value )
        .value();

      const calendarFormatObj = {
        dataBlob: {},
        sections: eventsGroupedByDate.map( (section, index) => `SectionID${index}` ),
        rows: eventsGroupedByDate.map( (section) => section.map( (row, index) => `RowID${index}`))
      };

      const calendarFormat = eventsGroupedByDate
        .reduce( (obj, section, index) => {
          // Section header
          const sectionObj = { [`SectionID${index}`]: { date: moment(section[0].date).format("dddd, MMMM Do YYYY") } };
          // All events in one section
          const itemObj = section.reduce( (itemPrev, itemCurr, itemIndex, arr ) => {
            const eventObj = {
              type: itemCurr.type,
              courseCode: itemCurr.code,
              courseName: itemCurr.name,
              header: `${itemCurr.code} - ${itemCurr.name}`,
              start: itemCurr.startTime,
              end: itemCurr.endTime,
              location: itemCurr.locations,
              last: (arr.length - 1) === itemIndex ? true : false
            };
            return Object.assign({}, itemPrev, { [`SectionID${index}:RowID${itemIndex}`]: eventObj })
          }, sectionObj)
          // Header and items combined with previous
          return Object.assign({}, obj, { dataBlob: Object.assign({}, obj.dataBlob, itemObj) });
        }, calendarFormatObj);
      // Return new state
      return Object.assign({}, state, {
        calendarFormat: calendarFormat,
        allEvents: allEvents,
        courses: state.courses.concat([action.courseData])
      });
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
    case types.COURSE_MAP:
      return state;
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
      return Object.assign({},state, { usernameDublicate: true });
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
      return Object.assign({}, state, { token, uid });
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
