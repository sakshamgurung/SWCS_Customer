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
    const {subscription, subscriptionLoc, oneTime} = data.usedCompanyServices;
    const {serviceType} = data.companyServiceDetail[0];
    const arr = [];

    if (_.includes(serviceType, 'subscription')) {
      arr.push(
        <BtnContained
          key="1"
          disabled={subscriptionLoc || subscription}
          onPress={() =>
            onPressSubscribe(companyId, 'subscription', 'CompanyIndex')
          }
          btnStyle={{
            backgroundColor: subscriptionLoc || subscription ? 'grey' : 'green',
          }}
          text={subscription ? 'Subscribed' : 'Subscribe'}
        />,
      );
    }

    if (_.includes(serviceType, 'subscription with location')) {
      arr.push(
        <BtnContained
          key="2"
          disabled={subscription || subscriptionLoc}
          onPress={() =>
            navigation.navigate('SubscriptionForm', {
              allServiceListIndex,
              companyId,
              serviceType: 'subscription with location',
              mode: 'default',
            })
          }
          btnStyle={{
            backgroundColor:
              subscription || subscriptionLoc ? 'grey' : 'tomato',
          }}
          text={subscriptionLoc ? 'Subscribed with loc' : 'Subscribe with loc'}
        />,
      );
    }

    if (_.includes(serviceType, 'one time')) {
      arr.push(
        <BtnContained
          key="3"
          disabled={oneTime}
          onPress={() =>
            navigation.navigate('SubscriptionForm', {
              allServiceListIndex,
              companyId,
              serviceType: 'one time',
              mode: 'default',
            })
          }
          btnStyle={{backgroundColor: oneTime ? 'grey' : 'navy'}}
          text={oneTime ? 'On deal' : 'One time deal'}
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
