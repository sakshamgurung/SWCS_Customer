import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import moment from 'moment';

import {Card, CardSection} from 'components/card';

function WasteItem({item}) {
  const {wasteListId, amount, amountUnit} = item;
  const {wasteType, wasteName} = wasteListId.wasteCatalogId;
  return (
    <View>
      <Text style={{fontWeight: 'bold', color: 'white'}}>
        {wasteType}:{wasteName}
      </Text>
      <Text style={{fontWeight: 'bold', color: 'white'}}>
        {amount} {amountUnit}
      </Text>
    </View>
  );
}

export default function WasteDumpList({data, refreshData, isWasteEmpty}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(2000);
    setRefreshing(false);
  }, []);

  const Item = ({item, index}) => {
    const {companyId, companyDetail, dumpedWaste, addedDate} = item;
    const {companyName} = companyDetail;
    return (
      <View
        style={{
          width: '100%',
          // borderWidth: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableRipple
          key={index}
          onPress={() => {
            navigation.navigate('CompanyIndex', {
              companyId,
            });
          }}
          rippleColor="rgba(0,0,0,0.2)"
          style={[
            // props.touchableHeight,
            {
              width: '90%',
              padding: 8,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.1)',
              marginTop: 7,
              marginBottom: 7,
            },
          ]}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View
                style={[
                  {
                    backgroundColor: 'rgba(230, 238, 235,0.9)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                  },
                  // props.AvatarStyle,
                ]}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#1B7AB5',
                  }}>
                  S
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.6,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View>
                <Text
                  style={{
                    color: 'rgba(230, 238, 235,0.9)',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  {companyName !== null ? companyName : ''}
                </Text>
              </View>
              <View>
                {dumpedWaste.map((wasteItem, index) => (
                  <WasteItem key={index} item={wasteItem} />
                ))}
              </View>
              <View>
                <Caption style={{color: '#E6EEEB'}}>{addedDate}</Caption>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* {props.StaffInfoIcon ? ( */}
              <MaterialIcons
                name="arrow-right"
                size={35}
                color="rgba(230, 238, 235,0.9)"
              />
              {/* ) : (
                  <Icon name="md-add-circle" size={35} color="white" />
                )} */}
            </View>
          </View>
        </TouchableRipple>
      </View>
      // <CardSection>
      //   <TouchableOpacity
      //     onPress={() =>
      // navigation.navigate('CompanyIndex', {
      //   companyId,
      // })
      //     }>
      //     <MaterialCommunityIcons
      //       name="dump-truck"
      //       size={25}
      //       color="rgba(55, 125, 204, 1)"
      //     />
      //     <Text>Company name: {companyName}</Text>
      //     {dumpedWaste.map((wasteItem, index) => (
      //       <WasteItem key={index} item={wasteItem} />
      //     ))}
      //     <Text>
      //       Thrown on: {moment(addedDate).format('MMMM Do YYYY, h:mm a')}
      //     </Text>
      //   </TouchableOpacity>
      // </CardSection>
    );
  };

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  if (_.isEmpty(data)) {
    return null;
  }

  return isWasteEmpty ? (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
      }}>
      <Text style={{fontStyle: 'italic', color: 'white'}}>List is empty</Text>
    </View>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
}
