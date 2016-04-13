import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../state/app.action';

const {
  ScrollView,
  Text,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
  Image,
  View
} = React;

const propTypes = {
  courseMeta: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'transparent',

  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60
  },
  coursesView: {
    flex: 1,
  },
  headerImage: {
    marginBottom: 30,
    marginTop: -100,
    height: 250,
  },
  touchable: {
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#1F64A6',
    padding: 15,
    borderRadius: 4,
  },
  button: {
    color: 'white',
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { getCourses } = props;
    getCourses();

    this._logout = this._logout.bind(this);
  }

  _logout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { courseMeta, loggedIn } = this.props;

    return (
      <ScrollView
        style={ styles.scrollViewContainer }
        contentContainerStyle={ styles.scrollViewContent }
      >
        <Image style={ styles.headerImage } source={require('../img/mycoursesheader.png')} />
        <Text style={{ marginBottom: 20 }}>Upcoming events and ongoing courses </Text>

        <View style={ styles.coursesView }>
          <TouchableOpacity onPress={ Actions.spaceMap } style={ styles.touchable }>
            <Text style={{ marginBottom: 5 }}>{ courseMeta.name }</Text>
          </TouchableOpacity>
          <Text style={{ marginBottom: 5, marginLeft: 40 }}>Creddits: { courseMeta.credits }</Text>
          <Text style={{ marginBottom: 5, marginLeft: 40 }}>Course code: { courseMeta.code }</Text>

          <TouchableOpacity onPress={ Actions.spaceMap } style={ styles.touchable }>
            <Text style={{ marginBottom: 5 }}>{ courseMeta.name }</Text>
          </TouchableOpacity>
          <Text style={{ marginBottom: 5, marginLeft: 40 }}>Creddits: { courseMeta.credits }</Text>
          <Text style={{ marginBottom: 5, marginLeft: 40 }}>Course code: { courseMeta.code }</Text>
        </View>

        <TouchableOpacity onPress={ this._logout } style={ [styles.buttonContainer] }>
          <Text style={ styles.button }>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

Home.propTypes = propTypes;

export default connect(
  state => ({
    courseMeta: state.selectedCourse.courseMeta,
    events: state.selectedCourse.events,
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Home);
