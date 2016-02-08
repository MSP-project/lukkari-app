import React from 'react-native';

const {
  View,
  Text,
  PropTypes
} = React;

const propTypes = {
  containerStyle: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
};

class CalendarEventHeader extends React.Component {
  render() {
    const { containerStyle, header } = this.props;

    return (
      <View style={ containerStyle }>
        <Text>{ header }</Text>
      </View>
    );
  }
}

CalendarEventHeader.propTypes = propTypes;

module.exports = CalendarEventHeader;
