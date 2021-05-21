import React from 'react';

import _ from 'lodash';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header} from 'components/header';
import {ModalHeaderOptions} from 'components/modal';

export const renderHeader = (title, onPressBack, onPressNext) => {
  return (
    <Header
      title={title}
      backIcon={
        <MaterialCommIcon
          name="arrow-left"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      onPressBack={onPressBack}
      nextIcon={
        <MaterialCommIcon
          name="dots-horizontal"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      onPressNext={onPressNext}
    />
  );
};

export const renderHeaderOptions = (
  isHeaderOptionsShown,
  toggleHeaderOptions,
  optionData,
  requestType,
  requestStatus,
) => {
  if (
    requestType == 'subscription' ||
    _.includes(['accepted', 'assigned', 'finished'], requestStatus)
  ) {
    optionData[0].enabled = false;
    optionData[0].icon = (
      <MaterialCommIcon name="pencil" color={'rgba(0, 0, 0, 0.3)'} size={20} />
    );
  }

  if (isHeaderOptionsShown) {
    return (
      <ModalHeaderOptions
        optionData={optionData}
        onPressModalBG={toggleHeaderOptions}
        onRequestClose={toggleHeaderOptions}
      />
    );
  }
};

export const processWasteListData = (wasteList, wasteDescription) => {
  const modifiedWasteList = _.cloneDeep(wasteList);
  const filteredWasteList = _.filter(modifiedWasteList, wl => {
    for (let wd of wasteDescription) {
      if (wl._id == wd.wasteListId) {
        wl.amount = wd.amount;
        wl.isSelected = true;
        return true;
      } else {
        wl.amount = '';
        wl.isSelected = false;
      }
    }
  });
  return {modifiedWasteList, filteredWasteList};
};
