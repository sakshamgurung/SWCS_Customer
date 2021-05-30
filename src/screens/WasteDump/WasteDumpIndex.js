import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

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
        <Header title="Waste Dump" backIconContainerStyle={{flex: 0}} />
        {renderList({wasteDumpList})}
      </SafeAreaView>
    );
  }
}

export default reduxStoreWrapper(WasteDumpIndex, 'wasteDump');
