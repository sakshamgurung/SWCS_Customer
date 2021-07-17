import React from 'react'
import {Text,View,TouchableOpacity,TouchableHighlight} from 'react-native'

const NavButton = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'flex-end',paddingBottom:10}} >
            {/* <View style={{width:'60%',height:'40%',borderRadius:20,backgroundColor:'lightblue',alignItems:'center',justifyContent:'center'}} > */}
            <Text style={{fontSize:17,fontWeight:'bold',color:'white'}} >{props.title}</Text>
            {/* </View> */}
        </TouchableOpacity>
    )
}

export default NavButton;