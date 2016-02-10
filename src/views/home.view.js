import React from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../state/app.action';

const {
  ScrollView,
  Text,
  StyleSheet,
  PropTypes,
  TouchableOpacity,
  Image
} = React;

const propTypes = {
  courseMeta: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'transparent',

  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    marginBottom: 30,
    height: 140,
  },
  touchable: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
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
      <ScrollView
        style={ styles.scrollViewContainer }
        contentContainerStyle={ styles.scrollViewContent }
      >
        <Image style={ styles.headerImage } source={require('../img/mycoursesheader.png')} />
        <Text style={{ marginBottom: 50 }}>This is the Home page</Text>
        <TouchableOpacity onPress={ Actions.spaceMap } style={ styles.touchable }>
          <Text style={{ marginBottom: 5 }}>{ courseMeta.name }</Text>
          <Text style={{ marginBottom: 5 }}>{ courseMeta.credits }</Text>
          <Text style={{ marginBottom: 5 }}>{ courseMeta.code }</Text>
        </TouchableOpacity>

      </ScrollView>
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
