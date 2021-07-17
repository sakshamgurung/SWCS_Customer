import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {Header} from 'components/header';
import MenuList from './MenuList';

export class MenuIndex extends Component {
  menuItem = [
    {
      type: 'profile',
      text: 'Profile',
      onPress: () => {
        const {navigation} = this.props;
        navigation.navigate('Profile');
      },
      icon: (
        <MaterialCommIcon
          name="account-circle"
          color={'rgba(255, 255, 255, 1)'}
          size={20}
        />
      ),
    },
    {
      type: 'logout',
      text: 'Logout',
      onPress: () => {
        const {thunkLogout} = this.props;
        thunkLogout();
      },
      icon: (
        <MaterialCommIcon
          name="power"
          color={'rgba(255, 255, 255, 1)'}
          size={20}
        />
      ),
    },
  ];

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header title="Menu" backIconContainerStyle={{flex: 0}} />
        <MenuList data={this.menuItem} />
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(MenuIndex, 'menu');
