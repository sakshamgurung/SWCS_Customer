import React from 'react';
import {StyleSheet, View} from 'react-native';

import {shadow} from 'lib/res';

export default function CardSection({children, cardSectionStyle}) {
  return (
    <View style={[styles.containerStyle, cardSectionStyle]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    width: '93%',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 10,
    padding: 5,
    ...shadow.DP2,
  },
});
