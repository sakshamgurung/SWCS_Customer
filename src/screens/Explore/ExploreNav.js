import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ExploreIndex from './ExploreIndex';

const ExploreStack = createStackNavigator();

const ExploreNav = () => (
  <ExploreStack.Navigator headerMode="none">
    <ExploreStack.Screen name="ExploreIndex" component={ExploreIndex} />
  </ExploreStack.Navigator>
);

export default ExploreNav;
