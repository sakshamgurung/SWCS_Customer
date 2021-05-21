import React from 'react';
import {View, Text, FlatList} from 'react-native';

import _ from 'lodash';
import {CardSection} from 'components/card';

const Item = ({item, index}) => (
  <CardSection>
    <Text>
      {item.wasteCatalogId.wasteType}-{item.wasteCatalogId.wasteName}
    </Text>
    <Text>Payment:{item.paymentType}</Text>
    <Text>
      {item.price} per {item.quantity} {item.unit}
    </Text>
    <Text>{item.wasteCatalogId.description}</Text>
  </CardSection>
);

export default function WasteList({data}) {
  return (
    <View>
      <Text>Waste we handle</Text>
      {data.map((item, index) => (
        <Item item={item} index={index} key={index} />
      ))}
    </View>
  );
}
