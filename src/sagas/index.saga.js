import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import { setCourseData, setAllCourses } from '../state/app.action';
import { get, post } from '../utils/api';

function* watchCourse() {
  while (true) {
    // Catch action dispatch
    yield take(types.GET_COURSE_DATA);
    // Get data from server
    const courseData = yield call(get);
    // Update state
    yield put(setCourseData(courseData));
  }
}

function* watchNewCourse() {
  while (true) {
    // Catch action dispatch
    const action = yield take(types.ADD_COURSE_SAGA);
    // Post new course to user data GET new courses as return value
    const response = yield call(post, '/dummy', { data: action.courseCode });
    // Update courses
    yield put(setAllCourses(response));
  }
}

export default function* root() {
  yield fork(watchCourse);
  yield fork(watchNewCourse);
}
