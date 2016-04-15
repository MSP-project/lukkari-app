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
  headerText: {
    paddingTop: 2
  },
  locationText: {
    fontSize: 10,
  },
  privateContainer: {
    justifyContent: 'space-between',
  }
});

class CalendarEventHeader extends React.Component {
  render() {
    const { containerStyle, rowData } = this.props;
    return (
      <View style={ [containerStyle, styles.privateContainer] }>
        <Text style={ styles.headerText }>{ rowData.courseCode } - { rowData.courseName }</Text>
        <Text style={ styles.locationText }>{ rowData.location.map( (location) => `${location.room}, ${location.building}`).join('/') }</Text>
      </View>
    );
  }
}

CalendarEventHeader.propTypes = propTypes;

module.exports = CalendarEventHeader;
