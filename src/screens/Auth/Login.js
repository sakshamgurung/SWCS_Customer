import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Switch} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as authActions} from 'store/ducks/authDuck';
import {CardSection} from 'components/card';
import {BtnContained} from 'components/button';
import {typography} from 'lib/res';
import {fcmNotificationServices} from 'notification/FcmNotificationServices';
import {localNotificationServices} from 'notification/LocalNotificationServices';

export class Login extends Component {
  constructor(props) {
    super(props);
    localNotificationServices.createDefaultChannel();
    fcmNotificationServices.register(this.storeDeviceToken, this.onMessage);
  }

  storeDeviceToken = token => {
    console.log('storing device token...');
    if (!_.isEmpty(token)) {
      this.props.storeDeviceToken(token);
    }
    console.log('device token stored.');
  };

  onMessage = (message, state) => {
    if (state === 'quiteTrigger') {
      console.log('inside quite trigger');
    } else if (state === 'backgroundTrigger') {
      console.log('inside background trigger');
    } else if (state === 'foreground') {
      console.log('inside foreground');
      localNotificationServices.localNotification(message.notification, {});
    } else if (state === 'background') {
    }
  };

  renderLogMessage = logMessage => {
    const {type, msg} = logMessage;
    if (_.isEmpty(type)) {
      return null;
    } else if (type == 'failed') {
      return <Text>{msg}</Text>;
    }
  };

  render() {
    const {navigation} = this.props;
    const {loginData, isPasswordShown, logMessage} = this.props;
    const {loginDataChanged, togglePassword, thunkLogin} = this.props;
    return (
      <View>
        <Text style={typography.sectionTitle}> Login </Text>
        <CardSection>
          <Text style={typography.sectionTitle}> Email </Text>
          <TextInput
            autoCorrect={false}
            placeholder="email"
            placeholderTextColor="grey"
            keyboardType="visible-password"
            style={styles.input}
            onChangeText={text =>
              loginDataChanged({property: 'email', value: text})
            }
            value={loginData.email}
          />
        </CardSection>
        <CardSection>
          <Text style={typography.sectionTitle}> Password </Text>
          <TextInput
            autoCorrect={false}
            placeholder="password"
            placeholderTextColor="grey"
            keyboardType="default"
            secureTextEntry={!isPasswordShown}
            style={styles.input}
            onChangeText={text =>
              loginDataChanged({property: 'password', value: text})
            }
            value={loginData.password}
          />
        </CardSection>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isPasswordShown ? 'Hide' : 'Show'} password
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isPasswordShown ? '#6c9df0' : '#f4f3f4'}
            onValueChange={togglePassword}
            value={isPasswordShown}
          />
        </View>

        <BtnContained onPress={thunkLogin} text="Login" />
        {this.renderLogMessage(logMessage)}

        <BtnContained
          onPress={() => navigation.navigate('Signup')}
          text="Create new Account"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    height: 40,
    fontFamily: 'monospace sans-serif',
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 5,
    paddingBottom: 0,
  },
  switchContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  switchText: {
    flex: 0.3,
  },
  switch: {
    flex: 0.2,
  },
});

const mapStateToProps = state => {
  return _.cloneDeep(state.auth);
};

const mapDispatchToProps = dispatch => {
  return {...bindActionCreators(authActions, dispatch)};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
