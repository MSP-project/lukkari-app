import * as types from './actiontypes';

export function getCourseData(courseCode) {
  return {
    type: types.GET_COURSE_DATA,
    courseCode
  };
}

export function setCourseData(courseData) {
  return {
    type: types.SET_COURSE_DATA,
    data: courseData
  };
}
