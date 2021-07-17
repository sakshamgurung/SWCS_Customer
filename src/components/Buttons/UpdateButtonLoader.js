import React from 'react'
import {View,ActivityIndicator} from 'react-native'

const UpdateButtonLoader = (props) => {
    return(
        <View oPress={props.onPress} style={{width:100,height:30,alignItems:'center',justifyContent:'center',backgroundColor:'#009688',elevation:5,bottom:-7,borderRadius:7}} >
          <ActivityIndicator size="small" color="white" />
        </View>
    )
}

export default UpdateButtonLoader