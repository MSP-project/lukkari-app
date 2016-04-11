import React from 'react-native';

const {
  View,
  Text,
  PropTypes,
  StyleSheet
} = React;

const propTypes = {
  containerStyle: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 2
  }
});

class CalendarEventHeader extends React.Component {
  render() {
    const { containerStyle, header } = this.props;

    return (
      <View style={ containerStyle }>
        <Text style={ styles.headerText }>{ header }</Text>
      </View>
    );
  }
}

CalendarEventHeader.propTypes = propTypes;

module.exports = CalendarEventHeader;
