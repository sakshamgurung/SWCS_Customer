import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import WasteDumpIndex from './WasteDumpIndex';

const WasteDumpStack = createStackNavigator();

const WasteDumpNav = () => (
  <WasteDumpStack.Navigator>
    <WasteDumpStack.Screen name="WasteDumpIndex" component={WasteDumpIndex} />
  </WasteDumpStack.Navigator>
);

export default WasteDumpNav;
