import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import _ from 'lodash';

import {Card, CardSection} from 'components/card';
import {WasteDescription} from 'components/list';

export default function RequestDetail({customerRequest, wasteDescriptionData}) {
  if (!_.isEmpty(customerRequest)) {
    const {companyId, workDescription, date, time, requestType, requestStatus} =
      customerRequest;
    return (
      <ScrollView>
        <CardSection>
          <Text>{companyId.email}</Text>
          <Text>{companyId.mobileNo}</Text>
        </CardSection>
        <CardSection>
          <Text>Service type:{requestType}</Text>
          <Text>Request status:{requestStatus}</Text>
          <Text>Work description: {workDescription}</Text>
        </CardSection>
        <WasteDescription data={wasteDescriptionData} />
      </ScrollView>
    );
  } else {
    return null;
  }
}
