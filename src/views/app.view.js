import React from 'react-native';
import { Router, Route, Schema } from 'react-native-router-flux';

import Counter from '../components/counter.component';
import SpaceView from './space.view';
import Home from './home.view';

const { Navigator } = React;

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight }/>
        <Route name="home" component={ Home } initial={ true } wrapRouter={ true } title="Home"/>
        <Route name="spaceMap" component={ SpaceView } title="Space Map"/>
        <Route name="counter" component={ Counter } title="Counter Component"/>
      </Router>
    );
  }
}

export default AppView;
