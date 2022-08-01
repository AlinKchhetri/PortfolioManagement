import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import {db} from '../components/configexpo';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS } from '../constants'


const Home = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dataItem, setDataItem] = useState('');
  const [updateItem, setUpdateItem] = useState('');


  const Create = () => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    const docData = {
        "username": username,
        "email": email,
    }

    if(username && email != "") {
      setDoc(myDoc, docData)
      .then (() => {
        alert("Document Created")  
    })
    .catch ((error) => {
      alert(error.message)
  })
    } else {
      alert("Document Empty")  
    }  
  }

  const Read = () => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    getDoc(myDoc)
    
    .then ((snapshot) => {
      if(snapshot.exists) {
        setDataItem(snapshot.data())
      } else {
        alert("No Document Found")
      }
    })
    .catch ((error) => {
        alert(error.message)
    })
  }

  const Update = (value,merge) => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    setDoc(myDoc,value,{merge: merge})
    .then (() => {
        alert("Update Succesful")
        setUpdateItem('')
    })
    .catch ((error) => {
        alert(error.message)
    })
  }


  const Delete = () => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    deleteDoc(myDoc)
    .then (() => {
      alert("Delete Succesful")
  })
  .catch ((error) => {
      alert(error.message)
  })

  }



  return (
    <View style={styles.container}>
      <Text style={{...lightFONTS.body3}}>CRUD Operation Test</Text>

      <TextInput 
        value={username}
        onChangeText={(username) => {setUsername(username)}} 
        placeholder='username' 
        style={styles.inputField}/>
      <TextInput 
        value={email}
        onChangeText={(email) => {setEmail(email)}} 
        placeholder='email' 
        style={styles.inputField}/>

      <TouchableOpacity 
        onPress={Create}
        style={styles.button}><Text style={{...darkFONTS.body3}}>Submit</Text></TouchableOpacity>
      <TouchableOpacity 
      onPress={Read}
      style={styles.button}><Text style={{...darkFONTS.body3}}>View</Text></TouchableOpacity>

    {
      dataItem !=null &&
      <>
      <Text style={{...lightFONTS.body3}}>username: {dataItem.username}</Text>
      <Text style={{...lightFONTS.body3}}>email: {dataItem.email}</Text>
      </>
    }

    <TextInput 
      style={styles.inputField}
      onChangeText={(updateItem) => {setUpdateItem(updateItem)}}
      placeholder='Type Here'>

    </TextInput>

    <TouchableOpacity 
      onPress={() => {
        Update({
          "username": updateItem
        }, true)
      }}
      disabled = {updateItem == ""}
      style={styles.button}><Text style={{...darkFONTS.body3}}>Update</Text></TouchableOpacity>

    <TouchableOpacity 
      onPress={Delete}
      style={styles.button}><Text style={{...darkFONTS.body3}}>Delete</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    backgroundColor: 'white',
    paddingTop: 50,
  },

  inputField: {
    width: 200,
    height: 50,
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
    color: 'black',
  },

  button: {
    width: 120,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    color: 'white'

  }

})

export default Home