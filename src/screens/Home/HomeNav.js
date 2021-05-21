import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeIndex from './Home/HomeIndex';
import CompanyIndex from './Company/CompanyIndex';
import SubscriptionForm from './Company/SubscriptionForm';
import LocationPicker from './Company/LocationPicker';
import RequestIndex from './Request/RequestIndex';

const HomeStack = createStackNavigator();

const HomeNav = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeIndex" component={HomeIndex} />
    <HomeStack.Screen name="CompanyIndex" component={CompanyIndex} />
    <HomeStack.Screen name="SubscriptionForm" component={SubscriptionForm} />
    <HomeStack.Screen name="LocationPicker" component={LocationPicker} />
    <HomeStack.Screen name="RequestIndex" component={RequestIndex} />
  </HomeStack.Navigator>
);

export default HomeNav;
