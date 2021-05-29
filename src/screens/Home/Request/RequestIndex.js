import React, {Component} from 'react';
import {Text, View, SafeAreaView, Alert} from 'react-native';

import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  renderHeader,
  renderHeaderOptions,
  processWasteListData,
} from './RequestIndexUtil';
import RequestDetail from './RequestDetail';

class RequestIndex extends Component {
  goToEdit = () => {
    const {navigation, route, listItemData} = this.props;
    const {customerRequestChanged} = this.props;
    const {params} = route;
    const {customerRequest} = listItemData;
    const {requestCoordinate, wasteDescription, workDescription} =
      customerRequest;

    customerRequestChanged({
      property: 'requestCoordinate',
      data: requestCoordinate,
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
    const {customerRequestId} = route.params;
    Alert.alert(
      'Delete your request?',
      'Selecting yes will delete this request.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            thunkDeleteCustomerRequest(customerRequestId, 'HomeIndex');
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
    const {customerRequestId, companyId} = this.props.route.params;
    this.props.thunkFetchListItemData(
      'aboutRequest',
      companyId,
      customerRequestId,
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
    const {isHeaderOptionsShown, listItemData} = this.props;

    const {companyDetail, wasteList, customerRequest} = listItemData;

    let title = '';
    if (!_.isEmpty(companyDetail)) {
      title = companyDetail.companyName;
    }

    const {filteredWasteList} = processWasteListData(
      wasteList,
      customerRequest,
    );

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        {renderHeader(title, this.goBack, this.toggleHeaderOptions)}
        {renderHeaderOptions(
          isHeaderOptionsShown,
          this.toggleHeaderOptions,
          this.optionData,
          customerRequest,
        )}
        <RequestDetail
          customerRequest={customerRequest}
          wasteDescriptionData={filteredWasteList}
        />
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(RequestIndex, 'home');
