import React from 'react-native';

const {
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

const propTypes = {
  containerStyle: PropTypes.number.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  durationText: {
    fontSize: 11,
    paddingBottom: 3,
  },
  start: {
    color: 'black',
  },
  end: {
    color: 'gray',
  }
});

class CalendarEventDuration extends React.Component {
  render() {
    const { containerStyle, start, end } = this.props;
    return (
      <View style={ containerStyle }>
        <Text style={ [styles.durationText, styles.start] }> { start }</Text>
        <Text style={ [styles.durationText, styles.end] }> { end }</Text>
      </View>
    );
  }
}
CalendarEventDuration.propTypes = propTypes;

module.exports = CalendarEventDuration;
