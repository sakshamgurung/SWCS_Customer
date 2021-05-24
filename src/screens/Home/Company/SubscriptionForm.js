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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as homeActions} from 'store/ducks/homeDuck';
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
    const {route} = this.props;
    const {thunkResetCustomerRequest} = this.props;
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
          onPress: () => thunkResetCustomerRequest(screenName),
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
    const {route} = this.props;
    const {mode} = route.params;

    const {listItemData, customerRequest} = this.props;
    const {customerRequestChanged} = this.props;
    const {wasteList} = listItemData;
    const {workDescription} = customerRequest;

    if (mode == 'default') {
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
                <FormWasteList
                  data={wasteList}
                  dataChanged={customerRequestChanged}
                />
              </ScrollView>
            </Card>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    } else if (mode == 'edit') {
      const {modifiedWasteList} = processWasteListData(
        wasteList,
        customerRequest,
      );

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
                <FormWasteList
                  data={modifiedWasteList}
                  dataChanged={customerRequestChanged}
                />
              </ScrollView>
            </Card>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    }
  }
}

const mapStateToProps = state => {
  return _.cloneDeep(state.home);
};

const mapDispatchToProps = dispatch => {
  return {...bindActionCreators(homeActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm);
