import React from 'react';

import AllServiceList from './AllServiceList';
import RequestList from './RequestList';
import SubscriptionList from './SubscriptionList';

export const renderList = (selectedTab, homeListData) => {
  if (selectedTab == 'all') {
    return <AllServiceList data={homeListData.allServiceListData} />;
  } else if (selectedTab == 'request') {
    return <RequestList data={homeListData.requestListData} />;
  } else if (selectedTab == 'subscription') {
    return <SubscriptionList data={homeListData.subscriptionListData} />;
  }
};
