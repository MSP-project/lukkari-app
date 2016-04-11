import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../state/app.action';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PropTypes
} = React;

const propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>LOGIN</Text>
      </View>
    );
  }
}


export default connect(
  state => ({}),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Login);
