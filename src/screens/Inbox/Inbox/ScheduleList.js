import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Card, CardSection} from 'components/card';

export default function ScheduleList({data}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(2000);
    setRefreshing(false);
  }, []);

  const gotoScreen = data => {
    let screen = undefined;
    let params = {};
    if (data.hasOwnProperty('workId')) {
      screen = 'Work';
      params.workId = data.workId._id;
    } else if (data.hasOwnProperty('customerRequestId')) {
      screen = 'HomeIndex'; //just for now
    }
    navigation.navigate(screen, params);
  };

  const Item = ({item, index}) => {
    let companyNameLine = null;
    let line1 = null;
    let dateLine = null;
    companyNameLine = item.companyDetail.companyName;
    if (item.hasOwnProperty('workId')) {
      const {_id, workTitle, workStatus, endTime} = item.workId;
      dateLine = endTime;
      switch (workStatus) {
        case 'confirmed':
          line1 = `New work: ${workTitle} is confirmed for your area.`;
          break;
        case 'on progress':
          line1 = `Work: ${workTitle} is under progress in your area.`;
          break;
      }
    } else if (item.hasOwnProperty('customerRequestId')) {
      const {_id, requestStatus} = item.customerRequestId;
      switch (requestStatus) {
        case 'accepted':
          line1 = `Request: requestId(${_id}) Your requested work (One time deal) is accepted.`;
          break;
        case 'assigned':
          line1 = `Request: requestId(${_id}) Your requested work (One time deal) is assigned to collector.`;
          break;
      }
    }

    return (
      <CardSection>
        <TouchableOpacity onPress={() => gotoScreen(item)}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={25}
            color="rgba(55, 125, 204, 1)"
          />
          <Text>{item._id}</Text>
          {companyNameLine == null ? null : <Text>{companyNameLine}</Text>}
          {line1 == null ? null : <Text>{line1}</Text>}
          {dateLine == null ? null : <Text>{dateLine}</Text>}
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
