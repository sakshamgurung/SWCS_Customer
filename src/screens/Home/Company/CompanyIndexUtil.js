import React from 'react';
import {View, StyleSheet} from 'react-native';

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
  navigation,
  params,
  onPressSubscribe,
) => {
  if (!_.isEmpty(data)) {
    const {allServiceListIndex, companyId} = params;
    const {serviceType} = data.companyServiceDetail[0];
    const {subscription, subscriptionLoc, oneTime} =
      data.companyServicesAndStatus;
    const arr = [];
    console.log('doc.companyServicesAndStatus:', data.companyServicesAndStatus);
    if (_.includes(serviceType, 'subscription')) {
      arr.push(
        <BtnContained
          key="1"
          disabled={subscription == 'deactive' ? true : false}
          onPress={() => {
            if (subscription == 'active') {
              onPressSubscribe(companyId, 'subscription', 'CompanyIndex');
            } else {
              console.log('subscription status:', subscription);
            }
          }}
          btnStyle={{
            backgroundColor: subscription == 'deactive' ? 'grey' : 'green',
          }}
          text={
            subscription == 'pending'
              ? 'Subscribe(pending)'
              : subscription == 'unsubscribe'
              ? 'Unsubscribe'
              : 'Subscribe'
          }
        />,
      );
    }

    if (_.includes(serviceType, 'subscription with location')) {
      arr.push(
        <BtnContained
          key="2"
          disabled={subscriptionLoc == 'deactive' ? true : false}
          onPress={() => {
            if (subscriptionLoc == 'active') {
              navigation.navigate('SubscriptionForm', {
                allServiceListIndex,
                companyId,
                serviceType: 'subscription with location',
                mode: 'default',
              });
            } else {
              console.log('subscriptionLoc status:', subscriptionLoc);
            }
          }}
          btnStyle={{
            backgroundColor: subscriptionLoc == 'deactive' ? 'grey' : 'tomato',
          }}
          text={
            subscriptionLoc == 'pending'
              ? 'Subscribe + location(pending)'
              : 'Subscribe + location'
          }
        />,
      );
    }

    if (_.includes(serviceType, 'one time')) {
      arr.push(
        <BtnContained
          key="3"
          onPress={() => {
            if (oneTime == 'active') {
              navigation.navigate('SubscriptionForm', {
                allServiceListIndex,
                companyId,
                serviceType: 'one time',
                mode: 'default',
              });
            } else {
              console.log('oneTime status:', oneTime);
            }
          }}
          btnStyle={{backgroundColor: 'navy'}}
          text={
            oneTime == 'active' ? 'One time deal' : `One time deal(${oneTime})`
          }
        />,
      );
    }
    return <View style={styles.serviceBtnContainer}>{arr}</View>;
  }
};

const styles = StyleSheet.create({
  serviceBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});