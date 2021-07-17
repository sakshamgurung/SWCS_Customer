import React,{Component} from 'react'
import {Text,View} from 'react-native'

const CardSection =(props)=>{
    return(
        <View style={styles.containerStyle} >
           {props.children}
        </View>
    )
}

const styles = {
    containerStyle:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
    }
}

export default CardSection;