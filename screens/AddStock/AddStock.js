import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import CreateItem from './CreateItem';
import {db} from '../../components/Firebase/configexpo';
import { collection, deleteDoc, doc, getDoc, setDoc, addDoc, getDocs } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS } from '../../constants'
import { async } from '@firebase/util';


const AddStock = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dataItem, setDataItem] = useState([]);
  const [updateItem, setUpdateItem] = useState('');


  const Create = () => {
    const myDoc = doc(db, "PortfolioManagement", "newDocument")

    const docData = {
        "username": username,
        "email": email,
    }

    if(username && email != "") {
      setDoc(myDoc, docData)
      .then (() => {
        setUsername('');
        setEmail('');
        alert("Document Created")  
    })
    .catch ((error) => {
      alert(error.message)
  })
    } else {
      alert("Document Empty")  
    }  
  }

  const Add = () => {
    const addStock = collection(db, "userPortfolio")

    const docData = {
        "username": username,
        "email": email,
    }

    if(username && email != "") {
      addDoc(addStock, docData)
      .then (() => {
        setUsername('');
        setEmail('');
        alert("Document Created")  
    })
    .catch ((error) => {
      alert(error.message)
    })
    } else {
      alert("Document Empty")  
    }  
  }

  const Read =  () => {
    const myDoc = collection(db, "userPortfolio", 'sq2fToHEA5l9Nu6yi8eM')

    getDocs(myDoc)
    .then ((snapshot) => {
      if(snapshot.exists()) {
        setDataItem(snapshot.data())
      } else {
        alert("No Document Found")
      }
    })
    .catch ((error) => {
        alert(error.message)
    })
  }

  const ReadAll = () => {
    getDocs(collection(db, "userPortfolio"))
    .then(docSnap => {
      let userPortfolio = [];
      docSnap.forEach((doc) => {
        userPortfolio.push({...doc.data(), id:doc.id})
      });
      setDataItem(userPortfolio);
      
    })
  }

  
  

  


  const Update = (value,merge) => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    setDoc(myDoc,value,{merge: merge})
    .then (() => {
        setUpdateItem('');
        alert("Update Succesful")   
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
      <ScrollView
      showsVerticalScrollIndicator ={false}>
      <CreateItem />
      {/* <Text style={{...lightFONTS.body3}}>CRUD Operation Test</Text>

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
        onPress={Add}
        style={styles.button}><Text style={{...darkFONTS.body3}}>Submit</Text></TouchableOpacity>
      <TouchableOpacity 
      onPress={ReadAll}
      style={styles.button}><Text style={{...darkFONTS.body3}}>View</Text></TouchableOpacity>

      <View>

      {
        dataItem.map((doc) => {
          return (
            <Text key={doc.id}>{doc.email}</Text>
          )
        })
      }

      </View>
    {
      dataItem !=null &&
      <>
      <Text style={{...darkFONTS.body3}}>username: {dataItem.username}</Text>
      <Text style={{...darkFONTS.body3}}>email: {dataItem.email}</Text>
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
     */}
    </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1, 
    backgroundColor: COLORS.lightGray,
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

export default AddStock