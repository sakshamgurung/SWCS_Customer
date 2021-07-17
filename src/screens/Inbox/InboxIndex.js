import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {TabRoundBtn} from 'components/tab';
import {Header} from 'components/header';
import {renderList} from './InboxIndexUtil';
import isEmpty from 'components/isEmpty';

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
    console.log('schedule list here ', scheduleList);
    const isListEmpty = isEmpty(scheduleList);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header backIconContainerStyle={{flex: 0}} />
        <TabRoundBtn data={this.tabOptionData} />
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
        {renderList(selectedTab, {notificationList, scheduleList})}
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(InboxIndex, 'inbox');
