import React from 'react';

import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header} from 'components/header';

export const renderHeader = (goBack, goNext) => {
  return (
    <Header
      title="My usual waste are..."
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
          name="arrow-right"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
    />
  );
};
