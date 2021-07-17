import React from 'react';

import NotificationList from './NotificationList';
import ScheduleList from './ScheduleList';
import isEmpty from 'components/isEmpty';

export const renderList = (selectedTab, data) => {
  const {notificationList, scheduleList} = data;
  const isNotEmpty = isEmpty(notificationList);
  const isSchEmpty = isEmpty(scheduleList);
  if (selectedTab == 'notification') {
    return (
      <NotificationList isListEmpty={isNotEmpty} data={notificationList} />
    );
  } else if (selectedTab == 'schedule') {
    return <ScheduleList isListEmpty={isSchEmpty} data={scheduleList} />;
  }
};
