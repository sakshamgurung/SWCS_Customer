import React from 'react'
import {Text,View} from 'react-native'

const OrSeparator = () =>{
    return(
        <View style={styles.main} >
            <View style={styles.line} ><View style={{height:1,backgroundColor:'white',width:'100%'}} ></View></View>
            <View style={styles.or} ><Text style={{color:'white'}} >OR</Text></View>
            <View style={styles.line} ><View style={{height:1,backgroundColor:'white',width:'100%'}} ></View></View>
        </View>
    )
}

export default OrSeparator;

const styles = {
    line:{
        flex:0.4
    },
    or:{
     flex:0.2,
     alignItems:'center'
    },
    main:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:5
    }
}