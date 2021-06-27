import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import moment from 'moment';

import {Card, CardSection} from 'components/card';

function WasteItem({item}) {
  const {wasteListId, amount, amountUnit} = item;
  const {wasteType, wasteName} = wasteListId.wasteCatalogId;
  return (
    <View>
      <Text>
        {wasteType}:{wasteName}
      </Text>
      <Text>
        {amount} {amountUnit}
      </Text>
    </View>
  );
}

export default function WasteDumpList({data, refreshData}) {
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
    console.log('item:', item);
    return (
      <CardSection>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CompanyIndex', {
              companyId,
            })
          }>
          <MaterialCommunityIcons
            name="dump-truck"
            size={25}
            color="rgba(55, 125, 204, 1)"
          />
          <Text>Company name: {companyName}</Text>
          {dumpedWaste.map((wasteItem, index) => (
            <WasteItem key={index} item={wasteItem} />
          ))}
          <Text>
            Thrown on: {moment(addedDate).format('MMMM Do YYYY, h:mm a')}
          </Text>
        </TouchableOpacity>
      </CardSection>
    );
  };

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  );
}
