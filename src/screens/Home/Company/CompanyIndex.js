import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as homeActions} from 'store/ducks/homeDuck';
import {renderHeader, renderServiceTypes} from './CompanyIndexUtil';
import AboutCompany from './AboutCompany';

export class CompanyIndex extends Component {
  componentDidMount() {
    const {companyId} = this.props.route.params;
    this.props.thunkFetchListItemData('aboutCompany', companyId, undefined);
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.navigate('HomeIndex');
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
        <AboutCompany data={listItemData} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return _.cloneDeep(state.home);
};

const mapDispatchToProps = dispatch => {
  return {...bindActionCreators(homeActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyIndex);
