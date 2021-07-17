import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './Login';
import Signup from './Signup';
import InitialCustomerForm from 'screens/Auth/InitialCustomerForm';

const AuthStack = createStackNavigator();

const AuthNav = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
    <AuthStack.Screen
      name="InitialCustomerForm"
      component={InitialCustomerForm}
    />
  </AuthStack.Navigator>
);

export default AuthNav;
