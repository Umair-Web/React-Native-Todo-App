import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert, Keyboard, } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import LoaderKit from 'react-native-loader-kit'
import firestore from '@react-native-firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';

const Register = ({ navigation }) => {



  const [name, setName] = useState('')
  const [namePlaceholder, setNamePlaceholder] = useState('Enter your fullname.')
  const [email, setEmail] = useState('')
  const [emailPlaceholder, setEmailPlaceholder] = useState('Enter your email.')
  const [password, setPassword] = useState('')
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Enter your password.')
  const [loader, setloader] = useState(false);
  const [error, setError] = useState('');



  const createData = async (uid) => {
    try {
      await
        firestore()
          .collection('Users')
          .doc(uid)
          .set([])
          .then(() => {
            console.log('User added!');
          });
    } catch (e) { console.log("Error while working with Firestore=> ", e) }
  }



  const createUser = async () => {

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)

        .then(async (data) => {
          console.log('User account created & signed in!');
          console.log("User ID :- ", data.user.uid);
          let id = data.user.uid;
          // await createData(id);
          setloader(false);

          try {
            await EncryptedStorage.setItem(
              "user_ID",
              JSON.stringify({
                userID: id,
              })
            );
            console.log("User Id is stored in local storage=>", id)
          } catch (error) {
            console.log("Error while storing in local storage", error)
            setError(error.message);
          }

          navigation.navigate('Main');
        })

        .catch(error => {

          if (error.code === 'auth/email-already-in-use') {
            setloader(false);

            setError(error.message);
            console.log('That email address is already in use!');
            createTwoButtonAlert();
          }

          if (error.code === 'auth/invalid-email') {
            setloader(false);
            setError(error.message);
            console.log('That email address is invalid!');
            createTwoButtonAlert();

          }
          console.error(error);
        })

    }
    catch (e) {
      console.log("Error while creating user", e)
      setError(error.message);
      setloader(false);
    }

  }



  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (email && password) {
      setloader(true)
      await createUser();
      // await createData();
    }
  }



  return (
    <SafeAreaView style={styles.registerMainContainer}>

      {loader ?
        <View >
          <LoaderKit
            style={styles.loader}
            name={'BallPulse'}
            color={"#A34343"}
          />
        </View>
        : <>
          <View style={styles.circle1}></View>

          <View style={styles.circle2}></View>

          <Text style={styles.intro}>WELCOME TO THE QUICK TODO </Text>

          <Text style={styles.para}>The Todo app where organization meets efficiency.</Text>

          <View style={{ gap: 16 }}>

            <TextInput
              style={styles.input}
              placeholderTextColor={"#000"}
              placeholder={namePlaceholder}
              defaultValue={name}
              onChangeText={newText => setName(newText)}
              onClick={() => (setNamePlaceholder(''))} />

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

          <View>
            <Text style={[styles.para]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => (navigation.navigate("Login"))}>
              <Text style={styles.para}>Log in.</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.homebutton} >
            <Text style={styles.homebuttontext}>Register</Text>
          </TouchableOpacity></>}

      {error ? Alert.alert('Registration Error.', error, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]) : ""}

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
  loader: {
    height: 50,
    width: 50,
    alignContent: "center"
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