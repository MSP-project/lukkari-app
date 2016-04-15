import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../state/app.action';

import CalendarDate from '../components/calendar/calendarDate.component';
import CalendarEvent from '../components/calendar/calendarEvent.component';

const {
  ListView,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
    backgroundColor: 'transparent',
  }
});


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const { calendarData } = props;

    const ds = new ListView.DataSource({
      getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID],
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(calendarData.dataBlob, calendarData.sections, calendarData.rows)
    };
  }

  _renderSectionHeader(sectionData) {
    return (
      <CalendarDate header={ sectionData.date }/>
    );
  }

  _renderSectionBody(rowData) {
    return (
      <CalendarEvent rowData ={ rowData }/>
    );
  }

  render() {
    return (
      <ListView
        style={ styles.container }
        dataSource={ this.state.dataSource}
        renderSectionHeader = { this._renderSectionHeader }
        renderRow={ this._renderSectionBody }

      />
    );
  }
}

export default connect(
  state => ({
    calendarData: state.courses.calendarFormat,
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(Calendar);
