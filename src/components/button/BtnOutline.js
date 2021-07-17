import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

export default function BtnOutline({
  onPress,
  btnStyle,
  text,
  textStyle,
  disabled,
}) {
  const {buttonContainer, buttonText} = styles;
  return (
    <Pressable
      onPress={onPress}
      style={[buttonContainer, btnStyle]}
      disabled={disabled}>
      <Text style={[buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'navy',
    height: 40,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'navy',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
});
