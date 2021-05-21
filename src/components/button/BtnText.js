import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

export default function BtnText({onPress, text, btnTextStyle}) {
  const {buttonText} = styles;
  return (
    <Pressable onPress={onPress}>
      <Text style={[buttonText, btnTextStyle]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'monospace sans-serif',
  },
});
