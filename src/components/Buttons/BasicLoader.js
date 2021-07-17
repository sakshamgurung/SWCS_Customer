import React from 'react'
import {View,ActivityIndicator} from 'react-native'

const BasicLoader = (props) =>{
    return(
        <View style={{width:'100%',height:'100%',alignItems:props.alignItems,justifyContent:props.justifyContent}} >
          <ActivityIndicator size={props.size} color={props.color} />
        </View>
    )
}

export default BasicLoader;