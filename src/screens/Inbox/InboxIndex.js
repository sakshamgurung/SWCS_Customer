import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {TabRoundBtn} from 'components/tab';
import {Header} from 'components/header';
import {renderList} from './InboxIndexUtil';

export class InboxIndex extends Component {
  selectTab = tab => {
    const {tabSelected} = this.props;
    tabSelected(tab);
  };

  constructor() {
    super();
    this.tabOptionData = [
      {
        text: 'Notification',
        onPress: () => this.selectTab('notification'),
      },
      {
        text: 'Schedule',
        onPress: () => this.selectTab('schedule'),
      },
    ];
  }

  componentDidMount() {
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
  }

  componentWillUnmount() {
    this.refresh();
  }

  remoteCall = () => {
    const {thunkFetchNotificationList, thunkFetchScheduleList} = this.props;
    thunkFetchNotificationList();
    thunkFetchScheduleList();
  };

  render() {
    const {selectedTab, notificationList, scheduleList} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header title="Inbox" backIconContainerStyle={{flex: 0}} />
        <TabRoundBtn data={this.tabOptionData} />
        {renderList(selectedTab, {notificationList, scheduleList})}
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(InboxIndex, 'inbox');
