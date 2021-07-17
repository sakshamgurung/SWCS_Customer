import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {Header} from 'components/header';
import {renderList} from './WasteDumpIndexUtil';

export class WasteDumpIndex extends Component {
  componentDidMount() {
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
  }

  componentWillUnmount() {
    this.refresh();
  }

  remoteCall = () => {
    const {thunkFetchWasteDumpList} = this.props;
    thunkFetchWasteDumpList();
  };

  render() {
    const {wasteDumpList} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header backIconContainerStyle={{flex: 0}} />
        <View
          style={{
            height: 40,
            width: '100%',
            display: 'flex',
            paddingLeft: 25,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
            Waste Dumps
          </Text>
        </View>
        <Divider
          style={{
            color: 'white',
            backgroundColor: 'white',
            width: '90%',
            marginLeft: 20,
          }}
        />
        {renderList({wasteDumpList})}
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(WasteDumpIndex, 'wasteDump');
