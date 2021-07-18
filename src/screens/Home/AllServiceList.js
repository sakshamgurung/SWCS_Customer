import React, {useState, useCallback, useEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {TouchableRipple, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Card, CardSection} from 'components/card';
// import {TouchableRipple, Caption} from 'react-native-paper';

export default function AllServiceList({data, refreshData}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [msg, setMsg] = useState('');

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    (async () => {
      if (data) {
        setRefreshing(false);
      } else {
        setMsg('No companies available');
        setRefreshing(false);
      }
    })();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(2000);
    setRefreshing(false);
  }, []);

  const Item = ({item, index}) => (
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
            companyId: item.companyId._id,
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
                {item.companyName}
              </Text>
            </View>
            <View>
              <Caption style={{color: '#E6EEEB'}}>
                {item.companyId.mobileNo}
              </Caption>
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
    //   companyId: item.companyId._id,
    // })
    //     }>
    //     <MaterialCommunityIcons
    //       name="dump-truck"
    //       size={25}
    //       color="rgba(55, 125, 204, 1)"
    //     />
    //     <Text>{item.companyId._id}</Text>
    //     <Text>{item.companyName}</Text>
    //   </TouchableOpacity>
    // </CardSection>
  );

  const renderItem = ({item, index}) => {
    // console.log('item', item);
    return <Item item={item} index={index} />;
  };

  return data ? (
    <FlatList
      style={{marginTop: 20}}
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
    />
  ) : (
    <View
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{msg}</Text>
    </View>
  );
}
