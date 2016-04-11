import * as types from './actiontypes';

/************************************
* "Selected course" related actions *
************************************/

export function setCourseData(courseData) {
  return {
    type: types.SET_COURSE_DATA,
    data: courseData
  };
}

/***************************
* "Course" related actions *
****************************/

export function getCourse(courseCode) {
  return {
    type: types.GET_COURSE_DATA,
    courseCode
  };
}

export function addCourse(courseCode) {
  return {
    type: types.ADD_COURSE_SAGA,
    courseCode
  };
}

/********************************
* "All Courses" related actions *
********************************/

export function getCourses() {
  return {
    type: types.GET_ALL_COURSES,
  };
}
// GET courses from server
export function updateCourses() {
  return {
    type: types.UPDATE_ALL_COURSES,
  };
}
// SET courses with list
export function setAllCourses(newCourses) {
  return {
    type: types.SET_ALL_COURSES,
    newCourses
  };
}

/********************************
* "All map" related actions *
********************************/
export function getRoute(startPoint, endPoint) {
  return {
    type: types.GET_ROUTE,
    startPoint,
    endPoint
  };
}

export function addRoute(coordinates) {
  return {
    type: types.ADD_ROUTE,
    coordinates
  }
}

/********************************
* All "Session" related actions *
********************************/
export function isLoggedIn() {
  return {
    type: types.IS_LOGGED_IN,
  };
}

export function userSession(sessionStatusBool) {
  return {
    type: types._IS_LOGGED_IN,
    statusBool: sessionStatusBool
  };
}

export function registerUser(username, password) {
  return {
    type: types.REGISTER_USER,
    username,
    password
  }
}

export function logoutUser() {
  return {
    type: types.LOGOUT
  }
}
