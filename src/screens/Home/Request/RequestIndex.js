import React, {Component} from 'react';
import {Text, View, SafeAreaView, Alert} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as homeActions} from 'store/ducks/homeDuck';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  renderHeader,
  renderHeaderOptions,
  processWasteListData,
} from './RequestIndexUtil';
import RequestDetail from './RequestDetail';

class RequestIndex extends Component {
  goToEdit = () => {
    const {navigation, route, homeListData} = this.props;
    const {customerRequestChanged} = this.props;
    const {params} = route;
    const {requestListIndex} = params;
    const customerRequest = homeListData.requestListData[requestListIndex];
    const {requestCoordinate, wasteDescription, workDescription} =
      customerRequest;
    const {identifier, coordinates} = requestCoordinate;
    customerRequestChanged({
      property: 'requestCoordinate',
      data: {
        identifier,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });
    customerRequestChanged({
      property: 'wasteDescription',
      data: wasteDescription,
    });
    customerRequestChanged({
      property: 'workDescription',
      data: workDescription,
    });
    this.toggleHeaderOptions();
    navigation.navigate('SubscriptionForm', {...params, mode: 'edit'});
  };

  goToDelete = () => {
    const {route} = this.props;
    const {thunkDeleteCustomerRequest} = this.props;
    const {requestListIndex} = route.params;
    Alert.alert(
      'Delete your request?',
      'Selecting yes will delete this request.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            thunkDeleteCustomerRequest(requestListIndex, 'HomeIndex');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  constructor() {
    super();
    this.optionData = [
      {
        text: 'Edit',
        enabled: true,
        onPress: this.goToEdit,
        icon: (
          <MaterialCommIcon
            name="pencil"
            color={'rgba(0, 0, 0, 1)'}
            size={20}
          />
        ),
      },
      {
        text: 'Delete',
        onPress: this.goToDelete,
        enabled: true,
        icon: <MaterialCommIcon name="delete" color="tomato" size={20} />,
      },
    ];
  }
  componentDidMount() {
    const {requestListIndex, companyId} = this.props.route.params;
    this.props.thunkFetchListItemData(
      requestListIndex,
      'aboutCompany',
      companyId,
    );
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.navigate('HomeIndex');
  };

  toggleHeaderOptions = () => {
    const {toggleHeaderOptions} = this.props;
    toggleHeaderOptions();
  };

  render() {
    const {isHeaderOptionsShown, route, homeListData, listItemData} =
      this.props;

    const {requestListIndex} = route.params;
    const customerRequest = homeListData.requestListData[requestListIndex];
    const {companyName} = customerRequest.companyDetail;
    const {wasteDescription} = customerRequest;
    const {wasteList} = listItemData;
    const {filteredWasteList} = processWasteListData(
      wasteList,
      wasteDescription,
    );
    const {requestType, requestStatus} = customerRequest;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        {renderHeader(companyName, this.goBack, this.toggleHeaderOptions)}
        {renderHeaderOptions(
          isHeaderOptionsShown,
          this.toggleHeaderOptions,
          this.optionData,
          requestType,
          requestStatus,
        )}
        <RequestDetail data={{...customerRequest, filteredWasteList}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestIndex);
