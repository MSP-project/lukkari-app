import React from 'react-native';

import { coordinates } from '../services/coordinates';


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

    // Initial position to Otaniemi
    this.state = {
      mapRegion: {
        latitude: 60.1887073,
        longitude: 24.8282191,
        latitudeDelta: 0.020,
        longitudeDelta: 0.020,
      },
      annotations: [{
        latitude: 60.1887073,
        longitude: 24.8282191,
        title: 'T-Talo',
        subtitle: 'Otakaari 8'
      }],
      overlays: [{
        coordinates: coordinates.points,
        strokeColor: '#f007',
        lineWidth: 3,
        id: "Route"
      }]
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
        mapRegion: newMapRegion
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={ styles.mapContainer }>
        <MapView
          style={ styles.map }
          region={ this.state.mapRegion }
          annotations={ this.state.annotations }
          showsUserLocation={ true }
          overlays = { this.state.overlays }
        >
        </MapView>
        <TouchableOpacity>
          <Text style={{ justifyContent: 'center', margin: 20, textAlign: 'center' }}>
            This is a map demo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SpaceMap;
