import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Card, CardSection} from 'components/card';

export default function AllServiceList({data, refreshData}) {
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

  const Item = ({item, index}) => (
    <CardSection>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CompanyIndex', {
            companyId: item.companyId._id,
          })
        }>
        <MaterialCommunityIcons
          name="dump-truck"
          size={25}
          color="rgba(55, 125, 204, 1)"
        />
        <Text>{item.companyId._id}</Text>
        <Text>{item.companyName}</Text>
      </TouchableOpacity>
    </CardSection>
  );

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

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
