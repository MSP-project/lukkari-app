import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/app.action';
import { getDirectionCoordinates } from '../utils/googleAPI';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  MapView
} = React;

const styles = StyleSheet.create({
  map: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
});

class SpaceMap extends React.Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this._getRouteData = this._getRouteData.bind(this);

    // Initial position to Otaniemi
    this.state = {
      mapRegion: {
        latitude: 60.1887073,
        longitude: 24.8282191,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      annotations: [{
        latitude: 60.1887073,
        longitude: 24.8282191,
        title: 'T-Talo',
        subtitle: 'Otakaari 8'
      }],
      overlays: []
    };
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newMapRegion = {
        latitude: 60.1887073,
        longitude: 24.8282191,
        latitudeDelta: Math.abs(60.1887073 - position.coords.latitude) * 2.5,
        longitudeDelta: Math.abs(24.8282191 - position.coords.longitude) * 2.3,
      }
      this.setState({
        mapRegion: newMapRegion,
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getRouteData() {
    const { getRoute } = this.props;
    this.state.userLocation
      ? getRoute(this.state.userLocation, this.state.mapRegion)
      : alert('No location data available');
  }

  render() {
    const { mapData } = this.props;

    return (
      <View style={ styles.mapContainer }>
        <MapView
          style={ styles.map }
          region={ mapData.region }
          annotations={ mapData.annotations }
          showsUserLocation={ true }
          overlays = { mapData.overlays }
        >
        </MapView>
        <TouchableOpacity onPress={ this._getRouteData }>
          <Text style={{ justifyContent: 'center', margin: 20, textAlign: 'center' }}>
            Show route
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({
    mapData: state.mapData
  }),
  dispatch => ({
    ...bindActionCreators(actions, dispatch)
  })
)(SpaceMap);
