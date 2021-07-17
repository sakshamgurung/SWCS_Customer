import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {shadow} from 'lib/res';

export default function Header({
  headerContainerStyle,
  headerTitleStyle,
  title,
  onPressBack,
  backIcon,
  backIconContainerStyle,
  onPressNext,
  nextIconContainerStyle,
  nextIcon,
}) {
  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <Pressable
        onPress={onPressBack}
        style={[{flex: 1}, backIconContainerStyle]}>
        {backIcon}
      </Pressable>
      <View style={{flex: 16}}>
        <Text style={[styles.headerTitle, headerTitleStyle]}>{title}</Text>
      </View>
      <Pressable
        onPress={onPressNext}
        style={[{flex: 1}, nextIconContainerStyle]}>
        {nextIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(62, 115, 222, 1)',
    alignItems: 'center',
    // paddingTop: 8,
    paddingLeft: 10,
    paddingTop: 7,
    paddingBottom: 7,
    // paddingBottom: -20,
    ...shadow.DP0,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'sans-serif monospace',
    // fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 20,
    // color: 'rgba(62, 115, 222, 1)',
    paddingHorizontal: 10,
  },
});
