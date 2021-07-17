import React, {Component} from 'react';
import {Text, View, SafeAreaView, RefreshControl} from 'react-native';
import {Divider} from 'react-native-paper';

import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {TabRoundBtn} from 'components/tab';
import {Header} from 'components/header';
import {renderList} from './HomeIndexUtil';

export class HomeIndex extends Component {
  selectTab = tab => {
    const {tabSelected} = this.props;
    tabSelected(tab);
  };

  constructor() {
    super();
    this.tabOptionData = [
      {
        text: 'All',
        onPress: () => this.selectTab('all'),
      },
      {
        text: 'Request',
        onPress: () => this.selectTab('request'),
      },
      {
        text: 'Subscription',
        onPress: () => this.selectTab('subscription'),
      },
    ];
  }

  componentDidMount() {
    this.props.thunkFetchHomeListData();
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
  }

  componentWillUnmount() {
    this.refresh();
  }

  remoteCall = () => {
    this.props.thunkFetchHomeListData();
  };

  render() {
    const {selectedTab, homeListData} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header backIconContainerStyle={{flex: 0}} />
        <TabRoundBtn selectedTab={selectedTab} data={this.tabOptionData} />
        <View
          style={{
            height: 40,
            width: '100%',
            display: 'flex',
            paddingLeft: 25,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
            Companies
          </Text>
        </View>
        <Divider
          style={{
            color: 'white',
            backgroundColor: 'white',
            width: '90%',
            marginLeft: 20,
          }}
        />
        {renderList(selectedTab, homeListData)}
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(HomeIndex, 'home');
