import _ from 'lodash';
import React from 'react';
import {Text} from 'react-native';

import {Polygon, Polyline, Marker, Callout} from 'react-native-maps';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header} from 'components/header';

export class Point {
  constructor(c, identifier) {
    this.latitude = c.latitude;
    this.longitude = c.longitude;
    this.identifier = identifier;
  }

  get x() {
    return this.latitude;
  }

  set x(value) {
    this.latitude = value;
  }

  get y() {
    return this.longitude;
  }

  set y(value) {
    this.longitude = value;
  }
}

export const renderHeader = (goBack, customerRequestDone) => {
  return (
    <Header
      title="Pick location by draging and press..."
      onPressBack={goBack}
      onPressNext={customerRequestDone}
      backIcon={
        <MaterialCommIcon
          name="arrow-left"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      nextIcon={
        <MaterialCommIcon
          name="check"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      headerTitleStyle={{fontSize: 16}}
    />
  );
};

export const renderPickedLocation = (location, deletePickedLocation) => {
  if (!_.isEmpty(location)) {
    return (
      <Marker key={location.identifier} coordinate={location}>
        <Callout onPress={deletePickedLocation}>
          <Text>Delete location</Text>
        </Callout>
      </Marker>
    );
  }
};

export const renderZones = data => {
  if (!_.isEmpty(data)) {
    return data.map(z => (
      <Polygon
        key={z._id}
        coordinates={z.zonePoints}
        holes={[z.zonePoints]}
        //fillColor="rgba(153, 153, 153, 0.30)"
        strokeColor="rgba(29, 60, 94, 0.50)"
        strokeWidth={2}
      />
    ));
  }
};

export const renderTracks = data => {
  if (!_.isEmpty(data)) {
    return data.map(t => (
      <Polyline
        key={t._id}
        coordinates={t.trackPoints}
        strokeColor="rgba(250, 125, 0, 0.90)"
        strokeWidth={3}
      />
    ));
  }
};
