import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ModalCustom from './ModalCustom';
import {BtnText} from 'components/button';

export default function ModalWasteListDetail({
  data,
  onPressModalBG,
  onRequestClose,
}) {
  return (
    <ModalCustom
      visible={true}
      onPressModalBG={onPressModalBG}
      onRequestClose={onRequestClose}
      modalContainerStyle={styles.modalContainerStyle}>
      <View>
        <Text>
          {data.wasteCatalogId.wasteType}-{data.wasteCatalogId.wasteName}
        </Text>
        <Text>Payment type:{data.paymentType}</Text>
        <Text>
          {data.price} per {data.quantity} {data.unit}
        </Text>
        <Text>Description:</Text>
        <Text style={styles.desc}>{data.wasteCatalogId.description}</Text>
      </View>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    padding: 10,
  },
  desc: {
    textAlign: 'justify',
  },
});
