import React from 'react-native';

const {
  View,
  Text,
  StyleSheet,
  PropTypes
} = React;

const styles = StyleSheet.create({
  container: {
    height: 26,
    top: 0,
    backgroundColor: '#CACACA',
    paddingLeft: 5,
    flex: 1,
    justifyContent: 'center',
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
