import { take, put, call, fork } from 'redux-saga';
import * as types from '../state/actiontypes';
import * as actions from '../state/app.action';
import { get, post, del, getMessageFromError } from '../utils/api';
import { getDirectionCoordinates } from '../utils/googleAPI';
import { isUserAuthenticated, addSession, removeSessionToken, getSession } from '../utils/storage';
import { Actions } from 'react-native-router-flux';


function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(true), ms))
}

function* addMessage(message, delayAmount = 3000) {
  yield put(actions.addMessage(message));
  // Show message for 3 seconds
  yield call(delay, delayAmount);
  yield put(actions.clearMessage());
}

function* authorizedNetworkCall(method, path, data, token) {
  try {
    const response = yield call(method, path, data, token);
    if (response.status === 401) {
      yield put(actions.isLoggedIn());
    }
    return response.body;
  } catch (error) {
    throw error;
  }
}

function* getCourseData(courseCode, token) {
  try {
    const courseData = yield call(authorizedNetworkCall, get, `course/${courseCode}`, token);
    yield put(actions.updateCourseData(courseData));
  } catch (error) {
    const errorMessage = getMessageFromError(error, 'Unable to get fetch course data');

    // Put error message to message store
    yield addMessage({ type: 'error', content: errorMessage });
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

      // Clear possible old courses (eg. when logout => login again)
      yield put(actions.clearCourses());

      // Fetch course related data for every course
      // Wait for every call to finnish
      if (courses.length) {
        yield courses.map( (courseCode) => call(getCourseData, courseCode, token));
      }
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
    // Set isFetching to true
    yield put(actions.setCoursesLoadingStatus(true));
    // Get session
    const { token, uid } = yield call(getSession);
    // Post new course to user data GET new courses as return value
    try {
      const response = yield call(authorizedNetworkCall, post, `/user/${uid}/courses/${courseCode}`, {}, token);

      yield call(getCourseData, response.course.code);

      yield put(actions.setCoursesLoadingStatus(false));
      yield addMessage({ type: 'success', content: 'Course added successfully!' });
      // TODO: yield put(actions.navigate('calendar'));
    } catch (error) {
      const errorMessage = getMessageFromError(error, 'Could not add new course. Check the course code!');

      // Put error message to message store
      yield put(actions.setCoursesLoadingStatus(false));
      yield addMessage({ type: 'error', content: errorMessage });
    }
  }
}

function* watchRemoveCourse(getState, action) {
  while (true) {
    // Catch action dispatch
    const { courseCode } = yield take(types.REMOVE_COURSE);
    // Set isFetching to true
    yield put(actions.setCoursesLoadingStatus(true));
    // Get session
    const { token, uid } = yield call(getSession);
    // Post new course to user data GET new courses as return value
    try {
      const currentState = getState();
      const response = yield call(authorizedNetworkCall, del, `/user/${uid}/courses/${courseCode}`, token);

      yield put(actions.removeCourse());
      yield put(actions.setCoursesLoadingStatus(false));
      yield addMessage({ type: 'success', content: 'Course removed successfully!' });
    } catch (error) {
      console.log(error);
      const errorMessage = getMessageFromError(error, 'Could not remove course.');

      yield put(actions.setCoursesLoadingStatus(false));
      // Put error message to message store
      yield addMessage({ type: 'error', content: errorMessage });
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
    yield take(types.IS_LOGGED_IN);
    const response = yield call(isUserAuthenticated);
    yield put(actions.userSession(response));
  }
}

function* watchRegisterUser() {
  while (true) {
    const { username, password } = yield take(types.REGISTER_USER);

    try {
      // Register and get token from back-end
      const { body } = yield call(post, '/register', { username, password });

      const { token, user } = data;
      // Store token to asyncStorage
      yield call(addSession, token, user._id);
      // Send confirmation for redirection
      yield put(actions.isLoggedIn());
      // Pass credentials to app state
      yield put(actions.credentials(token, user._id));
    } catch(error) {
      const errorMessage = getMessageFromError(error, 'Unable to register new user');

      // Put error message to message store
      yield addMessage({ type: 'error', content: errorMessage });
    }
  }
}

function* watchLoginUser() {
  while (true) {
    const { username, password } = yield take(types.LOGIN);
    // Register and get token from back-end
    try {
      const { body } = yield call(post, '/login', { username, password });
      const { token, user } = body;
      // Store token to asyncStorage
      yield call(addSession, token, user._id);
      // Send confirmation for redirection
      yield put(actions.isLoggedIn());
      // Pass credentials to app state
      yield put(actions.credentials(token, user._id));
    } catch(error) {
      console.log(error);
      const errorMessage = getMessageFromError(error, 'Could not login with the given credentials');

      // Put error message to message store
      yield addMessage({ type: 'error', content: errorMessage });
    }
  }
}

function* watchLogoutUser() {
  while (true) {
    yield take(types.LOGOUT);
    yield call(removeSessionToken);
    yield put(actions.isLoggedIn());
  }
}

function* watchNavigate() {
  while (true) {
    const { routeName } = yield take(types.NAVIGATE);
    console.log(`===> NAVIGATE TO: ${routeName}`);

    // NOTE: it is not possible to navigate to inner routes (?)
    switch (routeName) {
      case 'app': return Actions.app();
      case 'home': return Actions.app();
      case 'calendar': return Actions.app();
      case 'spaceMap': return Actions.spaceMap();
      case 'addCourse': return Actions.addCourse();
      case 'login': return Actions.login();
      default: return Actions.app();
    }
  }
}

export default function* root(getState) {
  yield fork(watchCourses);
  yield fork(watchNewCourse);
  yield fork(watchRemoveCourse, getState);
  yield fork(watchGetRoute);
  yield fork(watchIsLoggedIn);
  yield fork(watchRegisterUser);
  yield fork(watchLoginUser);
  yield fork(watchLogoutUser);
  yield fork(watchNavigate);
}
