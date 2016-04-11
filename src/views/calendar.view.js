import React from 'react-native';

import CalendarDate from '../components/calendar/calendarDate.component';
import CalendarEvent from '../components/calendar/calendarEvent.component';

import { dataBlob, sectionIDs, rowIDs } from '../utils/dummydata';


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

    const ds = new ListView.DataSource({
      getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
      getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID],
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    };
  }

  _renderSectionHeader(sectionData) {
    return (
      <CalendarDate header={ sectionData.date }/>
    );
  }

  _renderSectionBody(rowData) {
    console.log("roWData", rowData);
    return (
      <CalendarEvent header={ rowData.header } start={ rowData.start } end={ rowData.end } last={ rowData.last }/>
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


module.exports = Calendar;
