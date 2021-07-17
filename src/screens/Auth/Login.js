import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Card from '../../components/others/Card';
import CardSection from '../../components/others/CardSection';
import OrSeparator from '../../components/others/OrSeparator';
import Inputs from '../../components/others/Inputs';
import LoaderButton from '../../components/Buttons/LoaderButton';
import MainButton from '../../components/Buttons/MainButton';
import _ from 'lodash';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
// import {CardSection} from 'components/card';
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

  state = {
    loginLoader: false,
  };

  storeDeviceToken = token => {
    if (!_.isEmpty(token)) {
      this.props.storeDeviceToken(token);
    }
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

  login = () => {
    const {thunkLogin} = this.props;
    // this.setState({loginLoader: true});
    thunkLogin();
    // this.setState({loginLoader: false});
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
    const {loginDataChanged, togglePassword} = this.props;
    console.log('logMessage,loginLoader', logMessage, this.props.loading);

    // Rendering LOGIN button
    let loginBtn = (
      <MainButton
        disabled={this.props.loading}
        height={40}
        width={170}
        onPress={() => this.login()}>
        Login
      </MainButton>
    );
    if (this.props.loading) {
      loginBtn = <LoaderButton height="40" width="170" />;
    }

    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../../images/LoginBack.png')}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
          <View
            style={{
              flex: 0.8,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Card>
              <CardSection>
                <View
                  style={{
                    width: 90,
                    height: 35,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                    {'LOGIN'.split('').join(' ')}
                  </Text>
                </View>
              </CardSection>

              <ScrollView style={{width: 230}}>
                <CardSection>
                  <Inputs
                    secureTextEntry={false}
                    onChangeText={text =>
                      loginDataChanged({property: 'email', value: text})
                    }
                    value={loginData.email}
                    elementType={`text`}
                    elementConfig={{
                      placeholder: 'Customer Email',
                      placeholderTextColor: 'white',
                    }}
                  />
                </CardSection>
                <CardSection>
                  <Inputs
                    secureTextEntry={!isPasswordShown}
                    onChangeText={text =>
                      loginDataChanged({property: 'password', value: text})
                    }
                    value={loginData.password}
                    elementType={`text`}
                    elementConfig={{
                      placeholder: 'Password',
                      placeholderTextColor: 'white',
                    }}
                  />
                </CardSection>
                <CardSection>
                  <Inputs
                    elementType="checkbox"
                    elementConfig={{
                      flexDirection: 'row',
                      color: 'white',
                      marginLeft: -100,
                      fontSize: 15,
                      minWidth: 100,
                      label: 'Show password',
                      subDescription: null,
                    }}
                    onChangeText={togglePassword}
                    isChecked={isPasswordShown}
                  />
                </CardSection>
                {logMessage && logMessage.msg.length !== 0 ? (
                  <CardSection>
                    <Text
                      style={{
                        color: '#009688',
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'lightgreen',
                        elevation: 3,
                      }}>
                      {logMessage.msg}
                    </Text>
                  </CardSection>
                ) : null}
                <CardSection>{loginBtn}</CardSection>
              </ScrollView>
              <CardSection>
                <Text style={{color: '#57FF62'}}>Forgot Password?</Text>
              </CardSection>
              <CardSection>
                <OrSeparator />
              </CardSection>
              <CardSection>
                <Text
                  onPress={() => navigation.navigate('Signup')}
                  style={{color: '#57FF62'}}>
                  Create New Account
                </Text>
              </CardSection>
            </Card>
          </View>
        </View>
      </ImageBackground>

      // <View>
      //   <Text style={typography.sectionTitle}> Login </Text>
      //   <CardSection>
      //     <Text style={typography.sectionTitle}> Email </Text>
      //     <TextInput
      //       autoCorrect={false}
      //       placeholder="email"
      //       placeholderTextColor="grey"
      //       keyboardType="visible-password"
      //       style={styles.input}
      //       onChangeText={text =>
      //         loginDataChanged({property: 'email', value: text})
      //       }
      //       value={loginData.email}
      //     />
      //   </CardSection>
      //   <CardSection>
      //     <Text style={typography.sectionTitle}> Password </Text>
      //     <TextInput
      //       autoCorrect={false}
      //       autoCompleteType="off"
      //       placeholder="password"
      //       placeholderTextColor="grey"
      //       keyboardType="default"
      //       secureTextEntry={!isPasswordShown}
      //       style={styles.input}
      //       onChangeText={text =>
      //         loginDataChanged({property: 'password', value: text})
      //       }
      //       value={loginData.password}
      //     />
      //   </CardSection>
      //   <View style={styles.switchContainer}>
      //     <Text style={styles.switchText}>
      //       {isPasswordShown ? 'Hide' : 'Show'} password
      //     </Text>
      //     <Switch
      //       style={styles.switch}
      //       trackColor={{false: '#767577', true: '#81b0ff'}}
      //       thumbColor={isPasswordShown ? '#6c9df0' : '#f4f3f4'}
      //       onValueChange={togglePassword}
      //       value={isPasswordShown}
      //     />
      //   </View>

      //   <BtnContained onPress={this.login} text="Login" />
      //   {this.renderLogMessage(logMessage)}

      //   <BtnContained
      //     onPress={() => navigation.navigate('Signup')}
      //     text="Create new Account"
      //   />
      // </View>
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

export default reduxStoreWrapper(Login, 'auth');
