import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import _ from 'lodash';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalWasteListDetail} from 'components/modal';
import {CardSection} from 'components/card';

function Item({item, index, toggleDataSelection, amtDataChanged}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModalWasteList = () => {
    setShowModal(!showModal);
  };

  const renderModalWasteList = () => {
    if (showModal) {
      return (
        <ModalWasteListDetail
          data={item}
          onPressModalBG={toggleModalWasteList}
          onRequestClose={toggleModalWasteList}
        />
      );
    }
  };

  return (
    <CardSection>
      <Pressable
        onPress={() =>
          toggleDataSelection({
            property: 'isSelected',
            index,
            value: !item.isSelected,
          })
        }>
        {item.isSelected ? (
          <MaterialCommIcon
            name="check-box-outline"
            color="rgba(62, 115, 222, 1)"
            size={18}
          />
        ) : (
          <MaterialCommIcon
            name="checkbox-blank-outline"
            color="rgba(62, 115, 222, 1)"
            size={18}
          />
        )}
      </Pressable>
      <Text>
        {item.wasteCatalogId.wasteType}-{item.wasteCatalogId.wasteName}
      </Text>
      <Text>Payment type:{item.paymentType}</Text>
      <Text>
        {item.price} per {item.quantity} {item.unit}
      </Text>
      <Pressable onPress={toggleModalWasteList}>
        <MaterialCommIcon
          name="information"
          color="rgba(0, 0, 0, 1)"
          size={24}
        />
      </Pressable>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          editable={item.isSelected}
          keyboardType="number-pad"
          style={[
            styles.amtTextInput,
            {borderColor: item.isSelected ? 'black' : 'grey'},
          ]}
          placeholder="amt"
          placeholderTextColor="grey"
          value={item.amount}
          maxLength={4}
          onChangeText={text =>
            amtDataChanged({
              property: 'amount',
              index,
              value: text.match('^(s*|[1-9][0-9]*)$') ? text : item.amount,
            })
          }
        />
        <Text style={{color: item.isSelected ? 'black' : 'grey'}}>
          {item.unit}
        </Text>
      </View>
      {renderModalWasteList()}
    </CardSection>
  );
}

export default function FormWasteList({data, dataChanged, forScreen}) {
  if (!_.isEmpty(data)) {
    const cloneData = _.cloneDeep(data);
    for (let d of cloneData) {
      if (!d.hasOwnProperty('isSelected')) {
        d.isSelected = false;
      }
      if (!d.hasOwnProperty('amount')) {
        d.amount = '';
      }
    }

    const [itemData, setItemData] = useState(cloneData);

    const itemDataChanged = data => {
      const formatedItemData = [];
      const {property, index, value} = data;
      const tempItemData = _.cloneDeep(itemData);
      tempItemData[index][`${property}`] = value;
      setItemData(tempItemData);

      tempItemData.forEach(e => {
        if (e.isSelected) {
          formatedItemData.push({
            wasteListId: e._id,
            amount: e.amount,
            amountUnit: e.unit,
          });
        }
      });

      if (forScreen == 'dumpWaste') {
        dataChanged(formatedItemData);
      } else {
        dataChanged({property: 'wasteDescription', data: formatedItemData});
      }
    };

    return (
      <View>
        {itemData.map((item, index) => (
          <Item
            item={item}
            index={index}
            key={index}
            toggleDataSelection={itemDataChanged}
            amtDataChanged={itemDataChanged}
          />
        ))}
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  amtTextInput: {
    borderWidth: 1,
    width: 90,
    color: 'black',
    paddingVertical: 0,
    marginRight: 10,
  },
});
