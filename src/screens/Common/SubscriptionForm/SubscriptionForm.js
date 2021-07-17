import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {FormWasteList} from 'components/list';
import {WorkDescription} from 'components/input';
import {Card, CardSection} from 'components/card';
import {renderHeader} from './SubscriptionFormUtil';
import {processWasteListData} from '../Request/RequestIndexUtil';

class SubscriptionForm extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.goBack,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  goBack = () => {
    const {route, navigation} = this.props;
    const {resetCustomerRequest} = this.props;
    const {mode} = route.params;
    let screenName;
    if (mode == 'default') {
      screenName = 'CompanyIndex';
    } else if (mode == 'edit') {
      screenName = 'RequestIndex';
    }
    Alert.alert(
      'Do you want to cancel?',
      'Selecting yes will discard your progress.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            resetCustomerRequest();
            navigation.navigate(screenName);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
    return true;
  };

  goNext = () => {
    const {navigation, route, customerRequest} = this.props;
    const {params} = route;
    const {workDescription, wasteDescription} = customerRequest;

    if (_.isEmpty(wasteDescription)) {
      Alert.alert('Select atleast one waste item', '', [], {
        cancelable: true,
      });
      return;
    }

    for (let e of wasteDescription) {
      if (_.isEmpty(e.amount)) {
        Alert.alert(
          'Fill approx. amount',
          'Provide approx. amount for selected waste items',
          [],
          {
            cancelable: true,
          },
        );
        return;
      }
    }

    if (_.isEmpty(workDescription)) {
      Alert.alert(
        'Add work description',
        'Add work description to explain your work',
        [],
        {
          cancelable: true,
        },
      );
      return;
    }

    navigation.navigate('LocationPicker', params);
  };

  render() {
    const {route, listItemData, customerRequest} = this.props;
    const {customerRequestChanged} = this.props;

    const {mode} = route.params;
    const {wasteList} = listItemData;
    const {workDescription} = customerRequest;
    let data = wasteList;
    if (mode == 'edit') {
      const {modifiedWasteList} = processWasteListData(
        wasteList,
        customerRequest,
      );
      data = modifiedWasteList;
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
          {renderHeader(this.goBack, this.goNext)}
          <Card>
            <Text>Work description</Text>
            <WorkDescription
              value={workDescription}
              onChangeText={customerRequestChanged}
            />
          </Card>
          <Card>
            <ScrollView scrollEventThrottle={5} showsVerticalScrollIndicator>
              <Text>Waste list</Text>
              <FormWasteList data={data} dataChanged={customerRequestChanged} />
            </ScrollView>
          </Card>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default reduxStoreWrapper(SubscriptionForm, 'home');
