import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import { setCourseData } from '../state/app.action';
import { get } from '../utils/api';

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

export default function* root() {
  yield fork(watchCourse);
}
