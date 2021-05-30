import React from 'react';

import NotificationList from './NotificationList';
import ScheduleList from './ScheduleList';

export const renderList = (selectedTab, data) => {
  const {notificationList, scheduleList} = data;
  if (selectedTab == 'notification') {
    return <NotificationList data={notificationList} />;
  } else if (selectedTab == 'schedule') {
    return <ScheduleList data={scheduleList} />;
  }
};
