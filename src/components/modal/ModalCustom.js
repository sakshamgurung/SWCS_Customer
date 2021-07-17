import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

import {shadow} from 'lib/res';

export default function ModalCustom({
  visible,
  onRequestClose,
  modalBGStyle,
  onPressModalBG,
  modalContainerStyle,
  children,
}) {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <Pressable
        style={[styles.modalBackground, modalBGStyle]}
        onPress={onPressModalBG}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContainer, modalContainerStyle]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#00000099',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '80%',
    borderRadius: 5,
    ...shadow.DP4,
  },
});
