import React, {Component} from 'react';
import {Text, View, SafeAreaView, RefreshControl} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as homeActions} from 'store/ducks/homeDuck';
import {TabRoundBtn} from 'components/tab';
import {Header} from 'components/header';
import {renderList} from './HomeIndexUtil';

export class HomeIndex extends Component {
  componentDidMount() {
    this.props.thunkFetchHomeListData();
    this.refresh = this.props.navigation.addListener('focus', this.remoteCall);
  }

  componentWillUnmount() {
    this.refresh();
  }

  remoteCall = () => {
    this.props.thunkFetchHomeListData();
  };

  render() {
    const {selectedTab, homeListData} = this.props;
    const {tabSelected} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <Header title="Home" backIconContainerStyle={{flex: 0}} />
        <TabRoundBtn onPressTab={tabSelected} />
        {renderList(selectedTab, homeListData)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
