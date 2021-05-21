import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import _ from 'lodash';

import {WasteList} from 'components/list';
import {Card, CardSection} from 'components/card';

export default function AboutCompany({data}) {
  const {companyDetail, wasteList} = data;
  const {desc, contactName, contactNo, companyId, address} = companyDetail;
  return (
    <ScrollView>
      <Text>About</Text>
      <CardSection>
        <Text> {desc} </Text>
      </CardSection>
      <CardSection>
        <Text>Contact</Text>
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
      <CardSection>
        <Text>
          {address.street}, {address.city}-{address.wardNo}
        </Text>
        <Text>
          {address.district}, {address.province}
        </Text>
      </CardSection>
      {!_.isEmpty(wasteList) ? <WasteList data={wasteList} /> : null}
    </ScrollView>
  );
}
