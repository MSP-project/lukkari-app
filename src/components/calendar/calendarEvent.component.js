import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../../state/app.action';

import CalendarEventDuration from './calendarEventDuration.component';
import CalendarEventHeader from './calendarEventHeader.component';
const {
  View,
  StyleSheet,
  PropTypes,
  TouchableOpacity
} = React;

const propTypes = {
  rowData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  containerBorder: {
    borderStyle: 'solid',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 2,
  },
  header: {
    flex: 6,
    padding: 5,
  },
  duration: {
    width: 62,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRightWidth: 3,
  }
});

class CalendarEvent extends React.Component {

  constructor(props) {
    super(props);
    this._viewEventOnMap = this._viewEventOnMap.bind(this);
  }

  _viewEventOnMap(rowData) {
    const { initMap } = this.props;
    initMap(rowData);
    Actions.spaceMap();
  }

  render() {
    const { rowData } = this.props;
    return (
      <TouchableOpacity onPress={ this._viewEventOnMap.bind(this, rowData) }>
        <View style={ [styles.container, this.props.last ? null : styles.containerBorder] }>
          <CalendarEventDuration containerStyle={ styles.duration } rowData={ rowData }/>
          <CalendarEventHeader containerStyle={ styles.header } rowData={ rowData } />
        </View>
      </TouchableOpacity>
    );
  }
}

CalendarEvent.propTypes = propTypes;

export default connect(
  state => ({}),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(CalendarEvent);
