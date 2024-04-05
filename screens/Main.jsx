import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Main = () => {
  return (
    <View style={styles.registerMainContainer}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <View style={styles.todoContainer}>
        <TextInput style={styles.input} placeholderTextColor={"#000"} placeholder='Enter task todo.' />
        <TouchableOpacity style={styles.plusbox}>
          <Image style={styles.icon} source={require("../assets/plus.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.todoListContainer}>
        <View style={styles.todoinsideContainer}>
          <TextInput style={styles.insideinput} placeholderTextColor={"#000"} placeholder='Enter task todo.' />
          <TouchableOpacity style={styles.plusbox}>
            <Image style={styles.icon} source={require("../assets/edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusbox}>
            <Image style={styles.icon} source={require("../assets/bin.png")} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  registerMainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFDEE",
  },
  input: {
    width: 253,
    height: 42,
    backgroundColor: "#C0D6E8",
    fontSize: 16,
    paddingLeft: 13
  },
  todoContainer: {
    flexDirection: "row",
    gap: 2,
    marginTop: 80
  },
  plusbox: {
    height: 42,
    width: 44,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    height: 20,
    width: 20
  },
  todoListContainer: {
   flexDirection:"column",
   marginTop:80,
   gap:8
  },
  todoinsideContainer:{
    flexDirection: "row",
    gap: 2,
  },
  insideinput:{
    width: 210,
    height: 42,
    backgroundColor: "#C0D6E8",
    fontSize: 16,
    paddingLeft: 13
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