import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {
  return (
    <View style={styles.homeMainContainer}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <Image style={styles.homeimg} source={require("../assets/homeimg.png")}/>
      <Text style={styles.homeintro}>GET THINGS DONE WITH TODO</Text>
      <Text style={styles.homepara}>This is a simple todo app to keep records of daily task.</Text>
      <TouchableOpacity onPress={()=>(navigation.navigate('Register'))} style={styles.homebutton}>
        <Text style={styles.homebuttontext}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    homeMainContainer:{ 
        flex:1,
        gap:41,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFDEE",
        paddingHorizontal:30
    },
    homeimg:{
        width:153,
        height:190
    },
    homeintro:{
        fontFamily:"Poppins-ExtraBold",
        fontSize:22,
        color:"#A34343",
        
        
       
    },
    homepara:{
      fontSize:20,
      textAlign:"center"
    },
    homebutton:{
      width:253,
      height:50,
      backgroundColor:"#A34343",
      alignItems:"center",
      justifyContent:"center",
      
    },
    homebuttontext:{
      fontFamily:"Poppins-ExtraBold",
      fontSize:23,
      color:"white",
      marginTop:5,
      letterSpacing:1
    },
    circle1:{
      position:"absolute",
      height:200,
      width:200,
      backgroundColor:"#E9C874",
      borderRadius:200/2,
      top:-10,
      left:-100,
      opacity: 0.5,
      
    },
    circle2:{
      position:"absolute",
      height:200,
      width:200,
      backgroundColor:"#E9C874",
      borderRadius:200/2,
      top:-100,
      left:0,
      opacity: 0.5,
    }
})