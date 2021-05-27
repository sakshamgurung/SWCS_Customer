import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeIndex from './Home/HomeIndex';
import CompanyIndex from './Company/CompanyIndex';
import SubscriptionForm from './SubscriptionForm';
import LocationPicker from './LocationPicker';
import MapProfile from './Company/MapProfile';
import DumpWasteForm from './Company/DumpWasteForm';
import RequestIndex from './Request/RequestIndex';

const HomeStack = createStackNavigator();

const HomeNav = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeIndex" component={HomeIndex} />
    <HomeStack.Screen name="CompanyIndex" component={CompanyIndex} />
    <HomeStack.Screen name="SubscriptionForm" component={SubscriptionForm} />
    <HomeStack.Screen name="LocationPicker" component={LocationPicker} />
    <HomeStack.Screen name="MapProfile" component={MapProfile} />
    <HomeStack.Screen name="DumpWasteForm" component={DumpWasteForm} />
    <HomeStack.Screen name="RequestIndex" component={RequestIndex} />
  </HomeStack.Navigator>
);

export default HomeNav;
