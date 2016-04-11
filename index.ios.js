// Import framework methods
import React from 'react-native';
import { Provider } from 'react-redux';
// Import store
import configureStore from './src/state/app.store';
// Import views
import AppView  from './src/views/app.view'

const {
  AppRegistry,
  Text,
  View,
} = React;

class mspApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppView />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('mspApp', () => mspApp);
