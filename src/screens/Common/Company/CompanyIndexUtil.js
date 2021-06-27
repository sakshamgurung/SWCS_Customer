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
  onPressSubscribe,
  onPressSubscribeWithLocation,
  onPressOneTimeDeal,
  onPressShowMap,
) => {
  if (!_.isEmpty(data)) {
    const {serviceType} = data.companyServiceDetail;
    const {subscription, subscriptionLoc, oneTime} =
      data.companyServicesAndStatus;
    const arr = [];

    if (_.includes(serviceType, 'subscription')) {
      arr.push(
        <BtnContained
          key="1"
          disabled={subscription == 'deactive' ? true : false}
          onPress={onPressSubscribe}
          btnStyle={[
            {
              backgroundColor: subscription == 'deactive' ? 'grey' : 'green',
            },
            styles.serviceBtn,
          ]}
          textStyle={[styles.serviceBtnText]}
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
          onPress={onPressSubscribeWithLocation}
          btnStyle={[
            {
              backgroundColor:
                subscriptionLoc == 'deactive' ? 'grey' : 'tomato',
            },
            styles.serviceBtn,
          ]}
          textStyle={[styles.serviceBtnText]}
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
          onPress={onPressOneTimeDeal}
          btnStyle={[{backgroundColor: 'navy'}, styles.serviceBtn]}
          textStyle={[styles.serviceBtnText]}
          text={
            oneTime == 'active' ? 'One time deal' : `One time deal(${oneTime})`
          }
        />,
      );
    }
    arr.push(
      <BtnContained
        key="4"
        btnStyle={[{backgroundColor: 'navy'}, styles.serviceBtn]}
        textStyle={[styles.serviceBtnText]}
        text="Show in Map"
        onPress={onPressShowMap}
      />,
    );

    return <View style={styles.serviceBtnContainer}>{arr}</View>;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  serviceBtnContainer: {},
  serviceBtn: {height: 30},
  serviceBtnText: {
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
});
