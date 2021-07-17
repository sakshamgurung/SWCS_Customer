import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {reduxStoreWrapper} from 'util/reduxStoreWrapper';
import {Header} from 'components/header';
import {BtnContained} from 'components/button';
import {RadioButtonGroup} from 'components/input';
import {Card, CardSection} from 'components/card';

function ProfileInputFrameGroup({groupTitle, children}) {
  return (
    <Card>
      <Text style={styles.profileInputFrameGroupTitle}>{groupTitle}</Text>
      <View style={styles.profileInputFrameGroup}>{children}</View>
    </Card>
  );
}

function ProfileInputFrame({title, children}) {
  return (
    <CardSection>
      <View style={styles.profileInputFrameContainer}>
        <View>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <View>{children}</View>
      </View>
    </CardSection>
  );
}

export class Profile extends Component {
  customerTypeRadioBtnOptions = [
    {
      title: 'business',
      value: 'business',
      desc: 'includes shops, hotel, restaurant, schools...',
    },
    {title: 'individual', value: 'individual', desc: 'includes households...'},
  ];

  componentDidMount() {
    const {thunkFetchCustomerDetail} = this.props;
    thunkFetchCustomerDetail();
  }

  edit = () => {
    const {setBuffer, toggleEdit} = this.props;
    const {customerDetail} = this.props;

    setBuffer(customerDetail);
    toggleEdit();
  };

  done = () => {
    const {toggleEdit, thunkEditCustomerDetail} = this.props;
    toggleEdit();
    thunkEditCustomerDetail();
  };

  cancel = () => {
    const {customerDetailChanged, toggleEdit} = this.props;
    const {buffer} = this.props;

    customerDetailChanged({property: 'reset', value: buffer});
    toggleEdit();
  };

  render() {
    const {customerDetailChanged} = this.props;
    const {isEditable, customerDetail} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(62, 115, 222, 1)'}}>
        <ScrollView scrollEventThrottle={2}>
          <Header title="Profile" backIconContainerStyle={{flex: 0}} />

          <ProfileInputFrame title="CustomerType">
            <RadioButtonGroup
              data={this.customerTypeRadioBtnOptions}
              property="customerType"
              disabled={!isEditable}
              onPress={customerDetailChanged}
              currentValue={customerDetail.customerType}
            />
          </ProfileInputFrame>

          <ProfileInputFrameGroup groupTitle="Contact Name">
            <ProfileInputFrame title="First Name">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="first name"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'firstName', value: text})
                }
                value={customerDetail.firstName}
                style={styles.input}
              />
            </ProfileInputFrame>
            <ProfileInputFrame title="Last Name">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="last name"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'lastName', value: text})
                }
                value={customerDetail.lastName}
                style={styles.input}
              />
            </ProfileInputFrame>
          </ProfileInputFrameGroup>

          {customerDetail.customerType == 'business' ? (
            <ProfileInputFrame title="Business Name">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="business name"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'businessName', value: text})
                }
                value={customerDetail.businessName}
                style={styles.input}
              />
            </ProfileInputFrame>
          ) : null}

          {customerDetail.customerType == 'business' ? (
            <ProfileInputFrame title="Contact No.">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="contact no."
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'contactNo', value: text})
                }
                value={customerDetail.contactNo}
                style={styles.input}
              />
            </ProfileInputFrame>
          ) : null}

          <ProfileInputFrameGroup groupTitle="Address">
            <ProfileInputFrame title="Province">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="province"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'province', value: text})
                }
                value={customerDetail.province}
                style={styles.input}
              />
            </ProfileInputFrame>
            <ProfileInputFrame title="District">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="district"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'district', value: text})
                }
                value={customerDetail.district}
                style={styles.input}
              />
            </ProfileInputFrame>
            <ProfileInputFrame title="City">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="city"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'city', value: text})
                }
                value={customerDetail.city}
                style={styles.input}
              />
            </ProfileInputFrame>
            <ProfileInputFrame title="Ward No.">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="ward no."
                placeholderTextColor="grey"
                keyboardType="number-pad"
                onChangeText={text =>
                  customerDetailChanged({property: 'wardNo', value: text})
                }
                value={customerDetail.wardNo}
                style={styles.input}
              />
            </ProfileInputFrame>
            <ProfileInputFrame title="Street">
              <TextInput
                editable={isEditable}
                autoCorrect={false}
                placeholder="street"
                placeholderTextColor="grey"
                keyboardType="visible-password"
                onChangeText={text =>
                  customerDetailChanged({property: 'street', value: text})
                }
                value={customerDetail.street}
                style={styles.input}
              />
            </ProfileInputFrame>
          </ProfileInputFrameGroup>

          {isEditable ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <BtnContained text="Done" onPress={this.done} />
              <BtnContained text="Cancel" onPress={this.cancel} />
            </View>
          ) : (
            <BtnContained text="Edit" onPress={this.edit} />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileInputFrameGroup: {
    paddingLeft: 6,
  },
  profileInputFrameGroupTitle: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  profileInputFrameContainer: {
    marginVertical: 5,
  },
  inputTitle: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    fontFamily: 'monospace',
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default reduxStoreWrapper(Profile, 'menu');
