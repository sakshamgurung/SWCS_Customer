import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import _ from 'lodash';

import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function RadioOption({title, disabled, desc, isSelected, onPress}) {
  return (
    <View style={[styles.radioOptionContainer]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[styles.radioOptionIcon]}>
        {isSelected ? (
          <MaterialCommIcon
            name="radiobox-marked"
            color="rgba(62, 115, 222, 1)"
            size={16}
          />
        ) : (
          <MaterialCommIcon
            name="radiobox-blank"
            color="rgba(176, 176, 176, 1)"
            size={16}
          />
        )}
      </Pressable>
      <View style={[styles.radioOptionTextContainer]}>
        <Text style={[styles.radioOptionTitle]}>{title}</Text>
        <Text style={[styles.radioOptionDesc]}>{desc}</Text>
      </View>
    </View>
  );
}

export default function RadioButtonGroup({
  data,
  disabled,
  onPress,
  property,
  currentValue,
}) {
  const [selectedOption, setOption] = useState(
    !_.isEmpty(currentValue) ? currentValue : '',
  );

  const selectOption = value => {
    setOption(value);
    onPress({property, value});
  };

  return (
    <View>
      {data.map((option, index) => (
        <RadioOption
          key={index}
          title={option.title}
          disabled={disabled}
          desc={option.desc}
          isSelected={currentValue == option.value}
          onPress={() => selectOption(option.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  radioOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioOptionIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOptionTextContainer: {
    flex: 10,
    marginLeft: 5,
  },
  radioOptionTitle: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  radioOptionDesc: {
    color: 'grey',
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
