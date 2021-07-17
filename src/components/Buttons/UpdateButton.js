import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Text,Caption,Title,Headline,TouchableRipple} from 'react-native-paper'

const UpdateButton = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={{width:100,height:30,alignItems:'center',justifyContent:'center',backgroundColor:'#009688',elevation:5,bottom:-7,borderRadius:7}} >
          <Text style={{color:'white',}} >{props.children}</Text>
        </TouchableOpacity>
    )
}

export default UpdateButton