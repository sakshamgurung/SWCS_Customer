import _ from 'lodash';
import React from 'react';

import {Polygon, Polyline, Marker, Callout} from 'react-native-maps';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header} from 'components/header';
import {ModalBottomSheet} from 'components/modal';

export const renderHeader = goBack => {
  return (
    <Header
      title="Select track to dump your waste..."
      onPressBack={goBack}
      backIcon={
        <MaterialCommIcon
          name="arrow-left"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      headerTitleStyle={{fontSize: 16}}
    />
  );
};

export const renderZones = data => {
  if (!_.isEmpty(data)) {
    return data.map(z => (
      <Polygon
        key={z._id}
        coordinates={z.zonePoints}
        holes={[z.zonePoints]}
        strokeColor="rgba(29, 60, 94, 0.50)"
        strokeWidth={2}
      />
    ));
  }
};

export const renderTracks = (data, onPress) => {
  if (!_.isEmpty(data)) {
    return data.map((t, index) => (
      <Polyline
        key={t._id}
        tappable={t.isPressable}
        onPress={() => onPress(t._id, index)}
        coordinates={t.trackPoints}
        strokeColor={t.isPressable ? 'rgba(250, 125, 0, 0.90)' : 'grey'}
        strokeWidth={t.isPressable ? 4 : 2}
      />
    ));
  }
};

export const renderBottomSheet = (
  isShown,
  onPressDismiss,
  data,
  selectedGeoObjectId,
  onPressDump,
  onPressEdit,
  onPressClear,
) => {
  if (isShown && data) {
    return (
      <ModalBottomSheet
        data={data}
        selectedGeoObjectId={selectedGeoObjectId}
        onPressDismiss={onPressDismiss}
        onPressDump={onPressDump}
        onPressEdit={onPressEdit}
        onPressClear={onPressClear}
      />
    );
  } else {
    return null;
  }
};
