import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import EncryptedStorage from 'react-native-encrypted-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import LoaderKit from 'react-native-loader-kit'

const Main = ({ navigation }) => {



  const [Userid, setUserid] = useState('');
  const [todoobj, setTodoObj] = useState([]);
  const [input, setInput] = useState("");
  const [collection, setCollection] = useState([]);
  const [updateinput, setUpdateInput] = useState('');
  const [todoInputs, setTodoInputs] = useState({});
  const [loader, setloader] = useState(false);
  const [loaderInput, setloaderInput] = useState(false);



  const handleInputChange = (uniqueId, newText) => {
    setTodoInputs((prevInputs) => (
      {
        ...prevInputs,
        [uniqueId]: newText,
      }
    ));
  };


// Getting todos and and pushing into array.
  const getTodos = async () => {
    if (Userid !== "") {
      try {
        const Tododata = await firestore().collection(Userid).get();
        const updatedTodoObj = [];
        Tododata.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          updatedTodoObj.push(doc.data());
        });
        setTodoObj(updatedTodoObj);
      }
      catch (e) {
        console.log("Error while getting user data", e)
      }
    }
    else {
      //  navigation.navigate("Login")
    }
  };


// Creating todos and creating fetching todos.
  const createTodos = async () => {
    setloaderInput(true);
    var uniqueID = JSON.stringify(uuid.v4());
    // setCollection([...collection,uniqueID])
    try {
      await
        firestore()
          .collection(Userid)
          .doc(uniqueID)
          .set({
            UNIQUEID: uniqueID,
            TODO: input
          })
          .then(() => {
            setloaderInput(false);
            console.log('TodoCreated');
            Keyboard.dismiss();
            getTodos();
            setInput("");
          });
    } catch (e) {
      console.log("Error while working with Firestore=> ", e)
    }
  }



  const deleteTodo = async (id) => {
    firestore()
      .collection(Userid)
      .doc(id)
      .delete()
      .then(() => {
        console.log('Todo deleted!');
        getTodos();
      });
  }



  const updateTodo = async (id) => {
    firestore()
      .collection(Userid)
      .doc(id)
      .update(
        {
          UNIQUEID: id,
          TODO: todoInputs[id]
        }
      )
      .then(() => {
        console.log('Todo updated!');
        setTodoInputs({});
        getTodos();
        setUpdateInput("")
        Keyboard.dismiss();
      }
      );
  }


// It is autoinvoked or autocall function which will get userid from encrypted storage and set the state, 
// this id has been used to make collection in firebase and all the operations need this id to work properly
  useEffect(() => {

    (async function retrieveUserSession() {
      try {
        const session = await EncryptedStorage.getItem("user_ID");
        if (session !== undefined) {
          const id = JSON.parse(session).userID
          console.log("Data from local storage", id)
          setUserid(id);
        }
      } catch (error) {
        console.log("Error while getting data from local storage=>", error)
      }
    }
    )();
  }, []);


  

  useEffect(() => {
    getTodos();
  }, [Userid, collection])



  return (
    <View style={styles.registerMainContainer}>

      <View style={styles.circle1}></View>

      <View style={styles.circle2}></View>

      <View style={styles.todoContainer}>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#000"}
          placeholder='Enter task todo.'
          defaultValue={input}
          onChangeText={newText => setInput(newText)} />

        <TouchableOpacity
          style={styles.plusbox}
          onPress={() => createTodos()}>
          {loaderInput ?
            <View >
              <LoaderKit
                style={styles.loader}
                name={'BallPulse'} 
                color={"#A34343"}
              />
            </View> :
            <Image style={styles.icon} source={require("../assets/plus.png")} />}
        </TouchableOpacity>

      </View>

      <View style={styles.todoListContainer}>

        {todoobj.map((todo) => (
          <View style={styles.todoinsideContainer} key={todo.UNIQUEID}>

            <TextInput
              style={styles.insideinput}
              placeholderTextColor={"#000"}
              placeholder={todo.TODO.toString()}
              value={todoInputs[todo.UNIQUEID] || ''} 
              onChangeText={(newText) => handleInputChange(todo.UNIQUEID, newText)} 
              autoCorrect={false}
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity
              style={styles.plusbox}
              onPress={() => updateTodo(todo.UNIQUEID)}>
              {loader ?
                <View >
                  <LoaderKit
                    style={styles.loader}
                    name={'BallPulse'}
                    color={"#A34343"}
                  />
                </View> :
                <Image style={styles.icon} source={require("../assets/edit.png")} />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.plusbox} onPress={() => deleteTodo(todo.UNIQUEID)}>
              <Image style={styles.icon} source={require("../assets/bin.png")} />
            </TouchableOpacity>

          </View>
        ))}

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
    flexDirection: "column",
    marginTop: 80,
    gap: 8
  },
  todoinsideContainer: {
    flexDirection: "row",
    gap: 2,
  },
  insideinput: {
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
  },
  loader: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center"
  }
})