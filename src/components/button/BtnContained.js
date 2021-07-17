import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

export default function BtnContained({
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
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
});
