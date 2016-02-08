import React from 'react-native';

const {
  View,
  Text,
  StyleSheet,
  PropTypes
} = React;

const styles = StyleSheet.create({
  container: {
    height: 30,
    top: 0,
    backgroundColor: 'purple',
    flex: 1,
    flexDirection: 'row',
  },
});

const propTypes = {
  header: PropTypes.string.isRequired,
};

class CalendarDate extends React.Component {

  render() {
    const { header } = this.props;

    return (
      <View style={ styles.container }>
        <Text> { header } </Text>
      </View>
    );
  }
}

CalendarDate.propTypes = propTypes;

module.exports = CalendarDate;
