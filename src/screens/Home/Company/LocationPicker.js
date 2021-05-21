import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import MapView, {AnimatedRegion} from 'react-native-maps';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import pointInPolygon from 'point-in-polygon';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {mapStyle} from './mapStyle';
import {actions as homeActions} from 'store/ducks/homeDuck';
import {
  Point,
  renderHeader,
  renderPickedLocation,
  renderZones,
  renderTracks,
} from './LocationPickerUtil';

class LocationPicker extends Component {
  currentRegion: AnimatedRegion;
  constructor() {
    super();
    this.currentRegion = new MapView.AnimatedRegion({
      latitude: 28.2674,
      longitude: 83.975,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }

  componentDidMount() {
    const {companyId} = this.props.route.params;
    this.props.thunkFetchGeoObjects(companyId);
    this.requestFineLocation();
  }

  componentWillUnmount() {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }
  }

  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.watchId = Geolocation.watchPosition(position => {
            this.currentRegion.setValue({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            });
          });
        }
      }
    } catch (err) {
      console.warn('Permissioin denied: ', err);
    }
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.navigate('SubscriptionForm');
  };

  customerRequestDone = () => {
    const {route} = this.props;
    const {thunkPostCustomerRequest, thunkUpdateCustomerRequest} = this.props;
    const {companyId, serviceType, mode, requestListIndex} = route.params;
    let screenName;
    if (mode == 'default') {
      screenName = 'CompanyIndex';
      thunkPostCustomerRequest(companyId, serviceType, screenName);
    } else if (mode == 'edit') {
      screenName = 'RequestIndex';
      thunkUpdateCustomerRequest(requestListIndex, screenName);
    }
  };

  changeRegion = region => {
    this.currentRegion.setValue(region);
  };

  pickLocation = zone => {
    const latitude = this.currentRegion.latitude._value;
    const longitude = this.currentRegion.longitude._value;
    let arr = [];
    zone[0].zonePoints.forEach(e => {
      arr.push([e.latitude, e.longitude]);
    });

    if (pointInPolygon([latitude, longitude], arr)) {
      const newPoint = new Point(
        {latitude, longitude},
        `${Date.now()}.${Math.random()}`,
      );

      this.props.customerRequestChanged({
        property: 'requestCoordinate',
        data: newPoint,
      });
    } else {
      Alert.alert('Point not inside the zone', '', [], {
        cancelable: true,
      });
    }
  };

  deletePickedLocation = () => {
    this.props.customerRequestChanged({
      property: 'requestCoordinate',
      data: {},
    });
  };

  render() {
    const {customerRequest, listItemData} = this.props;
    const {track, zone} = listItemData;
    const location = customerRequest.requestCoordinate;

    return (
      <SafeAreaView style={styles.locationPickerContainer}>
        <MapView.Animated
          provider={'google'}
          customMapStyle={mapStyle.style}
          style={styles.mapViewContainer}
          showsUserLocation
          followsUserLocation
          region={this.currentRegion}
          onRegionChangeComplete={this.changeRegion}
          onPress={() => this.pickLocation(zone)}>
          {renderZones(zone)}
          {renderTracks(track)}
          {renderPickedLocation(location, this.deletePickedLocation)}
        </MapView.Animated>

        {renderHeader(this.goBack, this.customerRequestDone)}

        <MaterialCommIcon
          name="crosshairs"
          color="#000"
          size={15}
          style={styles.crosshairIcon}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  locationPickerContainer: {
    flex: 1,
    backgroundColor: 'rgba(62, 115, 222, 1)',
  },
  mapViewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  crosshairIcon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '48.6%',
  },
});

const mapStateToProps = state => {
  return _.cloneDeep(state.home);
};

const mapDispatchToProps = dispatch => {
  return {...bindActionCreators(homeActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationPicker);
