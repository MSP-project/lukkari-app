import React from 'react-native';

const {
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

const propTypes = {
  containerStyle: PropTypes.number.isRequired,
  rowData: PropTypes.object.isRequired,
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
    const { containerStyle, rowData } = this.props;
    return (
      <View style={ containerStyle }>
        <Text style={ [styles.durationText, styles.start] }> { rowData.start }</Text>
        <Text style={ [styles.durationText, styles.end] }> { rowData.end }</Text>
      </View>
    );
  }
}
CalendarEventDuration.propTypes = propTypes;

module.exports = CalendarEventDuration;
