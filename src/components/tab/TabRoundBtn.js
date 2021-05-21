import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

export default function TabRoundBtn({onPressTab}) {
  const [selectedTab, setTab] = useState('all');
  const onPress = tab => {
    setTab(tab);
    onPressTab(tab);
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Pressable onPress={() => onPress('all')}>
        <Text>All</Text>
      </Pressable>
      <Pressable onPress={() => onPress('request')}>
        <Text>Request</Text>
      </Pressable>
      <Pressable onPress={() => onPress('subscription')}>
        <Text>Subscription</Text>
      </Pressable>
    </View>
  );
}
