import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MapScreen from './Explore/MapScreen';

const ExploreStack = createStackNavigator();

const ExploreNav = () => (
  <ExploreStack.Navigator>
    <ExploreStack.Screen name="Map" component={MapScreen} />
  </ExploreStack.Navigator>
);

export default ExploreNav;
