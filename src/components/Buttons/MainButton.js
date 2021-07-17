import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const MainButton = ({onPress, children, height, width, disabled}) => {
  const {buttonStyles, textStyle} = styles;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[buttonStyles, {height: height, width: width}]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 17,
  },
  buttonStyles: {
    margin: 15,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    elevation: 2,
  },
};

export default MainButton;
