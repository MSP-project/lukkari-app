import React, { Component, PropType } from 'react-native';

const {
  ProgressBarAndroid,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  spinner: {
  },
});

const propTypes = {
  spinnerSize: React.PropTypes.string.isRequired,
  spinnerColor: React.PropTypes.string.optional,
  progress: React.PropTypes.number.optional,
};

class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const color = this.props.spinnerColor ? this.props.spinnerColor : '#000';
    const progress = this.props.progress ? this.props.progress : 0;

    return (
      <ProgressBarAndroid
        styleAttr={this.props.spinnerSize}
        style={styles.spinner}
        color={color}
        progress={progress}
      />
    );
  }
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = {
  spinnerSize: 'Large',
};

export default Spinner;
