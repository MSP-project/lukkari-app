import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import moment from 'moment';

import * as actions from '../state/app.action';

import CalendarEvent from '../components/calendar/calendarEvent.component';

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
  events: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flex: 1,
    marginBottom: 60
  },
  coursesView: {
    flex: 1,
  },
  headerView: {
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
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
    backgroundColor: 'gray',
    padding: 10,
  },
  button: {
    color: 'white',
  },
  courseHeader: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#1F64A6',
    color: 'white'
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
    const { events } = this.props;

    const showEvents = _
      .chain(events)
      .groupBy('code')
      .value();

    // Map
    const eventElems = _.map(showEvents, (value, key, index) => {
      const lecturesToday = _
        .chain(value)
        .filter( (event) => event.type === 'lecture' && event.date >= moment().startOf('day') && event.date <= moment().startOf('day').add(1, 'day'))
        .map( (event, index) => {
          return (<TouchableOpacity key={ index } onPress={ Actions.spaceMap }>
            <CalendarEvent rowData={ {
              type: event.type,
              start: event.startTime,
              end: event.endTime,
              courseCode: event.code,
              courseName: event.name,
              location: event.locations,
            } }/>
          </TouchableOpacity> )})
        .value();

      const exercisesToday = _
        .chain(value)
        .filter( (event) => event.type === 'exercise' && event.date >= moment().startOf('day') && event.date <= moment().startOf('day').add(1, 'week'))
        .map( (event, index) => {
          return ( <CalendarEvent key={ index } rowData={ {
              type: event.type,
              start: event.startTime,
              end: event.endTime,
              courseCode: event.code,
              courseName: event.name,
              location: event.locations,
            } }/> )})
        .value();

      const noLectures = <Text> No lectures today </Text>;
      const noExercises = <Text> No exercises today </Text>;
      return (<View key={ index } style={ styles.courseSection }>
        <Text style={ styles.courseHeader }>{ key }</Text>
        { lecturesToday }
        { exercisesToday }
      </View>);
      });

    return (
      <ScrollView
        style={ styles.scrollViewContainer }
        contentContainerStyle={ styles.scrollViewContent }
      >
        <Image style={ styles.headerImage } source={require('../img/mycoursesheader.png')} />
        <View style={ styles.headerView }>
          <Text >Todays events and ongoing courses </Text>
        </View>


        <View style={ styles.coursesView }>
          { eventElems }
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
    events: state.courses.allEvents,
    courses: state.courses.courses
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Home);
