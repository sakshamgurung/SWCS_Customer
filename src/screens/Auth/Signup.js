import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  BackHandler,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/others/Card';
import CardSection from '../../components/others/CardSection';
import OrSeparator from '../../components/others/OrSeparator';
import Inputs from '../../components/others/Inputs';
import LoaderButton from '../../components/Buttons/LoaderButton';
import MainButton from '../../components/Buttons/MainButton';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
// import {CardSection} from 'components/card';
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

    let signupBtn = (
      <MainButton height={40} width={170} onPress={() => this.singUp()}>
        Sign Up
      </MainButton>
    );
    if (this.props.loading) {
      signupBtn = <LoaderButton />;
    }

    console.log(' signup loader ', this.props.loading);

    return (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../../images/LoginBack.png')}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 0.23, width: '100%', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{padding: 40}}>
              <Icon name="arrow-left" size={20} style={{color: 'white'}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.77,
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}>
            <Card>
              <CardSection>
                <View
                  style={{
                    width: 100,
                    height: 35,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                    {'SIGNUP'.split('').join(' ')}
                  </Text>
                </View>
              </CardSection>
              <ScrollView style={{width: 230}}>
                <CardSection>
                  <Inputs
                    secureTextEntry={false}
                    value={signupData.email}
                    onChangeText={text => {
                      signupDataChanged({property: 'email', value: text});
                    }}
                    elementType={`text`}
                    elementConfig={{
                      placeholder: 'Email',
                      placeholderTextColor: 'white',
                    }}
                  />
                </CardSection>
                <CardSection>
                  <Inputs
                    secureTextEntry={false}
                    value={signupData.mobileNo}
                    onChangeText={text => {
                      signupDataChanged({property: 'mobileNo', value: text});
                    }}
                    elementType={`text`}
                    elementConfig={{
                      placeholder: 'Mobile No',
                      placeholderTextColor: 'white',
                    }}
                  />
                </CardSection>
                <CardSection>
                  <Inputs
                    secureTextEntry={true}
                    value={signupData.password}
                    onChangeText={text => {
                      signupDataChanged({property: 'password', value: text});
                    }}
                    elementType={`password`}
                    elementConfig={{
                      placeholder: 'Password',
                      placeholderTextColor: 'white',
                    }}
                  />
                </CardSection>
                {logMessage ? (
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
                <CardSection>{signupBtn}</CardSection>
              </ScrollView>
            </Card>
          </View>
        </View>
      </ImageBackground>
      //   <View>
      //     <Text style={typography.sectionTitle}> Sign Up </Text>
      //     <CardSection>
      //       <Text style={typography.sectionTitle}> Email </Text>
      //       <TextInput
      //         placeholder="email"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         style={styles.input}
      //         onChangeText={text =>
      //           signupDataChanged({property: 'email', value: text})
      //         }
      //         value={signupData.email}
      //       />
      //     </CardSection>
      //     <CardSection>
      //       <Text style={typography.sectionTitle}> Mobile number </Text>
      //       <TextInput
      //         placeholder="mobile number"
      //         placeholderTextColor="grey"
      //         keyboardType="phone-pad"
      //         style={styles.input}
      //         onChangeText={text =>
      //           signupDataChanged({property: 'mobileNo', value: text})
      //         }
      //         value={signupData.mobileNo}
      //       />
      //     </CardSection>
      //     <CardSection>
      //       <Text style={typography.sectionTitle}> Password </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="password"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         secureTextEntry={!isPasswordShown}
      //         style={styles.input}
      //         onChangeText={text =>
      //           signupDataChanged({property: 'password', value: text})
      //         }
      //         value={signupData.password}
      //       />
      //     </CardSection>
      //     <View style={styles.switchContainer}>
      //       <Text style={styles.switchText}>
      //         {isPasswordShown ? 'Hide' : 'Show'} password
      //       </Text>
      //       <Switch
      //         style={styles.switch}
      //         trackColor={{false: '#767577', true: '#81b0ff'}}
      //         thumbColor={isPasswordShown ? '#6c9df0' : '#f4f3f4'}
      //         onValueChange={togglePassword}
      //         value={isPasswordShown}
      //       />
      //     </View>
      //     <BtnContained onPress={this.singUp} text="Sign Up" />
      //     {this.renderLogMessage(logMessage)}
      //   </View>
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
