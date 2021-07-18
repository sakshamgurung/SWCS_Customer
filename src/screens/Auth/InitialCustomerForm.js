import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  BackHandler,
  ImageBackground,
} from 'react-native';
import isEmpty from '../../components/isEmpty';

import MainButton from '../../components/Buttons/MainButton';
import LoaderButton from '../../components/Buttons/LoaderButton';

import ParentHOC from '../../components/modal/ParentHOC';
import Inputs from '../../components/others/Inputs';
import {CommonActions} from '@react-navigation/native';
import _ from 'lodash';
import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {typography} from 'lib/res';
import {Card, CardSection} from 'components/card';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButtonGroup} from 'components/input';
import {Header} from 'components/header';
import {BtnContained} from 'components/button';

export class InitialCustomerForm extends Component {
  customerTypeRadioBtnOptions = [
    {
      title: 'business',
      value: 'business',
      desc: 'includes shops, hotel, restaurant, schools...',
    },
    {title: 'individual', value: 'individual', desc: 'includes households...'},
  ];

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
    const {navigation, thunkLogout} = this.props;
    Alert.alert(
      'Do you want to back?',
      'Selecting yes will discard all your current progress and logout.',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            thunkLogout();
            navigation.dispatch(CommonActions.goBack());
          },
        },
      ],
      {cancelable: true},
    );
    return true;
  };

  submitForm = () => {
    const {thunkPostInitialCustomerForm} = this.props;
    const {customerDetail} = this.props;
    if (_.isEmpty(customerDetail.customerType)) {
      Alert.alert(
        'Select your use type ',
        'Select your use type as business use or individual use',
        [],
        {cancelable: true},
      );
    }
    if (
      !isEmpty(customerDetail.firstName) &&
      !isEmpty(customerDetail.lastName) &&
      !isEmpty(customerDetail.province) &&
      !isEmpty(customerDetail.district) &&
      !isEmpty(customerDetail.city) &&
      !isEmpty(customerDetail.wardNo) &&
      !isEmpty(customerDetail.street)
    ) {
      thunkPostInitialCustomerForm();
    } else {
      Alert.alert('Empty Error', 'Fields cannot be empty', [], {
        cancelable: true,
      });
    }
  };

  render() {
    const {customerDetail} = this.props;
    const {customerDetailChanged} = this.props;
    // console.log('customerDetail', customerDetail);

    let SubmitButton = (
      <MainButton
        disabled={this.props.loading}
        height={40}
        width={170}
        onPress={() => this.submitForm()}>
        Continue..
      </MainButton>
    );
    if (this.props.loading) {
      SubmitButton = <LoaderButton />;
    }

    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          flexDirection: 'column',
        }}
        source={require('../../../images/MainSignupPng.png')}>
        <View style={{flex: 0.9, alignItems: 'center'}}>
          <ParentHOC>
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',
                // alignItems: 'center',
              }}
              style={{width: '90%', height: '90%'}}>
              <View
                style={{
                  width: '100%',
                  height: 20,
                  // borderStyle: 'solid',
                  // borderWidth: 3,
                }}></View>
              <Inputs
                onChangeText={customerDetailChanged}
                elementType={`radio`}
                property="customerType"
                elementConfig={{
                  options: [
                    {label: 'Business', value: 'business', title: 'business'},
                    {
                      label: 'Individual',
                      value: 'individual',
                      title: 'individual',
                    },
                  ],
                  RadioFontSize: 18,
                  RadioPadding: 0,
                  RadioLabelPadding: 50,
                  formHorizontal: true,
                  mainLabel: 'Select Your Business Type',
                }}
                value={customerDetail.customerType}
              />
              <Inputs
                elementType="HeadLabel"
                elementConfig={{
                  headLabelText: 'Customer Name',
                  marginTop: 20,
                }}
              />
              <Inputs
                value={customerDetail.firstName}
                onChangeText={e => {
                  customerDetailChanged({property: 'firstName', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'First name',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                value={customerDetail.lastName}
                onChangeText={e => {
                  customerDetailChanged({property: 'lastName', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'Last name',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                elementType="HeadLabel"
                elementConfig={{
                  headLabelText: 'Address',
                  marginTop: 20,
                }}
              />
              <Inputs
                value={customerDetail.province}
                onChangeText={e => {
                  customerDetailChanged({property: 'province', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'Province',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                value={customerDetail.district}
                onChangeText={e => {
                  customerDetailChanged({property: 'district', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'District',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                value={customerDetail.city}
                onChangeText={e => {
                  customerDetailChanged({property: 'city', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'City',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                value={customerDetail.wardNo}
                onChangeText={e => {
                  customerDetailChanged({property: 'wardNo', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'Ward No',
                  placeholderTextColor: 'white',
                }}
              />
              <Inputs
                value={customerDetail.street}
                onChangeText={e => {
                  customerDetailChanged({property: 'street', value: e});
                }}
                elementType={`text`}
                elementConfig={{
                  placeholder: 'Street',
                  placeholderTextColor: 'white',
                }}
              />
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {SubmitButton}
              </View>
            </ScrollView>
          </ParentHOC>
        </View>
      </ImageBackground>
      // <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
      //   <ScrollView>
      //     <Header
      //       title="Customer Detail"
      //       backIcon={
      //         <MaterialCommIcon
      //           name="arrow-left"
      //           color="rgba(255, 255, 255, 1)"
      //           size={20}
      //         />
      //       }
      //       onPressBack={this.goBack}
      //     />
      //     <CardSection>
      //       <Text style={typography.sectionTitle}>
      //         How are you going to use this service?
      //       </Text>
      //       <RadioButtonGroup
      //         disabled={false}
      //         data={this.customerTypeRadioBtnOptions}
      //         property="customerType"
      //         onPress={customerDetailChanged}
      //         currentValue={customerDetail.customerType}
      //       />
      //     </CardSection>
      //     {customerDetail.customerType == 'business' ? (
      //       <CardSection>
      //         <Text style={typography.sectionTitle}> Business Name </Text>
      //         <TextInput
      //           autoCorrect={false}
      //           placeholder="Business Name"
      //           placeholderTextColor="grey"
      //           keyboardType="visible-password"
      //           onChangeText={text =>
      //             customerDetailChanged({property: 'businessName', value: text})
      //           }
      //           value={customerDetail.businessName}
      //           style={styles.input}
      //         />
      //       </CardSection>
      //     ) : null}
      //     {customerDetail.customerType == 'business' ? (
      //       <CardSection>
      //         <Text style={typography.sectionTitle}> Contact Number </Text>
      //         <TextInput
      //           autoCorrect={false}
      //           placeholder="contact number"
      //           placeholderTextColor="grey"
      //           keyboardType="phone-pad"
      //           onChangeText={text =>
      //             customerDetailChanged({property: 'contactNo', value: text})
      //           }
      //           value={customerDetail.contactNo}
      //           style={styles.input}
      //         />
      //       </CardSection>
      //     ) : null}
      //     <CardSection>
      //       <Text style={typography.sectionTitle}> Contact Name </Text>
      //       <Text style={typography.inputTitle}> First Name </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="first name"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'firstName', value: text})
      //         }
      //         value={customerDetail.firstName}
      //         style={styles.input}
      //       />
      //       <Text style={typography.inputTitle}> Last Name </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="last name"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'lastName', value: text})
      //         }
      //         value={customerDetail.lastName}
      //         style={styles.input}
      //       />
      //     </CardSection>
      //     <CardSection>
      //       <Text style={typography.sectionTitle}> Address </Text>
      //       <Text style={[typography.inputTitle]}> Province </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="province"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'province', value: text})
      //         }
      //         value={customerDetail.province}
      //         style={styles.input}
      //       />
      //       <Text style={typography.inputTitle}> District </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="district"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'district', value: text})
      //         }
      //         value={customerDetail.district}
      //         style={styles.input}
      //       />
      //       <Text style={typography.inputTitle}> City </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="city"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'city', value: text})
      //         }
      //         value={customerDetail.city}
      //         style={styles.input}
      //       />
      //       <Text style={typography.inputTitle}> Ward No </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="ward no"
      //         placeholderTextColor="grey"
      //         keyboardType="numeric"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'wardNo', value: text})
      //         }
      //         value={customerDetail.wardNo}
      //         style={styles.input}
      //       />
      //       <Text style={typography.inputTitle}>Street </Text>
      //       <TextInput
      //         autoCorrect={false}
      //         placeholder="street"
      //         placeholderTextColor="grey"
      //         keyboardType="visible-password"
      //         onChangeText={text =>
      //           customerDetailChanged({property: 'street', value: text})
      //         }
      //         value={customerDetail.street}
      //         style={styles.input}
      //       />
      //     </CardSection>

      //     <BtnContained text="Submit" onPress={this.submitForm} />
      //   </ScrollView>
      // </SafeAreaView>
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
});

export default reduxStoreWrapper(InitialCustomerForm, 'auth');
