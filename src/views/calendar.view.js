import React from 'react-native';

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

    const dataBlob = {
      sectionID1: {
        date: 'Monday, 8 of February'
      },
      'sectionID1:rowID1': {
        header: '1st Header for Row1',
        start: '17:00',
        end: '19:00',
        location: 'Adress Street 123'
      },
      'sectionID1:rowID2': {
        header: '2nd Header for Row1',
        start: '21:00',
        end: '22:00',
        location: 'Adress Street 345'
      },
      sectionID2: {
        date: 'Wednesday, 10 of February'
      },
      'sectionID2:rowID1': {
        header: '1st Header for Row2',
        start: '11:00',
        end: '12:00',
        location: 'Street Street 1'
      },
      'sectionID2:rowID2': {
        header: '2nd Header for Row2',
        start: '15:00',
        end: '22:00',
        location: 'Street Street 1'
      },
    };
    const sectionIDs = ['sectionID1', 'sectionID2'];
    const rowIDs = [['rowID1', 'rowID2'], ['rowID1', 'rowID2']];

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
    return (
      <CalendarEvent header={ rowData.header } start={ rowData.start } end={ rowData.end }/>
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
