import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  BackHandler,
} from 'react-native';

import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {CardSection} from 'components/card';
import {BtnContained} from 'components/button';
import {typography} from 'lib/res';

export class Signup extends Component {
  componentWillUnmount() {
    const {reset} = this.props;
    reset();
  }

  renderLogMessage = logMessage => {
    const {type, msg} = logMessage;
    if (_.isEmpty(type)) {
      return null;
    } else if (type == 'success') {
      return <Text>{msg}</Text>;
    } else if (type == 'failed') {
      return <Text>{msg}</Text>;
    }
  };

  singUp = () => {
    const {thunkSignup} = this.props;
    thunkSignup();
  };

  render() {
    const {signupData, isPasswordShown, logMessage} = this.props;
    const {signupDataChanged, togglePassword} = this.props;
    return (
      <View>
        <Text style={typography.sectionTitle}> Sign Up </Text>
        <CardSection>
          <Text style={typography.sectionTitle}> Email </Text>
          <TextInput
            placeholder="email"
            placeholderTextColor="grey"
            keyboardType="visible-password"
            style={styles.input}
            onChangeText={text =>
              signupDataChanged({property: 'email', value: text})
            }
            value={signupData.email}
          />
        </CardSection>
        <CardSection>
          <Text style={typography.sectionTitle}> Mobile number </Text>
          <TextInput
            placeholder="mobile number"
            placeholderTextColor="grey"
            keyboardType="phone-pad"
            style={styles.input}
            onChangeText={text =>
              signupDataChanged({property: 'mobileNo', value: text})
            }
            value={signupData.mobileNo}
          />
        </CardSection>
        <CardSection>
          <Text style={typography.sectionTitle}> Password </Text>
          <TextInput
            autoCorrect={false}
            placeholder="password"
            placeholderTextColor="grey"
            keyboardType="visible-password"
            secureTextEntry={!isPasswordShown}
            style={styles.input}
            onChangeText={text =>
              signupDataChanged({property: 'password', value: text})
            }
            value={signupData.password}
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
        <BtnContained onPress={this.singUp} text="Sign Up" />
        {this.renderLogMessage(logMessage)}
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

export default reduxStoreWrapper(Signup, 'auth');
