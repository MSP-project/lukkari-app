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
  View,
  RefreshControl
} = React;

const propTypes = {
  events: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'transparent',
    marginBottom: 60
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
    this.state = {
      refreshing: false,
      show: false
    };
  }

  _logout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  _onRefresh() {
    this.setState({show: !this.state.show, refreshing: false});
  }

  render() {
    const { events } = this.props;

    const showEvents = _
      .chain(events)
      .groupBy('code')
      .value();
    // Map
    console.log(_.keys(showEvents));
    const eventElems = _.map(showEvents, (value, key, index) => {
      const lecturesToday = _
        .chain(value)
        .filter( (event) => event.type === 'lecture' && event.date >= moment().startOf('day') && event.date <= moment().startOf('day').add(1, 'day'))
        .map( (event, index) => {
          console.log(key);
          return (<TouchableOpacity key={ `${key}${index}` } onPress={ Actions.spaceMap }>
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
        .filter( (event) => event.type === 'exercise' && event.date >= moment().startOf('day') && event.date <= moment().startOf('day').add(1, 'day'))
        .map( (event, index) => {
          return ( <CalendarEvent key={ `${key}${index}` } rowData={ {
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
      return (<View key={ `${key}${index}` } style={ styles.courseSection }>
        <Text style={ styles.courseHeader }>{ key }</Text>
        { lecturesToday }
        { exercisesToday }
      </View>);
    });

    const logoutButton = this.state.show
      ? <TouchableOpacity onPress={ this._logout } style={ [styles.buttonContainer] }><Text style={ styles.button }>Logout</Text></TouchableOpacity>
      : [];

    return (
      <ScrollView
        style={ styles.scrollViewContainer }
        scrollEnabled = {true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor= {'transparent'}
          />
        }
      >
        <Image style={ styles.headerImage } source={require('../img/mycoursesheader.png')} />

        { logoutButton }

        <View style={ styles.headerView }>
          <Text >Todays events and ongoing courses </Text>
        </View>



        <View>
          { eventElems }
        </View>

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
