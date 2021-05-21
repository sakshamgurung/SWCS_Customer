import React, {Component} from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as authActions} from 'store/ducks/authDuck';
import {navigationRef} from 'store/navigationService';
import AuthNav from 'screens/Auth/AuthNav';
import ExploreNav from 'screens/Explore/ExploreNav';
import HomeNav from 'screens/Home/HomeNav';
import InboxNav from 'screens/Inbox/InboxNav';
import MenuNav from 'screens/Menu/MenuNav';
import WasteDumpNav from 'screens/WasteDump/WasteDumpNav';

const SwitchStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const noNavScreen = [
    'CompanyIndex',
    'SubscriptionForm',
    'LocationPicker',
    'RequestIndex',
  ];
  if (_.includes(noNavScreen, routeName)) {
    return false;
  }
  return true;
};

const MainBottomTabNav = () => (
  <MainBottomTab.Navigator>
    <MainBottomTab.Screen
      name="HomeNav"
      component={HomeNav}
      options={({route}) => ({
        tabBarVisible: getTabBarVisibility(route),
      })}
    />
    <MainBottomTab.Screen name="ExploreNav" component={ExploreNav} />
    <MainBottomTab.Screen name="InboxNav" component={InboxNav} />
    <MainBottomTab.Screen name="WasteDumpNav" component={WasteDumpNav} />
    <MainBottomTab.Screen name="MenuNav" component={MenuNav} />
  </MainBottomTab.Navigator>
);

class Router extends Component {
  render() {
    const {isLoggedIn} = this.props;
    return (
      <NavigationContainer ref={navigationRef}>
        <SwitchStack.Navigator headerMode="none">
          {/* <SwitchStack.Screen
            name="SubscriptionForm"
            component={SubscriptionForm}
          /> */}
          {isLoggedIn ? (
            <SwitchStack.Screen name="Main" component={MainBottomTabNav} />
          ) : (
            <SwitchStack.Screen name="Auth" component={AuthNav} />
          )}
        </SwitchStack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return _.cloneDeep(state.auth);
};

const mapDispatchToProps = dispatch => {
  return {...bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
