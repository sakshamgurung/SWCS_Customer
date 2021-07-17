import React from 'react';
import {View, Text, FlatList} from 'react-native';

import _ from 'lodash';
// import {CardSection} from 'components/card';
import CardSection2 from '../../screens/Common/Company/CardSection2';

const Item = ({item, index}) => (
  <CardSection2>
    <Text style={{marginTop: 15, color: 'white'}}>
      {item.wasteCatalogId.wasteType}-{item.wasteCatalogId.wasteName}
    </Text>
    <Text style={{marginTop: 5, color: 'white'}}>
      Payment:{item.paymentType}
    </Text>
    <Text style={{marginTop: 5, color: 'white'}}>
      {item.price} per {item.quantity} {item.unit}
    </Text>
    <Text style={{marginTop: 5, color: 'white'}}>
      {item.wasteCatalogId.description}
    </Text>
  </CardSection2>
);

export default function WasteList({data}) {
  if (!_.isEmpty(data)) {
    return (
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <View style={{width: '100%', marginBottom: 10, display: 'flex'}}>
          <Text style={{fontWeight: 'bold', marginLeft: 20, color: 'white'}}>
            Waste we handle
          </Text>
        </View>
        {data.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </View>
    );
  } else {
    return null;
  }
}
