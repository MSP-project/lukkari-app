import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeCourse, logoutUser } from '../state/app.action';

import Settings from '../components/settings.component';
import Message from '../components/message.component';


const {
  ScrollView,
  StyleSheet,
  View,
} = React;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  }
});

const propTypes = {
  courses: PropTypes.array.isRequired,
}

class SettingsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={ styles.flex } >
        <View style={ styles.container }>
          <Settings {...this.props}/>
        </View>
        <Message/>
      </ScrollView >
    );
  }
}

SettingsView.propTypes = propTypes;

export default connect(
  state => ({
    courses: state.courses.courses,
    loading: state.courses.isFetching,
  }),
  dispatch => bindActionCreators(
    { removeCourse, logoutUser }, dispatch)
)(SettingsView);
