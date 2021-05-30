import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MenuIndex from './MenuIndex';

const MenuStack = createStackNavigator();

const MenuNav = () => (
  <MenuStack.Navigator>
    <MenuStack.Screen name="MenuIndex" component={MenuIndex} />
  </MenuStack.Navigator>
);

export default MenuNav;
