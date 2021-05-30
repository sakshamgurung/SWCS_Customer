import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';

import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {renderHeader, renderServiceTypes} from './CompanyIndexUtil';
import AboutCompany from './AboutCompany';
import {BtnContained} from 'components/button';

export class CompanyIndex extends Component {
  componentDidMount() {
    const {companyId} = this.props.route.params;
    this.props.thunkFetchListItemData('aboutCompany', companyId, undefined);
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.navigate('HomeIndex');
  };

  showMap = () => {
    const {navigation, route} = this.props;
    const {companyId} = route.params;
    navigation.navigate('MapProfile', {companyId});
  };

  render() {
    const {route, listItemData} = this.props;
    const {navigation, thunkPostCustomerRequest} = this.props;

    let title = '';
    if (listItemData.companyDetail) {
      title = listItemData.companyDetail.companyName;
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        {renderHeader(title, this.goBack)}
        {renderServiceTypes(
          listItemData,
          navigation,
          route.params,
          thunkPostCustomerRequest,
        )}
        <BtnContained text="Show in Map" onPress={this.showMap} />
        <AboutCompany data={listItemData} />
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(CompanyIndex, 'home');
