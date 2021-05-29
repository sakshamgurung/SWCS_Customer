import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

import _ from 'lodash';
import MapView, {AnimatedRegion} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {mapStyle} from '../mapStyle';
import {
  renderHeader,
  renderTracks,
  renderZones,
  renderBottomSheet,
} from './MapProfileUtil';

class MapProfile extends Component {
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
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
    this.requestFineLocation();
  }

  componentWillUnmount() {
    const {resetMapProfile} = this.props;
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
    }
    this.refresh();
    resetMapProfile();
  }

  remoteCall = () => {
    const {thunkFetchMapProfile, route} = this.props;
    const {companyId} = route.params;
    thunkFetchMapProfile(companyId);
  };

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
    const {navigation, resetMapProfile} = this.props;
    resetMapProfile();
    navigation.navigate('CompanyIndex');
  };

  changeRegion = region => {
    this.currentRegion.setValue(region);
  };

  mapPressed = () => {
    this.dismissBottomSheet();
  };

  dump = () => {
    const {navigation, route, mapProfileData} = this.props;
    const {companyId} = route.params;
    const {selectedGeoObjectId} = mapProfileData;
    navigation.navigate('DumpWasteForm', {
      mode: 'default',
      companyId,
      selectedGeoObjectId,
    });
  };

  edit = () => {
    const {navigation, route, mapProfileData} = this.props;
    const {companyId} = route.params;
    const {selectedGeoObjectId} = mapProfileData;
    navigation.navigate('DumpWasteForm', {
      mode: 'edit',
      companyId,
      selectedGeoObjectId,
    });
  };

  clear = () => {
    const {thunkDeleteWasteDump} = this.props;
    Alert.alert(
      'Do you want to delete waste dumped?',
      'Selecting yes deletes waste you have posted.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => thunkDeleteWasteDump(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  showBottomSheet = (geoObjectId, index) => {
    const {mapProfileDataChanged} = this.props;
    mapProfileDataChanged({property: 'isBottomSheetShown', data: true});
    mapProfileDataChanged({property: 'selectedGeoObjectId', data: geoObjectId});
    mapProfileDataChanged({property: 'selectedGeoObjectIndex', data: index});
  };

  dismissBottomSheet = () => {
    const {mapProfileDataChanged} = this.props;
    mapProfileDataChanged({property: 'isBottomSheetShown', data: false});
    mapProfileDataChanged({property: 'selectedGeoObjectId', data: ''});
    mapProfileDataChanged({property: 'selectedGeoObjectIndex', data: -1});
  };

  render() {
    const {mapProfileData} = this.props;
    const {
      bottomSheetData,
      track,
      zone,
      isBottomSheetShown,
      selectedGeoObjectId,
      selectedGeoObjectIndex,
    } = mapProfileData;
    bottomSheetData.track = track[selectedGeoObjectIndex];
    return (
      <SafeAreaView style={styles.container}>
        <MapView.Animated
          provider={'google'}
          customMapStyle={mapStyle.style}
          style={styles.mapViewContainer}
          showsUserLocation
          followsUserLocation
          region={this.currentRegion}
          onRegionChangeComplete={this.changeRegion}
          onPress={this.mapPressed}>
          {renderTracks(track, this.showBottomSheet)}
          {renderZones(zone)}
        </MapView.Animated>

        {renderHeader(this.goBack)}
        {renderBottomSheet(
          isBottomSheetShown,
          this.dismissBottomSheet,
          bottomSheetData,
          selectedGeoObjectId,
          this.dump,
          this.edit,
          this.clear,
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(62, 115, 222, 1)',
  },
  mapViewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default reduxStoreWrapper(MapProfile, 'home');
