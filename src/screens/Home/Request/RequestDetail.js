import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {Card, CardSection} from 'components/card';
import {WasteDescription} from 'components/list';

export default function RequestDetail({data}) {
  const {
    companyDetail,
    companyId,
    workDescription,
    date,
    time,
    requestCoordinate,
    requestType,
    requestStatus,
    filteredWasteList,
  } = data;
  return (
    <ScrollView>
      <CardSection>
        <Text>{companyDetail.companyName}</Text>
        <Text>{companyId.email}</Text>
        <Text>{companyId.mobileNo}</Text>
        <Text>{requestType}</Text>
        <Text>{requestStatus}</Text>
        <Text>{workDescription}</Text>
      </CardSection>
      <WasteDescription data={filteredWasteList} />
    </ScrollView>
  );
}
