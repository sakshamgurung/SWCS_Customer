import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import {} from 'store/ducks/inboxDuck'
import {Card, CardSection} from 'components/card';

export default function NotificationList({data}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    //await wait(2000);
    // dispatch(thunkFetchNotificationList());
    setRefreshing(false);
  }, []);

  const gotoScreen = data => {
    let screen = 'InboxIndex';
    let params = {};
    switch (data.message.data.status) {
      case 'subscribed': {
        screen = 'HomeIndex';
        break;
      }
      case 'requestDenied': {
        break;
      }
      case 'requestAccepted':
      case 'requestAssigned': {
        screen = 'HomeIndex';
        break;
      }
      case 'requestFinished': {
        break;
      }
      case 'workConfirmed':
      case 'workOnProgress': {
        screen = 'InboxIndex'; //for now
        break;
      }
      case 'workFinished': {
        break;
      }
    }
    navigation.navigate(screen);
  };

  const Item = ({item, index}) => {
    let companyNameLine = null;
    let line1 = null;
    let sentDate = null;

    sentDate = moment(item.sentDate).format('MMMM Do YYYY, h:mm a');

    if (item.from.role == 'company') {
      companyNameLine = `Company: ${item.message.data.companyName}`;
    }
    if (item.targetCollection && item.targetCollection.name == 'works') {
      const {status, workTitle} = item.message.data;
      switch (status) {
        case 'workConfirmed':
          line1 = `New work: ${workTitle} is confirmed for your area. Check your schedule for pickup date and time.`;
          break;
        case 'workOnProgress':
          line1 = `Work: ${workTitle} is under progress in your area. Check your schedule for pickup date and time.`;
          break;
      }
      line1 = `Work Schedule: ${workTitle} is ${status}`;
    } else if (
      item.targetCollection &&
      item.targetCollection.name == 'customerRequests'
    ) {
      const {status} = item.message.data;
      switch (status) {
        case 'requestDenied':
          line1 = `Request: Your request is denied.`;
          break;
        case 'requestAccepted':
          line1 = `Request: Your requested work (One time deal) is accepted. Check your schedule.`;
          break;
        case 'requestAssigned':
          line1 = `Request: Your requested work (One time deal) is assigned to collector. Check your schedule.`;
          break;
        case 'requestFinished':
          line1 = `Request: Your requested work (One time deal) is finished.`;
          break;
      }
    } else {
      const {status} = item.message.data;
      switch (status) {
        case 'subscribed':
          line1 = `You are now subscribed to company.`;
      }
    }

    return (
      <CardSection>
        <TouchableOpacity onPress={() => gotoScreen(item)}>
          <MaterialCommunityIcons
            name="bell"
            size={25}
            color="rgba(55, 125, 204, 1)"
          />
          <Text>{item._id}</Text>
          <Text>{companyNameLine}</Text>
          {line1 != null ? <Text>{line1}</Text> : null}
          <Text>{sentDate}</Text>
        </TouchableOpacity>
      </CardSection>
    );
  };

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
}
