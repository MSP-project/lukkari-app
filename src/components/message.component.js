import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearMessage } from '../state/app.action';

import Overlay from 'react-native-overlay';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
} = React;

// TODO what is androids navbar height?
const navbarHeight = Platform.OS === 'ios' ? 64 : 50;

const styles = StyleSheet.create({
  container: {
    marginTop: navbarHeight,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'rgba(255, 10, 10, 0.6)',
  },
  success: {
    backgroundColor: 'rgba(0, 167, 0, 0.6)',
  },
  btnText: {
    color: 'white',
  }
});


const propTypes = {
  message: PropTypes.object.isRequired,
  clearMessage: PropTypes.func.isRequired,
}

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1 }
    ).start();
  }


  render() {
    const { message } = this.props;

    if (!message.content) return null;

    const msgStyle = message.type === 'error'
      ? styles.error
      : styles.success;


    return (
      <Overlay isVisible={!!this.props.message.content} aboveStatusBar={false}>
        <Animated.View
          style={[styles.container, msgStyle, {opacity: this.state.fadeAnim}]}
        >
          <TouchableOpacity
            style={ styles.btnContainer }
            onPress={ this.props.clearMessage }
          >
            <Text style={ styles.btnText }>{message.content}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Overlay>
    );
  }
}

Message.propTypes = propTypes;

export default connect(
  state => ({ message: state.message }),
  dispatch => bindActionCreators({ clearMessage }, dispatch)
)(Message);
