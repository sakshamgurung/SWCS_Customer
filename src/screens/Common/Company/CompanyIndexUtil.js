import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Chip} from 'react-native-paper';
import _ from 'lodash';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Header} from 'components/header';
import {BtnContained} from 'components/button';

export const renderHeader = (title, onPressBack) => {
  return (
    <Header
      title={title}
      backIcon={
        <MaterialCommIcon
          name="arrow-left"
          color="rgba(255, 255, 255, 1)"
          size={20}
        />
      }
      onPressBack={onPressBack}
    />
  );
};

export const renderServiceTypes = (
  data,
  onPressSubscribe,
  onPressSubscribeWithLocation,
  onPressOneTimeDeal,
  onPressShowMap,
) => {
  if (!_.isEmpty(data)) {
    const {serviceType} = data.companyServiceDetail;
    const {
      subscription,
      subscriptionLoc,
      oneTime,
    } = data.companyServicesAndStatus;
    const arr1 = [];
    const arr2 = [];

    if (_.includes(serviceType, 'subscription')) {
      arr1.push(
        <Chip
          style={{
            color: 'red',
            width: '40%',
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: subscription == 'deactive' ? '#E0E0E0' : '#E0E0E0',
            color: 'white',
          }}
          key="1"
          disabled={subscription == 'deactive' ? true : false}
          onPress={onPressSubscribe}
          // btnStyle={[
          //   {
          //     backgroundColor: subscription == 'deactive' ? 'grey' : 'green',
          //   },
          //   styles.serviceBtn,
          // ]}
          // textStyle={[styles.serviceBtnText]}
          // text={
          //   subscription == 'pending'
          //     ? 'Subscribe(pending)'
          //     : subscription == 'unsubscribe'
          //     ? 'Unsubscribe'
          //     : 'Subscribe'
          // }
        >
          {subscription == 'pending' ? (
            <Text
              style={{color: subscription == 'deactive' ? 'gray' : 'black'}}>
              Subscribe(pending)
            </Text>
          ) : subscription == 'unsubscribe' ? (
            <Text
              style={{color: subscription == 'deactive' ? 'gray' : 'black'}}>
              Unsubscribe
            </Text>
          ) : (
            'Subscribe'
          )}
        </Chip>,
      );
    }

    if (_.includes(serviceType, 'subscription with location')) {
      arr1.push(
        <Chip
          key="2"
          disabled={subscriptionLoc == 'deactive' ? true : false}
          onPress={onPressSubscribeWithLocation}
          style={{
            width: '40%',
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              subscriptionLoc == 'deactive' ? '#E0E0E0' : '#E0E0E0',
            color: 'white',
          }}
          // btnStyle={[
          //   {
          //     backgroundColor:
          //       subscriptionLoc == 'deactive' ? 'grey' : 'tomato',
          //   },
          //   styles.serviceBtn,
          // ]}
          // textStyle={[styles.serviceBtnText]}
          // text={
          //   subscriptionLoc == 'pending'
          //     ? 'Subscribe + location(pending)'
          //     : 'Subscribe + location'
          // }
        >
          {subscriptionLoc == 'pending' ? (
            <Text
              style={{color: subscriptionLoc == 'deactive' ? 'gray' : 'black'}}>
              Subscribe + location(pending)
            </Text>
          ) : (
            <Text
              style={{color: subscriptionLoc == 'deactive' ? 'gray' : 'black'}}>
              Subscribe + location
            </Text>
          )}
        </Chip>,
      );
    }

    if (_.includes(serviceType, 'one time')) {
      arr2.push(
        <Chip
          key="3"
          onPress={onPressOneTimeDeal}
          // btnStyle={[{backgroundColor: 'navy'}, styles.serviceBtn]}
          style={{
            width: '40%',
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E0E0E0',
            color: 'black',
          }}
          // textStyle={[styles.serviceBtnText]}
          // text={
          //   oneTime == 'active' ? 'One time deal' : `One time deal(${oneTime})`
          // }
        >
          {oneTime == 'active' ? (
            <Text style={{color: 'black'}}>One time deal</Text>
          ) : (
            <Text style={{color: 'black'}}>One time deal(${oneTime})</Text>
          )}
        </Chip>,
      );
    }
    arr2.push(
      <Chip
        key="4"
        style={{
          width: '40%',
          margin: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E0E0E0',
        }}
        // btnStyle={[{backgroundColor: 'navy'}, styles.serviceBtn]}
        // textStyle={[styles.serviceBtnText]}
        // text="Show in Map"
        onPress={onPressShowMap}>
        <Text style={{color: 'black'}}>Show in Map</Text>
      </Chip>,
    );

    return (
      <View style={styles.serviceBtnContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>{arr1}</View>
        <View style={{display: 'flex', flexDirection: 'row'}}>{arr2}</View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  serviceBtnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceBtn: {height: 30},
  serviceBtnText: {
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
});
