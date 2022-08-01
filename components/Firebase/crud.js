import React, { useState } from 'react';
import {db} from './configexpo';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';




  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dataItem, setDataItem] = useState('');


  export const Create = () => {
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

  export const Read = () => {
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

  export const Update = (value,merge) => {
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


  export const Delete = () => {
    const myDoc = doc(db, "MyCollection", "newDocument")

    deleteDoc(myDoc)
    .then (() => {
      alert("Delete Succesful")
  })
  .catch ((error) => {
      alert(error.message)
  })

  }
