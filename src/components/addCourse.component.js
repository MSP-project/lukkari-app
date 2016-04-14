import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../state/app.action';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  PropTypes
} = React;

const propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#1F64A6',
    padding: 15,
    marginTop: 30,
    borderRadius: 4,
    width: 100,
    alignItems: 'center',
  },
  button: {
    color: 'white'
  }
});


class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this._addCourse = this._addCourse.bind(this);
    this._updateCourseCode = this._updateCourseCode.bind(this);
    this.state = {
      courseCode: ''
    };
  }

  _addCourse() {
    const { addCourse } = this.props;
    addCourse(this.state.courseCode);
  }

  _updateCourseCode(courseCode) {
    this.setState({ courseCode });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Type in the course identifier:</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ this._updateCourseCode }
        />
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this._addCourse }
        >
          <Text style={ styles.button }>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AddCourse.propTypes = propTypes;

export default connect(
  state => ({}),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(AddCourse);
