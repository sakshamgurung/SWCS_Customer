import React from 'react';
import {Text,View,ActivityIndicator} from 'react-native';

const LoaderButton = ({ onPress,children }) => {
    const {buttonStyles}=styles;
    return(
        <View onPress={onPress} style={buttonStyles}>
           <ActivityIndicator size="small" color="white" />
        </View>
    );
} 

const styles ={

    textStyle:{
        alignSelf:'center',
        color:'white',
        fontSize:17
              },
      buttonStyles:{
            margin:15,
            backgroundColor:"#009688",
             width:170,
             height:40,
             justifyContent:'center',
             alignItems:'center',
             borderRadius:7,
             elevation:2

          }
}

export default LoaderButton;
