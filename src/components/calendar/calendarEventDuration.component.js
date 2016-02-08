import React from 'react-native';

const {
  View,
  Text,
  PropTypes,
} = React;

const propTypes = {
  containerStyle: PropTypes.number.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

class CalendarEventDuration extends React.Component {
  render() {
    const { containerStyle, start, end } = this.props;
    return (
      <View style={ containerStyle }>
        <Text> { start }</Text>
        <Text> { end }</Text>
      </View>
    );
  }
}
CalendarEventDuration.propTypes = propTypes;

module.exports = CalendarEventDuration;
