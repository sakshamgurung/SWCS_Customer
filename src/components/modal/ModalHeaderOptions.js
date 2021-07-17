import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import ModalCustom from './ModalCustom';

function Item({item, index}) {
  return (
    <Pressable
      disabled={!item.enabled}
      onPress={item.onPress}
      style={styles.OptContainer}>
      <Text
        style={[
          styles.OptText,
          {
            color: index == 0 ? (item.enabled ? 'black' : 'grey') : 'black',
          },
        ]}>
        {item.text}
      </Text>
      <View style={styles.OptIcon}>{item.icon}</View>
    </Pressable>
  );
}

export default function ModalHeaderOptions({
  optionData,
  onPressModalBG,
  onRequestClose,
}) {
  return (
    <ModalCustom
      visible={true}
      onPressModalBG={onPressModalBG}
      onRequestClose={onRequestClose}
      modalBGStyle={styles.modalBGStyle}
      modalContainerStyle={styles.modalContainerStyle}>
      {optionData.map((item, index) => (
        <Item item={item} index={index} key={index} />
      ))}
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  OptContainer: {
    flexDirection: 'row',
  },
  OptText: {
    flex: 0.8,
    color: 'black',
  },
  OptIcon: {
    flex: 0.1,
    flexWrap: 'wrap',
  },
  modalBGStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainerStyle: {
    width: '40%',
    padding: 10,
    top: 40,
    right: 5,
  },
  desc: {
    textAlign: 'justify',
  },
});
