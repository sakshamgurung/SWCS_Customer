import React, {useState, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {TouchableRipple, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Card, CardSection} from 'components/card';

export default function RequestList({data}) {
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
                {item.companyDetail.companyName}
              </Text>
            </View>
            <View>
              <Caption style={{color: '#E6EEEB'}}>
                {item.companyId.mobileNo}
              </Caption>
            </View>
            <View>
              <Caption style={{color: '#E6EEEB'}}>
                {item.companyDetail.companyType}
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
    //       navigation.navigate('RequestIndex', {
    //         customerRequestId: item._id,
    //         companyId: item.companyId._id,
    //       })
    //     }>
    //     <MaterialCommunityIcons
    //       name="format-list-bulleted"
    //       size={25}
    //       color="rgba(55, 125, 204, 1)"
    //     />
    //     <Text>{item.companyId._id}</Text>
    //     <Text>{item.companyDetail.companyName}</Text>
    //     <Text>Requested service: {item.requestType}</Text>
    //     <Text>Service status: {item.requestStatus}</Text>
    //   </TouchableOpacity>
    // </CardSection>
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
