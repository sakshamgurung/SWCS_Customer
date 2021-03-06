import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';

import _ from 'lodash';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalWasteListDetail} from 'components/modal';
import {CardSection} from 'components/card';

function Item({item}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModalWasteList = () => {
    setShowModal(!showModal);
  };

  const renderModalWasteList = () => {
    if (showModal) {
      return (
        <ModalWasteListDetail
          data={item}
          onPressModalBG={toggleModalWasteList}
          onRequestClose={toggleModalWasteList}
        />
      );
    }
  };

  return (
    <CardSection>
      <Text>
        {item.wasteCatalogId.wasteType}-{item.wasteCatalogId.wasteName}
      </Text>
      <Text>Payment type:{item.paymentType}</Text>
      <Text>
        {item.price} per {item.quantity} {item.unit}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text>{item.amount}</Text>
        <Text style={{color: 'black'}}>{item.unit}</Text>
      </View>
      <Pressable onPress={toggleModalWasteList} style={styles.infoIcon}>
        <MaterialCommIcon
          name="information"
          color="rgba(0, 0, 0, 1)"
          size={24}
        />
      </Pressable>
      {renderModalWasteList()}
    </CardSection>
  );
}

export default function WasteDescription({data}) {
  if (!_.isEmpty(data)) {
    return (
      <View>
        <Text>Waste Description:</Text>
        {data.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  amtTextInput: {
    borderWidth: 1,
    width: 90,
    color: 'black',
    paddingVertical: 0,
    marginRight: 10,
  },
  infoIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 2,
  },
});
