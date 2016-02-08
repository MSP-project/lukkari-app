import React from 'react-native';

import CalendarEventDuration from './calendarEventDuration.component';
import CalendarEventHeader from './calendarEventHeader.component';
const {
  View,
  StyleSheet,
  PropTypes
} = React;

const propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  header: {
    flex: 6,
    backgroundColor: 'yellow',
    padding: 5,
  },
  duration: {
    padding: 5,
    minWidth: 60,
    backgroundColor: 'red',
    flexWrap: 'wrap',
    justifyContent: 'space-between'

  }
});

class CalendarEvent extends React.Component {
  
  render() {
    const { start, end, header } = this.props;
    return (
      <View style={ styles.container }>
        <CalendarEventDuration containerStyle={ styles.duration } start={ start } end={ end } />
        <CalendarEventHeader containerStyle={ styles.header } header={ header } />
      </View>
    );
  }
}

CalendarEvent.propTypes = propTypes;

module.exports = CalendarEvent;
