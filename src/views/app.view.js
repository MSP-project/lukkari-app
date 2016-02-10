import React from 'react-native';
import { Router, Route, Schema, TabBar } from 'react-native-router-flux';

import Calendar from './calendar.view';
import SpaceView from './space.view';
import Home from './home.view';

import TabIcon from '../components/tabicon.component';


const {
  StyleSheet,
  TouchableOpacity,
  Text } = React;

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
    tintColor: 'white',
  },
  barRightButton: {
    paddingLeft: 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barRightButtonText: {
    color: 'white',
    marginTop: 5,
    marginRight: 10,
    fontSize: 25
  }
});

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  _showNavbar() {
    return false;
  }

  _renderRightButton() {
    const { title } = this.props;
    if (title === 'Home') {
      return (
        <TouchableOpacity
          onPress={ this._showNavbar }
          style={ styles.barRightButton }
        >
          <Text style={ styles.barRightButtonText }>+</Text>
        </TouchableOpacity>
      );
    }
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
        <Route name="app" initial="home" >
          <Router footer={ TabBar } {...tabViewStyle} >
            <Route schema="tab" name="home" title="Home" component={ Home }/>
            <Route schema="tab" name="calendar" title="Calendar" component={ Calendar } />
          </Router>
        </Route>
        <Route
          wrapRouter
          hideNavBar={ false }
          schema="default"
          name="spaceMap"
          title="Map"
          component={ SpaceView }
        />
      </Router>
    );
  }
}

export default AppView;
