import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import _ from 'lodash';

import {WasteList} from 'components/list';
// import {Card, CardSection} from 'components/card';
import CardSection from './CardSection';

export default function AboutCompany({data}) {
  if (!_.isEmpty(data.companyDetail)) {
    const {companyDetail, wasteList} = data;
    const {desc, contactName, contactNo, companyId, address} = companyDetail;
    return (
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <View style={{width: '100%', display: 'flex'}}>
          <Text style={{fontWeight: 'bold', marginLeft: 20, color: 'white'}}>
            Description
          </Text>
        </View>
        <CardSection>
          <Text style={{marginTop: 15, marginBottom: 15, color: 'white'}}>
            {' '}
            {desc}{' '}
          </Text>
        </CardSection>
        <View style={{width: '100%', display: 'flex'}}>
          <Text style={{fontWeight: 'bold', marginLeft: 20, color: 'white'}}>
            Contact
          </Text>
        </View>
        <CardSection>
          <Text style={{marginTop: 15, marginBottom: 5, color: 'white'}}>
            {contactName
              ? `${contactName.firstName} ${contactName.lastName}`
              : 'Contact name not available'}
          </Text>
          <Text style={{color: 'white', marginBottom: 5}}>
            {contactNo ? `${contactNo}` : 'Contact number not available'}
          </Text>
          <Text style={{color: 'white', marginBottom: 5}}>
            {companyId.email}
          </Text>
          <Text style={{color: 'white', marginBottom: 15}}>
            {companyId.mobileNo}
          </Text>
        </CardSection>
        <View style={{width: '100%', display: 'flex'}}>
          <Text style={{fontWeight: 'bold', marginLeft: 20, color: 'white'}}>
            Address
          </Text>
        </View>
        <CardSection>
          <Text style={{marginTop: 15, marginBottom: 5, color: 'white'}}>
            {address.street}, {address.city}-{address.wardNo}
          </Text>
          <Text style={{marginBottom: 5, color: 'white'}}>
            {address.district}, {address.province}
          </Text>
        </CardSection>
        <WasteList data={wasteList} />
      </ScrollView>
    );
  } else {
    return null;
  }
}
