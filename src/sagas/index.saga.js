import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import { setCourseData, setAllCourses, addRoute, userSession, registrationSuccess, isLoggedIn } from '../state/app.action';
import { get, post } from '../utils/api';
import { getDirectionCoordinates } from '../utils/googleAPI';
import { isUserAuthenticated, addSessionToken, removeSessionToken } from '../utils/storage';

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

function* getRoute() {
  while (true) {
    const action = yield take(types.GET_ROUTE);
    const response = yield call(getDirectionCoordinates, action.startPoint, action.endPoint);
    yield put(addRoute(response));
  }
}

function* watchIsLoggedIn() {
  while (true) {
    const action = yield take(types.IS_LOGGED_IN);
    const response = yield call(isUserAuthenticated);
    yield put(userSession(response));
  }
}

function* watchRegisterUser() {
  while (true) {
    const { username, password } = yield take(types.REGISTER_USER);
    // Register and get token from back-end
    const { token } = yield call(post, '/register', { username, password });
    // Store token to asyncStorage
    yield call(addSessionToken, token);
    // Send confirmation for redirection
    yield put(isLoggedIn());
  }
}

function* watchLoginUser() {
  while (true) {
    const { username, password } = yield take(types.LOGIN);
    // Register and get token from back-end
    const { token } = yield call(post, '/login', { username, password });
    // Store token to asyncStorage
    yield call(addSessionToken, token);
    // Send confirmation for redirection
    yield put(isLoggedIn());
  }
}

function* watchLogoutUser() {
  while (true) {
    yield take(types.LOGOUT);
    yield call(removeSessionToken);
    yield put(isLoggedIn());
  }
}

export default function* root() {
  yield fork(watchCourse);
  yield fork(watchNewCourse);
  yield fork(getRoute);
  yield fork(watchIsLoggedIn);
  yield fork(watchRegisterUser);
  yield fork(watchLoginUser);
  yield fork(watchLogoutUser);
}
