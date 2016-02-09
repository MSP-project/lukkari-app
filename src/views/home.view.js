import React from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';

import * as actions from '../state/app.action';

const {
  View,
  Text,
  StyleSheet,
  PropTypes
} = React;

const propTypes = {
  courseMeta: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { getCourseData } = props;
    getCourseData('MS-A0107');
  }

  render() {
    const { courseMeta } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={{ marginBottom: 50 }}>This is the Home page</Text>
        <Text style={{ marginBottom: 5 }}>{ courseMeta.name }</Text>
        <Text style={{ marginBottom: 5 }}>{ courseMeta.credits }</Text>
        <Text style={{ marginBottom: 5 }}>{ courseMeta.code }</Text>
      </View>
    );
  }
}

Home.propTypes = propTypes;

export default connect(
  state => ({
    courseMeta: state.selectedCourse.get('courseMeta'),
    events: state.selectedCourse.get('events')
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Home);
