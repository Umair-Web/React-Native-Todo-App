import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import LoaderKit from 'react-native-loader-kit'
import EncryptedStorage from 'react-native-encrypted-storage';

const Login = ({ navigation }) => {

// Login state management
  const [email, setEmail] = useState('')
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter your email.')
  const [password, setPassword] = useState('')
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Enter your password.')
  const [loader, setloader] = useState(false);
  const [error, setError] = useState('');

// User signin and id encryption
  const handleuser = async () => {
    setloader(true);

    try {

      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (data) => {

          console.log('User signed in!');
          console.log("Signed In user data=>", data.user.uid)
          let id = data.user.uid;
          setloader(false);

          try {
            await EncryptedStorage.setItem(
              "user_ID",
              JSON.stringify({
                userID: id,
              })
            );

            console.log("User Id is stored in local storage=>", id)
            navigation.navigate("Main");
            
          } 
          catch (error) {
            console.log("Error while storing in local storage", error)
            setError(error.message);
          }

        })
        .catch(error => {
          setloader(false);
          setError(error.message);
          console.error(error);
        });

    }
    catch (e) {
      setloader(false);
    }
    setError("");

  }


  return (
    <View
      style={styles.registerMainContainer}>

      {loader ?
        <View >
          <LoaderKit
            style={styles.loader}
            name={'BallPulse'}
            color={"#A34343"}
          />
        </View> :
        <>

          <View style={styles.circle1}></View>

          <View style={styles.circle2}></View>

          <Text style={styles.intro}>WELCOME TO THE QUICK TODO </Text>

          <Text style={styles.para}>Hey ! Register if you don't hold and account.</Text>

          <View style={{ gap: 16 }}>

            <TextInput
              style={styles.input}
              placeholderTextColor={"#000"}
              placeholder={emailPlaceholder}
              defaultValue={email}
              onChangeText={newText => setEmail(newText)}
              onClick={() => (setEmailPlaceholder(''))} />

            <TextInput
              secureTextEntry
              style={styles.input}
              placeholderTextColor={"#000"}
              placeholder={passwordPlaceholder}
              defaultValue={password}
              onChangeText={newText => setPassword(newText)}
              onClick={() => (setPasswordPlaceholder(''))} />

          </View>

          <View >
            <Text style={[styles.para]}>Donot have an account? </Text>
            <TouchableOpacity
              onPress={() => (console.log(navigation.navigate("Register")))}>
              <Text style={styles.para}>Register.</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleuser} style={styles.homebutton} >
            <Text style={styles.homebuttontext}>Login</Text>
          </TouchableOpacity>

        </>}

      {error ? Alert.alert('Registration Error.', error, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => console.log('OK Pressed')
        },
      ]) : ""}

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  registerMainContainer: {
    flex: 1,
    gap: 40,
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
  loader: {
    height: 50,
    width: 50,
    alignContent: "center"
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