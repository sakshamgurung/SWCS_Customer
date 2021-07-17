import React from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';

import {Card, CardSection} from 'components/card';

export default function WorkDescription({value, onChangeText}) {
  return (
    <CardSection>
      <ScrollView
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={true}
        style={{height: 150}}>
        <TextInput
          autoCorrect={false}
          keyboardType="default"
          placeholder="Type description like date, time, location..."
          placeholderTextColor="black"
          underlineColorAndroid="rgba(62, 115, 222, 1)"
          multiline={true}
          maxLength={1000}
          style={{color: 'black', paddingHorizontal: 10}}
          onChangeText={text =>
            onChangeText({property: 'workDescription', data: text})
          }
          value={value}
        />
      </ScrollView>
    </CardSection>
  );
}

const styles = StyleSheet.create({
  descContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginBottom: 10,
    paddingVertical: 10,
  },
  descItem: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
