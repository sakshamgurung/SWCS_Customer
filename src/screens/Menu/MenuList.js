import React from 'react';
import {Text, View, ScrollView, StyleSheet, Pressable} from 'react-native';

function Item({item}) {
  return (
    <Pressable onPress={item.onPress} style={[styles.itemContainer]}>
      <View style={[styles.itemIconContainer]}>{item.icon}</View>
      <View style={[styles.itemTextContainer]}>
        <Text style={[styles.itemText]}>{item.text}</Text>
      </View>
    </Pressable>
  );
}

export default function MenuList({data}) {
  return (
    <ScrollView>
      {data.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'tomato',
    height: 50,
    alignItems: 'center',
    marginVertical: 5,
  },
  itemIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 4,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'monospace',
  },
  logout: {
    backgroundColor: 'tomato',
  },
});
