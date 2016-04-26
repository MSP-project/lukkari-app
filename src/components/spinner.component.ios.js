import React, { Component, PropType } from 'react-native';

const {
  ActivityIndicatorIOS,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  spinner: {
  },
});

const propTypes = {
  spinnerSize: React.PropTypes.string.isRequired,
  spinnerColor: React.PropTypes.string.optional,
};

class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const size = this.props.spinnerSize.toLowerCase() === 'large'
      ? 'large'
      : 'small';

    const color = this.props.spinnerColor ? this.props.spinnerColor : '#000';

    return (
      <ActivityIndicatorIOS
        animating
        size={size}
        color={color}
        style={styles.spinner}
      />
    );
  }
}

Spinner.propTypes = propTypes;

export default Spinner;
