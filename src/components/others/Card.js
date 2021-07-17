import React,{Component} from 'react'
import {Text,View,Dimensions,ScrollView} from 'react-native'
const  {height} = Dimensions.get('window')

const Card = (props) =>{
    return(
        <ScrollView contentContainerStyle={styles.cardStyle} >
            {props.children}
        </ScrollView>
    )
}

const styles = {
    cardStyle:{
        backgroundColor:'#1B7AB5',
        elevation:5,
        borderRadius:10,
        width:'70%',
        height:420,
        padding:30,
        alignItems:'center',
        flexDirection:'column',
    }
}

export default Card