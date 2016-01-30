import React from 'react-native';
import MapView from 'react-native-maps';


const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} = React;


const styles = StyleSheet.create({
  map: {
    marginTop: 70,
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
  }

  componentDidMount() {
    // Without timeout too quick for iOS and Android.
    // timeout 0 is ok for iOS, Android needs something longer
    setTimeout(function () {
      this.refs.m1.showCallout();
    }.bind(this), 100);
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 60.1833,
            longitude: 24.8333,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker
            ref="m1"
            coordinate={{ latitude: 60.1887073, longitude: 24.8282191 }}
            title="Otakaari"
            description="Testimarkkeri Otakaari 8"
          />

        </MapView>
        <TouchableOpacity>
          <Text
            style={{ justifyContent: 'center', margin: 20, textAlign: 'center' }}
          > This is a map demo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SpaceMap;
