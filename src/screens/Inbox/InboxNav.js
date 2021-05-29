import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import InboxIndex from './Inbox/InboxIndex';
import Work from './Inbox/Work';

const InboxStack = createStackNavigator();

const InboxNav = () => (
  <InboxStack.Navigator headerMode="none">
    <InboxStack.Screen name="InboxIndex" component={InboxIndex} />
    <InboxStack.Screen name="Work" component={Work} />
  </InboxStack.Navigator>
);

export default InboxNav;
