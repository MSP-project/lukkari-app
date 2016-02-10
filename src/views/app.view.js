import React from 'react-native';
import { Router, Route, Schema, TabBar } from 'react-native-router-flux';

import Calendar from './calendar.view';
import SpaceView from './space.view';
import Home from './home.view';

import TabIcon from '../components/tabicon.component';


const {
  Navigator,
  StyleSheet } = React;

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#FF9900',
    borderWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0
  },
});

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  _showNavbar() {
    return false;
  }

  render() {
    const tabViewStyle = {
      showNavigationBar: false,
      titleStyle: styles.header,
      navigationBarStyle: styles.navigationBar,
    };

    return (
      <Router initial="app" hideNavBar={ this._showNavbar }>
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight }/>
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
