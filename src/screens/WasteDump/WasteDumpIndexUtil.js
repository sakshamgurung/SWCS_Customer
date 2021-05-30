import React from 'react';

import WasteDumpList from './WasteDumpList';

export const renderList = data => {
  const {wasteDumpList} = data;
  return <WasteDumpList data={wasteDumpList} />;
};
