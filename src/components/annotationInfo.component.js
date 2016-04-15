import React from 'react-native';

const {
  View,
  Text,
  PropTypes,
  StyleSheet,
  Animated
} = React;

const propTypes = {};

const styles = StyleSheet.create({
  annotationView: {
    backgroundColor: 'rgba(255, 103, 31, 0.7)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    borderRadius: 2,
    padding: 15,
    alignItems: 'stretch',
  },
  annotationText: {
    fontWeight: '500'
  }
});

class AnnotationInfoView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1 }
    ).start();
  }

  render() {
    const { mapData } = this.props;

    const transform = {
      transform: [{
       translateY: this.state.fadeAnim.interpolate({
         inputRange: [0, 1],
         outputRange: [100, 0]
       }),
     }],
    }

    return (
      <Animated.View style={ [styles.annotationView, transform] }>
        <Text style={ styles.annotationText }>Course code: { mapData.annotations[0].eventData.courseCode }</Text>
        <Text style={ styles.annotationText }>Course name: { mapData.annotations[0].eventData.courseName }</Text>
        <Text style={ styles.annotationText }>Event type: { mapData.annotations[0].eventData.type }</Text>
      </Animated.View>
    );
  }
}

AnnotationInfoView.propTypes = propTypes;

module.exports = AnnotationInfoView;
