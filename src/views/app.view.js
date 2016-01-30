import React from 'react-native';

import Counter from '../components/counter.component';
import SpaceView from './space.view'

class AppView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SpaceView/>
    );
  }
}

export default AppView;
