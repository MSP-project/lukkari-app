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
export function clearCourses() {
  return {
    type: types.CLEAR_COURSES
  }
}

export function setAllCourses(newCourses) {
  return {
    type: types.SET_ALL_COURSES,
    newCourses
  };
}

export function allCourseDataReceived() {
  return {
    type: types.COURSES_LOAD_FINNISHED,
  }
}

export function updateCourseData(courseData) {
  return {
    type: types.UPDATE_COURSE,
    courseData
  }
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

export function removeRoute() {
  return {
    type: types.REMOVE_ROUTE
  }
}

export function initMap(data) {
  return {
    type: types.INIT_MAP,
    data
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

export function loginUser(username, password) {
  return {
    type: types.LOGIN,
    username,
    password
  }
}

export function logoutUser() {
  return {
    type: types.LOGOUT
  }
}

export function credentials(token, uid) {
  return {
    type: types.CREDENTIALS,
    token,
    uid
  }
}


/********************************
* All "Messages" related actions *
********************************/
export function clearMessage() {
  return {
    type: types.MESSAGE_CLEAR,
  };
}

export function addMessage(message) {
  return {
    type: types.MESSAGE_ADD,
    message,
  };
}



/********************************
* Navigation related actions *
********************************/
export function navigate(routeName) {
  return {
    type: types.NAVIGATE,
    routeName,
  };
}
