import React from 'react-native';
import { Router, Route, Schema, TabBar, Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/app.action';

import Calendar from './calendar.view';
import SpaceView from './space.view';
import Home from './home.view';
import Settings from './settings.view';

import TabIcon from '../components/tabicon.component';
import AddCourse from '../components/addCourse.component';
import Login from '../components/login.component';
import Icon from 'react-native-vector-icons/Ionicons';


const {
  StyleSheet,
  TouchableOpacity,
  Text,
  PropTypes,
  View,
} = React;

const propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'rgba(255, 103, 31,0.9)',
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0
  },
  titleStyle: {
    color: 'white',
  },
  backButtonStyle: {
    tintColor: 'white'
  },
  barRightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barRightButton: {
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barRightButtonText: {
    color: 'white',
    marginTop: 5,
    marginRight: 10,
    fontSize: 30,
    fontWeight: '300'
  }
});

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    isLoggedIn();
  }

  componentDidUpdate() {
    const { loggedIn, application } = this.props;
    if (!loggedIn) {
      Actions.login();
    }
  }

  _showNavbar() {
    return false;
  }

  _renderRightButton() {
    const { title } = this.props;
    const addIcon = <Icon name='ios-plus-empty' size={30} color='#fff'/>
    const settingsIcon = <Icon name='gear-a' size={30} color='#fff' />;

    let addCourseBtn;
    let settingBtn;
    if (title === 'Home') {
      addCourseBtn = (
        <TouchableOpacity
          onPress={ Actions.addCourse }
          style={ styles.barRightButton }
        >
          <Text style={ styles.barRightButtonText }>
            {addIcon}
          </Text>
        </TouchableOpacity>
      );
    }
    if (title !== 'Settings') {
      settingBtn = (
        <TouchableOpacity
          onPress={ Actions.settings }
          style={ styles.barRightButton }
        >
          <Text style={ styles.barRightButtonText }>
            {settingsIcon}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={ styles.barRightButtons }>
        {settingBtn}
        {addCourseBtn}
      </View>
    );
  }

  render() {


    const tabViewStyle = {
      showNavigationBar: false,
      titleStyle: styles.header,
    };

    return (
      <Router
        initial="app"
        hideNavBar={ this._showNavbar }
        navigationBarStyle={ styles.navigationBar }
        titleStyle={styles.titleStyle}
        barButtonIconStyle={ styles.backButtonStyle }
        renderRightButton = { this._renderRightButton }
      >
        <Schema name="default"/>
        <Schema name="tab" type="switch" icon={ TabIcon } />

        <Route name="app" initial="home">
          <Router footer={ TabBar } {...tabViewStyle} >
            <Route schema="tab" name="home" title="Home" component={ Home }/>
            <Route schema="tab" name="calendar" title="Calendar" component={ Calendar } />
          </Router>
        </Route>
        <Route
          wrapRouter
          hideNavBar={ false }
          schema="default"
          name="settings"
          title="Settings"
          component={ Settings }
        />
        <Route
          wrapRouter
          hideNavBar={ false }
          schema="default"
          name="spaceMap"
          title="Map"
          component={ SpaceView }
        />
        <Route
          wrapRouter
          hideNavBar={ false }
          name="addCourse"
          schema="default"
          component={ AddCourse }
          title="Follow Course"
        />
        <Route
          name="login"
          component={ Login }
          title="Login"
          schema="modal"
          wrapRouter
        />
      </Router>
    );
  }
}
AppView.propTypes = propTypes;

// export default AppView;

export default connect(
  state => ({
    application: state.application,
    loggedIn: state.userSession
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(AppView);
