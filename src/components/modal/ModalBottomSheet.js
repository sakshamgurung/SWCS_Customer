import React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';

import ModalCustom from './ModalCustom';
import {BtnOutline} from 'components/button';

export default function ModalBottomSheet({
  data,
  selectedGeoObjectId,
  onPressDismiss,
  onPressDump,
  onPressEdit,
  onPressClear,
}) {
  const {track} = data;
  const {trackName} = track;
  return (
    <View style={styles.bottomSheetBackground}>
      <View style={styles.bottomSheetContainer}>
        <ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}>
          <Header title={trackName} onPressDismiss={onPressDismiss} />
          <ActionCard
            data={track}
            onPressDump={onPressDump}
            onPressEdit={onPressEdit}
            onPressClear={onPressClear}
          />
          <Text>{selectedGeoObjectId}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const Header = ({title, onPressDismiss}) => {
  return (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>
        {title.length > 35 ? `${title.slice(0, 30)}...` : title}
      </Text>
      <Pressable onPress={onPressDismiss}>
        <AntIcon name="closecircle" color="rgb(201, 201, 201)" size={20} />
      </Pressable>
    </View>
  );
};

const ActionCard = ({data, onPressDump, onPressEdit, onPressClear}) => {
  const {isDumpBtnPressable, isEditBtnPressable, isClearBtnPressable} = data;
  return (
    <View style={styles.actionCardContainer}>
      <BtnOutline
        text="Dump"
        disabled={!isDumpBtnPressable}
        onPress={onPressDump}
        btnStyle={[
          styles.actionBtn,
          {borderColor: isDumpBtnPressable ? 'navy' : 'grey'},
        ]}
        textStyle={[
          styles.actionBtnText,
          {color: isDumpBtnPressable ? 'navy' : 'grey'},
        ]}
      />
      <BtnOutline
        text="Edit"
        disabled={!isEditBtnPressable}
        onPress={onPressEdit}
        btnStyle={[
          styles.actionBtn,
          {borderColor: isEditBtnPressable ? 'navy' : 'grey'},
        ]}
        textStyle={[
          styles.actionBtnText,
          {color: isEditBtnPressable ? 'navy' : 'grey'},
        ]}
      />
      <BtnOutline
        text="Clear"
        disabled={!isClearBtnPressable}
        onPress={onPressClear}
        btnStyle={[
          styles.actionBtn,
          {borderColor: isClearBtnPressable ? 'tomato' : 'grey'},
        ]}
        textStyle={[
          styles.actionBtnText,
          {color: isClearBtnPressable ? 'tomato' : 'grey'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '20%',
  },
  scrollView: {
    margin: 5,
  },
  //Header
  headerTitleContainer: {
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 4,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
  },
  //Action
  actionCardContainer: {
    padding: 5,
    flexDirection: 'row',
    marginVertical: 5,
  },
  actionBtn: {
    marginHorizontal: 10,
    height: 30,
  },
  actionBtnText: {
    fontSize: 14,
  },
});
