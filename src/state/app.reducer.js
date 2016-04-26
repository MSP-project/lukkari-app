import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import * as types from './actiontypes';


/* /////////////////////// HELPER FUCTIONS ////////////////////////////////// */
function getEventsGroupedByDate(events) {
  const eventsGroupedByDate = _
    .chain(events)
    .filter( (event) => event.date >= moment().startOf('day'))
    .groupBy('date')
    .map( (value) => value )
    .value();
  return eventsGroupedByDate;
}

function reduceCourseEvents(courseData, currState) {
  // TODO: If course already exists
  //  * Remove duplicates
  //  * or remove old and add new on top of it

  const allEvents = _
    .chain(courseData.events)
    .map( (event) => event.subEvents
      .map( (subEvent) => Object.assign({},
        _.omit(event, 'subEvents'),
        subEvent, courseData.course,
        { date: moment(subEvent.date, ['DD.MM.YY', 'MM-DD-YYYY']) })))
    .flatten()
    .concat(currState.allEvents)
    .sortBy(['date', 'startTime'])
    .value();

  const calendarFormat = getCalendarFormat(allEvents);

  return { allEvents, calendarFormat };
}

function getCalendarFormat(events) {
  // List of events grouped to nested array based on date
  const eventsGroupedByDate = getEventsGroupedByDate(events);

  const calendarFormatObj = {
    dataBlob: {},
    sections: eventsGroupedByDate.map( (section, index) => `SectionID${index}` ),
    rows: eventsGroupedByDate.map( (section) => section.map( (row, index) => `RowID${index}`))
  };

  const calendarFormat = eventsGroupedByDate
    .reduce( (obj, section, index) => {
      // Section header
      const sectionObj = { [`SectionID${index}`]: { date: moment(section[0].date).format('dddd, MMMM Do YYYY') } };

      // All events in one section
      const itemObj = section.reduce( (itemPrev, itemCurr, itemIndex, arr ) => {
        const eventObj = {
          type: itemCurr.type,
          courseCode: itemCurr.code,
          courseName: itemCurr.name,
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

    return calendarFormat;
}
/* ////////////////////////////////////////////////////////////////////////// */



/* /////////////////////// REDUCERS ///////////////////////////////////////// */
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
    case types.CLEAR_COURSES:
      return coursesInitialState;
    case types.SET_COURSES_LOADING:
    return Object.assign({}, state, {
      isFetching: action.loadingStatus,
    });
    case types.UPDATE_COURSES:
      const { courseData } = action;
      const { calendarFormat, allEvents } = reduceCourseEvents(courseData, state);

      // Return new state
      return Object.assign({}, state, {
        calendarFormat,
        allEvents,
        courses: state.courses.concat([action.courseData])
      });
    case types.SET_ALL_COURSES:
      // TODO: implement
      // but is this needed?
      return state;
    case types.REMOVE_COURSE:
      const newCourses = state.courses.filter((x) => x.course.code !== action.courseCode);
      const newAllEvents = state.allEvents.filter((x) => x.code !== action.courseCode);
      const newCalendarFormat = getCalendarFormat(newAllEvents);

      return Object.assign({}, state, {
        courses: newCourses,
        allEvents: newAllEvents,
        calendarFormat: newCalendarFormat,
      });
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
        id: 'Route'
      }]);
      return Object.assign({}, state, state.overlays = newOverlay);
    case types.REMOVE_ROUTE:
      return Object.assign({}, state, state.overlays = []);
    case types.COURSE_MAP:
      return state;
    case types.INIT_MAP:
      console.log("ACTION DATA", action.data);
      const annotations = action.data.location.map( (location, index) => Object.assign({}, {
        latitude: location.lat,
        longitude: location.lng,
        title: `${location.room}, ${location.building}`,
        subtitle: `${location.address}`,
        id: `Annotation${index}`,
        eventData: action.data
      }));
      const region = {
        latitude: action.data.location[0].lat,
        longitude: action.data.location[0].lng,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }
      return Object.assign({}, state, state.annotations = annotations, state.region = region);
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

const messageInitialState = {
  type: null,
  content: null,
};

function message(state = messageInitialState, action) {
  switch (action.type) {
    case types.MESSAGE_ADD:
      return Object.assign({}, state,
        { type: action.message.type, content: action.message.content }
      );
    case types.MESSAGE_CLEAR:
      return { type: null, content: null };
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
  application,
  message
});

export default rootReducer;
