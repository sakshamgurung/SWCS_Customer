import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import InboxIndex from './InboxIndex';
import Work from './Work';

import CompanyIndex from '../Common/Company/CompanyIndex';
import SubscriptionForm from '../Common/SubscriptionForm/SubscriptionForm';
import LocationPicker from '../Common/SubscriptionForm/LocationPicker';
import MapProfile from '../Common/Company/MapProfile';
import DumpWasteForm from '../Common/Company/DumpWasteForm';
import RequestIndex from '../Common/Request/RequestIndex';

const InboxStack = createStackNavigator();

const InboxNav = () => (
  <InboxStack.Navigator headerMode="none">
    <InboxStack.Screen name="InboxIndex" component={InboxIndex} />
    <InboxStack.Screen name="Work" component={Work} />
    <InboxStack.Screen name="CompanyIndex" component={CompanyIndex} />
    <InboxStack.Screen name="SubscriptionForm" component={SubscriptionForm} />
    <InboxStack.Screen name="LocationPicker" component={LocationPicker} />
    <InboxStack.Screen name="MapProfile" component={MapProfile} />
    <InboxStack.Screen name="DumpWasteForm" component={DumpWasteForm} />
    <InboxStack.Screen name="RequestIndex" component={RequestIndex} />
  </InboxStack.Navigator>
);

export default InboxNav;
