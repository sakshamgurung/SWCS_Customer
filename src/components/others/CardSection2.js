import React from 'react';
import {View, ScrollView} from 'react-native';

function CardSection2(props) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        alignItems: 'center',
      }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.children}
      </ScrollView>
    </View>
  );
}

export default CardSection2;
