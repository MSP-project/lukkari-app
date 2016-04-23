import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearMessage } from '../state/app.action';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} = React;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
  btnText: {
    color: 'white',
  }
});


const propTypes = {
  messages: PropTypes.object.isRequired,
  clearMessage: PropTypes.func.isRequired,
}

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.slideAnim,
      { toValue: 1 }
    ).start();
  }


  render() {
    const { message } = this.props;

    if (!message.content) return null;

    const msgStyle = message.type === 'error'
      ? styles.error
      : styles.success;


    const transform = {
      transform: [{
        translateY: this.state.slideAnim.interpolate({
           inputRange: [0, 1],
           outputRange: [100, 0]
         }),
       }],
     };

    return (
      <Animated.View style={ [styles.container, msgStyle, transform] }>
        <TouchableOpacity
          style={ styles.btnContainer }
          onPress={ this.props.clearMessage }
        >
          <Text style={ styles.btnText }>{message.content}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Message.propTypes = propTypes;

export default connect(
  state => ({ message: state.message }),
  dispatch => bindActionCreators({ clearMessage }, dispatch)
)(Message);
