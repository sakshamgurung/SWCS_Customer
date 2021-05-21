import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import InboxIndex from './Inbox/InboxIndex';

const InboxStack = createStackNavigator();

const InboxNav = () => (
  <InboxStack.Navigator>
    <InboxStack.Screen name="InboxIndex" component={InboxIndex} />
  </InboxStack.Navigator>
);

export default InboxNav;
