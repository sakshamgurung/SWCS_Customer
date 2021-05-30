import React from 'react';

import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import {Header} from 'components/header';

export const renderHeader = (goBack, goNext) => {
  return (
    <Header
      title="Select waste item and dump..."
      onPressBack={goBack}
      onPressNext={goNext}
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
    />
  );
};

export const processWasteListData = (wasteList, wasteDumpData) => {
  if (!_.isEmpty(wasteList) && !_.isEmpty(wasteDumpData)) {
    const dumpedWaste = _.cloneDeep(wasteDumpData);
    const modifiedWasteList = _.cloneDeep(wasteList);
    const filteredWasteList = _.filter(modifiedWasteList, wl => {
      for (let dw of dumpedWaste) {
        if (wl._id == dw.wasteListId) {
          wl.amount = dw.amount;
          wl.isSelected = true;
          return true;
        } else {
          wl.amount = '';
          wl.isSelected = false;
        }
      }
    });
    return {modifiedWasteList, filteredWasteList};
  } else {
    return {modifiedWasteList: undefined, filteredWasteList: undefined};
  }
};
