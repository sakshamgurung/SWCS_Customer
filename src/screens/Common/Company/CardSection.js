import React from 'react';
import {View} from 'react-native';

function CardSection(props) {
  return <View style={{width: '90%', paddingLeft: 10}}>{props.children}</View>;
}

export default CardSection;
