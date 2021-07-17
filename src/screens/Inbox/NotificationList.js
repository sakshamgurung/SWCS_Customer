import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card, CardSection} from 'components/card';
import _ from 'lodash';

export default function NotificationList({data, isListEmpty}) {
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
        screen = 'CompanyIndex';
        params = {
          companyId: data.from.id,
        };
        break;
      }
      case 'requestDenied': {
        break;
      }
      case 'requestAccepted':
      case 'requestAssigned': {
        screen = 'RequestIndex';
        params = {
          companyId: data.from.id,
          customerRequestId: data.targetCollection.id,
        };
        break;
      }
      case 'requestFinished': {
        break;
      }
      case 'workConfirmed':
      case 'workOnProgress': {
        screen = 'Work';
        params = {
          workId: data.targetCollection.id,
        };
        break;
      }
      case 'workFinished': {
        break;
      }
    }

    if (!_.isEmpty(params)) {
      navigation.navigate(screen, params);
    } else {
      navigation.navigate(screen);
    }
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
      <View
        style={{
          width: '100%',
          // borderWidth: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableRipple
          key={index}
          onPress={() => {
            gotoScreen(item);
          }}
          rippleColor="rgba(0,0,0,0.2)"
          style={[
            // props.touchableHeight,
            {
              width: '90%',
              padding: 8,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginTop: 7,
              marginBottom: 7,
            },
          ]}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View
                style={[
                  {
                    backgroundColor: 'rgba(230, 238, 235,0.9)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                  },
                  // props.AvatarStyle,
                ]}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#1B7AB5',
                  }}>
                  S
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.6,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View>
                <Text
                  style={{
                    color: 'rgba(230, 238, 235,0.9)',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  {companyNameLine !== null ? companyNameLine : ''}
                </Text>
              </View>
              <View>
                <Caption style={{color: '#E6EEEB'}}>
                  {line1 !== null ? line1 : ''}
                </Caption>
              </View>
              <View>
                <Caption style={{color: '#E6EEEB'}}>{sentDate}</Caption>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* {props.StaffInfoIcon ? ( */}
              <MaterialIcons
                name="arrow-right"
                size={35}
                color="rgba(230, 238, 235,0.9)"
              />
              {/* ) : (
                  <Icon name="md-add-circle" size={35} color="white" />
                )} */}
            </View>
          </View>
        </TouchableRipple>
      </View>
      // <CardSection>
      //   <TouchableOpacity onPress={() => gotoScreen(item)}>
      //     <MaterialCommunityIcons
      //       name="bell"
      //       size={25}
      //       color="rgba(55, 125, 204, 1)"
      //     />
      //     <Text>{item._id}</Text>
      //     <Text>{companyNameLine}</Text>
      //     {line1 != null ? <Text>{line1}</Text> : null}
      //     <Text>{sentDate}</Text>
      //   </TouchableOpacity>
      // </CardSection>
    );
  };

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  return !isListEmpty ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  ) : (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Text style={{fontStyle: 'italic', color: 'white'}}>List is empty</Text>
    </View>
  );
}
