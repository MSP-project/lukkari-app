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
  containerBorder: {
    borderStyle: 'solid',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 2,
  },
  header: {
    flex: 6,
    padding: 5,
  },
  duration: {
    width: 62,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRightColor: '#FF681F',
    borderRightWidth: 3,
  }
});

class CalendarEvent extends React.Component {
  render() {
    const { start, end, header } = this.props;
    return (
      <View style={ [styles.container, this.props.last ? null : styles.containerBorder] }>
        <CalendarEventDuration containerStyle={ styles.duration } start={ start } end={ end } />
        <CalendarEventHeader containerStyle={ styles.header } header={ header } />
      </View>
    );
  }
}

CalendarEvent.propTypes = propTypes;

module.exports = CalendarEvent;
