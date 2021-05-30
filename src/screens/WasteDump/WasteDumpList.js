import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default function WasteDumpList({data}) {
  return (
    <View>
      <Text> {JSON.stringify(data)}</Text>
    </View>
  );
}
