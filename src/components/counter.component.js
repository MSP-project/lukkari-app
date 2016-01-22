import React, { PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';

import * as counterActions from '../state/counter.action';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} = React;

// PropTypes ensure that component receives correct props.
const propTypes = {
  counterValue: PropTypes.number.isRequired,
  counterState: PropTypes.bool.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

// Style object for component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});
// Use es6 class syntax
class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Get state and reducer functions from props
    const { counterValue, counterState, incrementAsync, decrement } = this.props;
    return (
      <View style={styles.container}>
        <Text>Count: {counterValue}</Text>
        <TouchableOpacity style={styles.button} onPress={!counterState ? incrementAsync : null}>
          <Text>{!counterState ? 'Async UP' : 'Processing'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text>DOWN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
// Add propTypes to Counter class
Counter.propTypes = propTypes;

// Make component smart.
// This connects component to the redux store.
// Split "main" state into subtsets main state to counterValue and counterStatus.
// This makes rendering process faster,
// because React won't make a comparison to the whole state object, if state.counter changes
export default connect(
  state => ({
    counterValue: state.counter.get('count'),
    counterState: state.counter.get('processing')
  }),
  dispatch => ({
    ...bindActionCreators(counterActions, dispatch)
  })
)(Counter);
