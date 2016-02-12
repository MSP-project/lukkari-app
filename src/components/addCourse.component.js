import React from 'react-native';
import { connect } from 'react-redux/native';
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

const propTypes = {
  addCourse: PropTypes.func.isRequired,
  allCourses: PropTypes.object.isRequired,
};

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
    backgroundColor: '#285f8f',
    padding: 15,
    marginTop: 30,
    borderRadius: 4,
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
    const { allCourses } = this.props;
    return (
      <View style={ styles.container }>
        <TextInput
          style={ styles.textInput }
          onChangeText={ this._updateCourseCode }
        />
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this._addCourse }
        >
          <Text style={ styles.button }>Add Course</Text>
        </TouchableOpacity>
        <Text>Added course: { allCourses }</Text>
      </View>
    );
  }
}

AddCourse.propTypes = propTypes;

export default connect(
  state => ({
    allCourses: state.courses
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(AddCourse);
