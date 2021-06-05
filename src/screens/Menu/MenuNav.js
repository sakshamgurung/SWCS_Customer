import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MenuIndex from './MenuIndex';
import Profile from '../Common/Profile/Profile';

const MenuStack = createStackNavigator();

const MenuNav = () => (
  <MenuStack.Navigator headerMode="none">
    <MenuStack.Screen name="MenuIndex" component={MenuIndex} />
    <MenuStack.Screen name="Profile" component={Profile} />
  </MenuStack.Navigator>
);

export default MenuNav;
