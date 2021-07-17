import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import _ from 'lodash';

import {Card, CardSection} from 'components/card';
import {WasteDescription} from 'components/list';

export default function RequestDetail({
  companyDetail,
  customerRequest,
  wasteDescriptionData,
}) {
  if (!_.isEmpty(customerRequest)) {
    const {companyName} = companyDetail;
    const {companyId, workDescription, date, time, requestType, requestStatus} =
      customerRequest;

    return (
      <ScrollView>
        <Text>Company Detail:</Text>
        <CardSection>
          <Text>Company name: {companyName}</Text>
          <Text>email: {companyId.email}</Text>
          <Text>mobile no: {companyId.mobileNo}</Text>
        </CardSection>
        <Text>Service Detail:</Text>
        <CardSection>
          <Text>Service type:{requestType}</Text>
          <Text>Request status:{requestStatus}</Text>
          {workDescription ? (
            <Text>Work description: {workDescription}</Text>
          ) : null}
        </CardSection>
        <WasteDescription data={wasteDescriptionData} />
      </ScrollView>
    );
  } else {
    return null;
  }
}
