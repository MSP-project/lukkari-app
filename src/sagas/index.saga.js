import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import { setCourseData, setAllCourses, addRoute, userSession, registrationSuccess, isLoggedIn, credentials } from '../state/app.action';
import { get, post } from '../utils/api';
import { getDirectionCoordinates } from '../utils/googleAPI';
import { isUserAuthenticated, addSession, removeSessionToken, getSession } from '../utils/storage';

function* authorizedNetworkCall(method, path, data, token) {
  const response = yield call(method, path, data, token);
  // TODO: Do something fun, if the status code is not 200
  return response;
}

function* watchCourse() {
  while (true) {
    // Catch action dispatch
    const { courseCode } = yield take(types.GET_COURSE_DATA);
    // Get data from server
    const courseData = yield call(get, `course/${courseCode}`);
    // Update state
    yield put(setCourseData(courseData));
  }
}

function* watchNewCourse() {
  while (true) {
    // Catch action dispatch
    //TODO: Make sure that courseCode is always capital
    const { courseCode } = yield take(types.ADD_COURSE_SAGA);
    // Get session
    const { token, uid } = yield call(getSession);
    // Post new course to user data GET new courses as return value
    try {
      const response = yield call(authorizedNetworkCall, post, `/user/${uid}/courses/${courseCode}`, {}, token);
      yield put(setAllCourses(response.course.code))
    } catch (error) {
      alert(error);
    }

  }
}

function* watchGetRoute() {
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
    const { token, user } = yield call(post, '/register', { username, password });
    // Store token to asyncStorage
    yield call(addSession, token, user._id);
    // Send confirmation for redirection
    yield put(isLoggedIn());
    // Pass credentials to app state
    yield put(credentials(token, user._id));
  }
}

function* watchLoginUser() {
  while (true) {
    const { username, password } = yield take(types.LOGIN);
    // Register and get token from back-end
    const { token, user } = yield call(post, '/login', { username, password });
    // Store token to asyncStorage
    yield call(addSession, token, user._id);
    // Send confirmation for redirection
    yield put(isLoggedIn());
    // Pass credentials to app state
    yield put(credentials(token, user._id));

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
  yield fork(watchGetRoute);
  yield fork(watchIsLoggedIn);
  yield fork(watchRegisterUser);
  yield fork(watchLoginUser);
  yield fork(watchLogoutUser);
}
