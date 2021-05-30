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
import {Card, CardSection} from 'components/card';
import {renderHeader, processWasteListData} from './DumpWasteFormUtil';

class DumpWasteForm extends Component {
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
    const {navigation, wasteDumpDataChanged} = this.props;
    Alert.alert(
      'Do you want to cancel?',
      'Selecting yes will discard your progress.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            wasteDumpDataChanged([]);
            navigation.navigate('MapProfile');
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
    const {route, wasteDumpData} = this.props;
    const {thunkPostWasteDump, thunkUpdateWasteDump} = this.props;
    const {mode, companyId, selectedGeoObjectId} = route.params;

    if (_.isEmpty(wasteDumpData)) {
      Alert.alert('Select atleast one waste item', '', [], {
        cancelable: true,
      });
      return;
    }

    for (let e of wasteDumpData) {
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
    if (mode == 'default') {
      thunkPostWasteDump(companyId, selectedGeoObjectId, 'MapProfile');
    } else if (mode == 'edit') {
      thunkUpdateWasteDump(companyId, selectedGeoObjectId, 'MapProfile');
    }
  };

  render() {
    const {route, listItemData, wasteDumpData} = this.props;
    const {wasteDumpDataChanged} = this.props;
    const {mode} = route.params;
    const {wasteList} = listItemData;
    let data = wasteList;

    if (mode == 'edit') {
      const {modifiedWasteList} = processWasteListData(
        wasteList,
        wasteDumpData,
      );
      data = modifiedWasteList;
    }

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
          {renderHeader(this.goBack, this.goNext)}

          <Card>
            <ScrollView scrollEventThrottle={5} showsVerticalScrollIndicator>
              <Text>Waste list</Text>
              <FormWasteList
                data={data}
                dataChanged={wasteDumpDataChanged}
                forScreen={'dumpWaste'}
              />
            </ScrollView>
          </Card>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default reduxStoreWrapper(DumpWasteForm, 'home');
