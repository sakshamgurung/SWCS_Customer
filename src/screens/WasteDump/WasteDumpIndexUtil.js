import React from 'react';

import WasteDumpList from './WasteDumpList';
import isEmpty from 'components/isEmpty';

export const renderList = data => {
  const {wasteDumpList} = data;
  const isWasteEmpty = isEmpty(wasteDumpList);
  return <WasteDumpList data={wasteDumpList} isWasteEmpty={isWasteEmpty} />;
};
