import React from 'react';
import {StyleSheet, View} from 'react-native';

import {shadow} from 'lib/res';

export default function Card({children, cardStyle}) {
  return <View style={[styles.containerStyle, cardStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 10,
    padding: 5,
    ...shadow.DP2,
  },
});
