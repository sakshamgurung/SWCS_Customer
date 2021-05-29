import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';

function RoundTabBtn({text, onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default function TabRoundBtn({data}) {
  return (
    <View style={styles.tabContainer}>
      {data.map((item, index) => {
        return (
          <RoundTabBtn key={index} text={item.text} onPress={item.onPress} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(166, 166, 166,1)',
    marginHorizontal: 2,
  },
  itemText: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: 'black',
    padding: 5,
  },
});
