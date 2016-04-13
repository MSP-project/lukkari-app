import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import * as actions from '../state/app.action';
import { get, post } from '../utils/api';
import { getDirectionCoordinates } from '../utils/googleAPI';
import { isUserAuthenticated, addSession, removeSessionToken, getSession } from '../utils/storage';

function* authorizedNetworkCall(method, path, data, token) {
  const response = yield call(method, path, data, token);
  // TODO: Do something fun, if the status code is not 200
  return response;
}

function* getCourseData(courseCode, token) {
  try {
    const courseData = yield call(authorizedNetworkCall, get, `course/${courseCode}`, token);
    yield put(actions.updateCourseData(courseData));
  } catch (error) {
    throw error
  }
}

function* watchCourses() {
  while (true) {
    // Catch action dispatch
    yield take(types.GET_ALL_COURSES);
    // Get session
    const { token, uid } = yield call(getSession);
    try {
      // Get all courses that user has added
      const courses = yield call(authorizedNetworkCall, get, `user/${uid}/courses`, token);
      // Fetch course related data for every course
      // Wait for every call to finnish
      yield courses.map( (course) => call(getCourseData, course, token));
    } catch (error) {
      alert(error);
    }
    // State => not loading anymore.
    // TODO: THIS
    yield put(actions.allCourseDataReceived());
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
      yield put(actions.setAllCourses(response.course.code))
    } catch (error) {
      alert(error);
    }

  }
}

function* watchGetRoute() {
  while (true) {
    const action = yield take(types.GET_ROUTE);
    const response = yield call(getDirectionCoordinates, action.startPoint, action.endPoint);
    yield put(actions.addRoute(response));
  }
}

function* watchIsLoggedIn() {
  while (true) {
    const action = yield take(types.IS_LOGGED_IN);
    const response = yield call(isUserAuthenticated);
    yield put(actions.userSession(response));
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
    yield put(actions.isLoggedIn());
    // Pass credentials to app state
    yield put(actions.credentials(token, user._id));
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
    yield put(actions.isLoggedIn());
    // Pass credentials to app state
    yield put(actions.credentials(token, user._id));

  }
}

function* watchLogoutUser() {
  while (true) {
    yield take(types.LOGOUT);
    yield call(removeSessionToken);
    yield put(actions.isLoggedIn());
  }
}

export default function* root() {
  yield fork(watchCourses);
  yield fork(watchNewCourse);
  yield fork(watchGetRoute);
  yield fork(watchIsLoggedIn);
  yield fork(watchRegisterUser);
  yield fork(watchLoginUser);
  yield fork(watchLogoutUser);
}
