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
  },
  separatorBorderColorLecture: {
    borderRightColor: '#FF681F',
  },
  separatorBorderColorExercise: {
    borderRightColor: '#FFA41F',
  },
});

class CalendarEventDuration extends React.Component {
  _borderColor(rowData) {
    switch (rowData.type) {
      case 'exercise':
        return styles.separatorBorderColorExercise;
      default:
        return styles.separatorBorderColorLecture;
    }
  }

  render() {
    const { containerStyle, rowData } = this.props;
    return (
      <View style={ [containerStyle, this._borderColor(rowData)] }>
        <Text style={ [styles.durationText, styles.start] }> { rowData.start }</Text>
        <Text style={ [styles.durationText, styles.end] }> { rowData.end }</Text>
      </View>
    );
  }
}
CalendarEventDuration.propTypes = propTypes;

module.exports = CalendarEventDuration;
