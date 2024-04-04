import { StyleSheet, Text, View,TouchableOpacity, TextInput, Button } from 'react-native'
import React from 'react'

const Register = ({navigation}) => {
  return (
    <View style={styles.registerMainContainer}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
  
      <Text style={styles.intro}>WELCOME TO THE QUICK TODO </Text>
      <Text style={styles.para}>The Todo app where organization meets efficiency.</Text>
      <View style={{gap:16}}>
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter your fullname'/>
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter your fullname'/>
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter your fullname'/>
      </View>
      <View >
        <Text  style={[styles.para]}>Already have an account? </Text>
        <TouchableOpacity onPress={()=>(console.log(navigation.navigate("Login")))}><Text style={styles.para}>Log in.</Text></TouchableOpacity>
      </View>
      <TouchableOpacity  style={styles.homebutton} >
        <Text style={styles.homebuttontext}>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  registerMainContainer:{ 
        flex:1,
        gap:30,
        paddingTop:40,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFDEE",
        paddingHorizontal:30
    },
    homeimg:{
        width:153,
        height:190
    },
    intro:{
        fontFamily:"Poppins-ExtraBold",
        fontSize:22,
        color:"#A34343",
        
        
       
    },
    para:{
      fontSize:20,
      textAlign:"center"
    },
    input:{
      width:253,
      height:42,
      backgroundColor:"#C0D6E8",
      fontSize:16,
      paddingLeft:13
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