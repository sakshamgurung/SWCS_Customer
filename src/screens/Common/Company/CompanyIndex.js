import React, {Component} from 'react';
import {Text, SafeAreaView, View} from 'react-native';

import _ from 'lodash';

import {CommonActions} from '@react-navigation/native';
import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {renderHeader, renderServiceTypes} from './CompanyIndexUtil';
import AboutCompany from './AboutCompany';
import {BtnContained} from 'components/button';

export class CompanyIndex extends Component {
  componentDidMount() {
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
  }

  componentWillUnmount() {
    this.refresh();
  }

  remoteCall = () => {
    const {companyId} = this.props.route.params;
    this.props.thunkFetchListItemData('aboutCompany', companyId, undefined);
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.dispatch(CommonActions.goBack());
  };

  requestSubscribe = () => {
    const {navigation, thunkPostCustomerRequest, thunkUnsubscribe} = this.props;
    const {route, listItemData} = this.props;

    const {companyId} = route.params;
    const {
      subscription,
      subscriptionRequestId,
    } = listItemData.companyServicesAndStatus;

    if (subscription == 'active') {
      thunkPostCustomerRequest(companyId, 'subscription');
      this.remoteCall();
    } else if (subscription == 'pending') {
      navigation.navigate('RequestIndex', {
        customerRequestId: subscriptionRequestId,
        companyId,
      });
    } else if (subscription == 'unsubscribe') {
      thunkUnsubscribe();
      this.remoteCall();
    }
  };

  requestSubscribeWithLocation = () => {
    const {navigation} = this.props;
    const {route, listItemData} = this.props;

    const {companyId} = route.params;
    const {
      subscriptionLoc,
      subscriptionLocRequestId,
    } = listItemData.companyServicesAndStatus;

    if (subscriptionLoc == 'active') {
      navigation.navigate('SubscriptionForm', {
        companyId,
        serviceType: 'subscription with location',
        mode: 'default',
      });
    } else if (subscriptionLoc == 'pending') {
      navigation.navigate('RequestIndex', {
        customerRequestId: subscriptionLocRequestId,
        companyId,
      });
    }
  };

  requestOneTimeDeal = () => {
    const {navigation} = this.props;
    const {route, listItemData} = this.props;

    const {companyId} = route.params;
    const {oneTime, oneTimeRequestId} = listItemData.companyServicesAndStatus;
    if (oneTime == 'active') {
      navigation.navigate('SubscriptionForm', {
        companyId,
        serviceType: 'one time',
        mode: 'default',
      });
    } else {
      navigation.navigate('RequestIndex', {
        customerRequestId: oneTimeRequestId,
        companyId,
      });
    }
  };

  showMap = () => {
    const {navigation, route} = this.props;
    const {companyId} = route.params;
    navigation.navigate('MapProfile', {companyId});
  };

  render() {
    const {listItemData} = this.props;

    let title = '';
    if (listItemData.companyDetail) {
      title = listItemData.companyDetail.companyName;
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        {renderHeader(title, this.goBack)}
        <View style={{marginTop: 30}}></View>
        {renderServiceTypes(
          listItemData,
          this.requestSubscribe,
          this.requestSubscribeWithLocation,
          this.requestOneTimeDeal,
          this.showMap,
        )}
        <AboutCompany data={listItemData} />
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(CompanyIndex, 'home');
