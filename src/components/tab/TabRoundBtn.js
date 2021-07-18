import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

function RoundTabBtn({text, onPress}) {
  return (
    <Chip style={{margin: 5}} onPress={onPress}>
      {text}
    </Chip>
    // <Pressable onPress={onPress} style={styles.itemContainer}>
    //   <View>
    //     <Text style={styles.itemText}>{text}</Text>
    //   </View>
    // </Pressable>
  );
}
{
  /* <Chip icon="info" onPress={() => console.log('Pressed')}>Example Chip</Chip> */
}
export default function TabRoundBtn({data, selectedTab}) {
  // console.log(' top datas ', data, selectedTab);

  return (
    <>
      <View style={styles.tabContainer}>
        <View
          style={{
            // borderWidth: 1,
            flex: 0.3,
            height: 50,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            paddingTop: 5,
            marginLeft: 25,
          }}>
          <Text style={{fontSize: 18, color: 'white', fontStyle: 'italic'}}>
            Filters :
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 0.7,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          {data.map((item, index) => {
            return (
              <RoundTabBtn
                key={index}
                text={item.text}
                onPress={item.onPress}
              />
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    maxHeight: 60,
    borderRadius: 5,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingRight: 20,
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
