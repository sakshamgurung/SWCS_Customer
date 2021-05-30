import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import _ from 'lodash';

import {WasteList} from 'components/list';
import {Card, CardSection} from 'components/card';

export default function AboutCompany({data}) {
  if (!_.isEmpty(data.companyDetail)) {
    const {companyDetail, wasteList} = data;
    const {desc, contactName, contactNo, companyId, address} = companyDetail;
    return (
      <ScrollView>
        <Text>Description</Text>
        <CardSection>
          <Text> {desc} </Text>
        </CardSection>
        <Text>Contact</Text>
        <CardSection>
          <Text>
            {contactName
              ? `${contactName.firstName} ${contactName.lastName}`
              : 'Contact name not available'}
          </Text>
          <Text>
            {contactNo ? `${contactNo}` : 'Contact number not available'}
          </Text>
          <Text>{companyId.email}</Text>
          <Text>{companyId.mobileNo}</Text>
        </CardSection>
        <Text>Address</Text>
        <CardSection>
          <Text>
            {address.street}, {address.city}-{address.wardNo}
          </Text>
          <Text>
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
