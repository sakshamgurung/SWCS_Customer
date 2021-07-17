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
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {actions as authActions} from 'store/ducks/authDuck';
import {navigationRef} from 'store/navigationService';
import AuthNav from 'screens/Auth/AuthNav';
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
    'MapProfile',
    'RequestIndex',
  ];
  if (_.includes(noNavScreen, routeName)) {
    return false;
  }
  return true;
};

const MainBottomTabNav = () => (
  <MainBottomTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        console.log(route.name, route.name);
        if (route.name === 'Home') {
          iconName = focused ? 'md-home' : 'md-home-outline';
        } else if (route.name === 'Inbox') {
          iconName = focused ? 'mail' : 'mail-outline';
        } else if (route.name === 'Dumps') {
          iconName = focused ? 'trash' : 'trash';
        } else if (route.name === 'Menu') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      tabStyle: {
        backgroundColor: '#1B7AB5',
        color: 'white',
      },
      showLabel: false,
      activeTintColor: 'white',
      inactiveTintColor: 'rgba(255,255,255,0.6)',
    }}>
    <MainBottomTab.Screen
      name="Home"
      component={HomeNav}
      screenOptions={{headerShown: false}}
      options={({route}) => ({
        tabBarVisible: getTabBarVisibility(route),
      })}
    />
    <MainBottomTab.Screen
      options={{headerShown: false}}
      name="Inbox"
      screenOptions={{headerShown: false}}
      component={InboxNav}
    />
    <MainBottomTab.Screen
      screenOptions={{headerShown: false}}
      name="Dumps"
      component={WasteDumpNav}
    />
    <MainBottomTab.Screen
      screenOptions={{headerShown: false}}
      name="Menu"
      component={MenuNav}
    />
  </MainBottomTab.Navigator>
);

class Router extends Component {
  render() {
    const {isLoggedIn} = this.props;
    return (
      <NavigationContainer ref={navigationRef}>
        <SwitchStack.Navigator headerMode="none">
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router);
