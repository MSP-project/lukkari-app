import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../state/app.action';

import AnnotationInfoView from './annotationInfo.component';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  MapView,
  Animated
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'stretch',
    position: 'relative'
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
  },
  button: {
    color: 'white',
  },
});

class SpaceMap extends React.Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this._getRouteData = this._getRouteData.bind(this);
    this._annotationFocus = this._annotationFocus.bind(this);

    this.state = {
      mapRegion: {},
      userLocation: {},
      showAnnotation: false,
    }
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
        },
        showAnnotation: false
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _getRouteData() {
    const { getRoute, mapData } = this.props;
    this.state.userLocation
      ? getRoute(this.state.userLocation, mapData.region)
      : alert('No location data available');
  }

  _annotationFocus() {
    this.setState({
      showAnnotation: !this.state.showAnnotation
    });
  }

  render() {
    const { mapData } = this.props;
    const annotationInfo = this.state.showAnnotation
      ? <AnnotationInfoView mapData={ mapData } />
      : [];

    return (
      <View style={ styles.container }>
        <View style={ styles.mapContainer }>
          <MapView
            style={ styles.map }
            region={ mapData.region }
            annotations={ mapData.annotations.map( (annotation) =>
              Object.assign({}, annotation, {
                onFocus: this._annotationFocus,
                onBlur: this._annotationFocus }))
            }
            showsUserLocation={ true }
            overlays = { mapData.overlays }
          >
          </MapView>
          { annotationInfo }
        </View>
        <TouchableOpacity onPress={ this._getRouteData } style={ styles.buttonContainer }>
          <Text style={ styles.button }>
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
