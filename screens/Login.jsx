import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

const Login = ({navigation}) => {
  return (
      <View style={styles.registerMainContainer}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
    
        <Text style={styles.intro}>WELCOME TO THE QUICK TODO </Text>
        <Text style={styles.para}>Hey ! Register if you don't hold and account.</Text>
        <View style={{gap:16}}>
          <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter email.'/>
          <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter password.'/>
       
        </View>
        <View >
          <Text  style={[styles.para]}>Donot have an account? </Text>
          <TouchableOpacity onPress={()=>(console.log(navigation.navigate("Register")))}><Text style={styles.para}>Register.</Text></TouchableOpacity>
        </View>
        <TouchableOpacity  style={styles.homebutton} >
          <Text style={styles.homebuttontext}>Login</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Login

const styles = StyleSheet.create({
  registerMainContainer:{ 
        flex:1,
        gap:40,
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