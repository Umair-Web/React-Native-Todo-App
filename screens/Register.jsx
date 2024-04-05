import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
const Register = ({ navigation }) => {
  const [name, setName] = useState('')
  const [namePlaceholder, setNamePlaceholder] = useState('Enter your fullname.')
  const [email, setEmail] = useState('')
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter your email.')
  const [password, setPassword] = useState('')
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Enter your password.')
  const handleSubmit = async () => {
    if (email && password) {
      try {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      }
      catch (e) {
        console.log("Error while creating user")
      }
    }
  }
  return (
    <SafeAreaView style={styles.registerMainContainer}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>

      <Text style={styles.intro}>WELCOME TO THE QUICK TODO </Text>
      <Text style={styles.para}>The Todo app where organization meets efficiency.</Text>
      <View style={{ gap: 16 }}>
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder={namePlaceholder} defaultValue={name} onChangeText={newText => setName(newText)} onClick={() => (setNamePlaceholder(''))} />
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder={emailPlaceholder} defaultValue={email} onChangeText={newText => setEmail(newText)} onClick={() => (setEmailPlaceholder(''))} />
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder={emailPlaceholder} defaultValue={password} onChangeText={newText => setPassword(newText)} onClick={() => (setPasswordPlaceholder(''))} />
      </View>
      <View >
        <Text style={[styles.para]}>Already have an account? </Text>
        <TouchableOpacity onPress={() => (navigation.navigate("Login"))}><Text style={styles.para}>Log in.</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.homebutton} >
        <Text style={styles.homebuttontext} onPress={handleSubmit}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  registerMainContainer: {
    flex: 1,
    gap: 30,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDEE",
    paddingHorizontal: 30
  },
  homeimg: {
    width: 153,
    height: 190
  },
  intro: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 22,
    color: "#A34343",



  },
  para: {
    fontSize: 20,
    textAlign: "center"
  },
  input: {
    width: 253,
    height: 42,
    backgroundColor: "#C0D6E8",
    fontSize: 16,
    paddingLeft: 13
  },
  homebutton: {
    width: 253,
    height: 50,
    backgroundColor: "#A34343",
    alignItems: "center",
    justifyContent: "center",

  },
  homebuttontext: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 23,
    color: "white",
    marginTop: 5,
    letterSpacing: 1
  },
  circle1: {
    position: "absolute",
    height: 200,
    width: 200,
    backgroundColor: "#E9C874",
    borderRadius: 200 / 2,
    top: -10,
    left: -100,
    opacity: 0.5,

  },
  circle2: {
    position: "absolute",
    height: 200,
    width: 200,
    backgroundColor: "#E9C874",
    borderRadius: 200 / 2,
    top: -100,
    left: 0,
    opacity: 0.5,
  }
})