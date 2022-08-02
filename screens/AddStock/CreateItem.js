import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import {db} from '../../components/Firebase/configexpo';
import { collection, deleteDoc, doc, getDoc, setDoc, addDoc, getDocs } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'

const CreateItem = () => {

    const [gotDoc, setGotDoc] =useState(false);

    const Create = () => {
        // const myDoc = doc(db, "Portfolio", "sample")
        // const docData = {
            
        //     "username": "sample",
        //     "email": "sample@",
        // }
    
        //   setDoc(myDoc, docData)
        const myDoc = collection(db, "Portfolio")
        getDocs(myDoc)
          .then (() => {
             setGotDoc(true);
        })
        .catch ((error) => {
          alert(error.message)
      })
    }

    useEffect(() => {
        Create();
      
      }, [])
    
      const Add = () => {
        const addStock = collection(db, "Portfolio")
    
        const docData = {
            "username": "yes",
            "email": "yes@",
        }
    
          addDoc(addStock, docData)
          .then (() => {
            alert("Document Created")  
        })
        .catch ((error) => {
          alert(error.message)
        })
      }

  return (
    <View style={styles.addStockContainer}>
          <View style={styles.header}>
              <Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>My Portfolio</Text>

              <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                      navigation.navigate('Profile')
                  }}>
                  <Image source={icons.add}
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.black,
                          opacity: 0.5
                      }} />
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default CreateItem

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.padding,
        alignItems: 'center'

    },
    addButton: {
        backgroundColor: COLORS.darkgray,
        width: 50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    }
})