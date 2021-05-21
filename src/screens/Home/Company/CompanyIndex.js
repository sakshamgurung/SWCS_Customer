import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as homeActions} from 'store/ducks/homeDuck';
import {renderHeader, renderServiceTypes} from './CompanyIndexUtil';
import AboutCompany from './AboutCompany';

export class CompanyIndex extends Component {
  componentDidMount() {
    const {allServiceListIndex, companyId} = this.props.route.params;
    this.props.thunkFetchListItemData(
      allServiceListIndex,
      'aboutCompany',
      companyId,
    );
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.navigate('HomeIndex');
  };

  render() {
    const {route, homeListData, listItemData} = this.props;
    const {navigation, thunkPostCustomerRequest} = this.props;
    const {allServiceListIndex} = route.params;

    const companyDetail = homeListData.allServiceListData[allServiceListIndex];

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        {renderHeader(companyDetail.companyName, this.goBack)}
        {renderServiceTypes(
          listItemData,
          navigation,
          route.params,
          thunkPostCustomerRequest,
        )}
        <AboutCompany data={{...listItemData, companyDetail}} />
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
