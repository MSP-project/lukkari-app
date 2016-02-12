import { combineReducers } from 'redux';

import * as types from './actiontypes';
import Immutable from 'immutable';


const eventsInitialState = Immutable.List([]);

// Reducer for event specific actions.
function events(state = eventsInitialState, action) {
  switch (action.type) {
    case types.UPDATE_EVENT:
      return state;
    default:
      return state;
  }
}


const coursesInitialState = Immutable.List([]);

// Reducer for course specific actions
function courses(state = coursesInitialState, action) {
  switch (action.type) {
    case types.SHOW_ALL_COURSES:
      return state;
    case types.SET_ALL_COURSES:
      return Immutable.List(action.newCourses);
    default:
      return state;
  }
}

const selectedCourseInitialState = Immutable.Map({
  courseMeta: {},
  events: []
});

function selectedCourse(state = selectedCourseInitialState, action) {
  switch (action.type) {
    case types.SET_COURSE_DATA:
      return state.withMutations((oldState) => {
        oldState.set('courseMeta', action.data.course).set('events', action.data.events);
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  events,
  courses,
  selectedCourse
});

export default rootReducer;
