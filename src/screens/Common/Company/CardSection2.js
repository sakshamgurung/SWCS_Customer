import React from 'react';
import {View} from 'react-native';

function CardSection2(props) {
  return (
    <View
      style={{
        width: '90%',
        paddingLeft: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 20,
        padding: 10,
      }}>
      {props.children}
    </View>
  );
}

export default CardSection2;
