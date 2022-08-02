import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import GestureRecognizer from 'react-native-swipe-gestures';
import {db} from '../../components/Firebase/configexpo';
import { collection, deleteDoc, doc, getDoc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import SelectList from 'react-native-dropdown-select-list';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'
import { async } from '@firebase/util';
import { TextInput } from 'react-native-gesture-handler';

const CreateItem = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [gotDoc, setGotDoc] =useState(false);
    const [loaded, setLoaded] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selected, setSelected] = useState("");
  const [data,setData] = useState([]);


const showSymbol = () => {
    axios.get("http://nepstockapi.herokuapp.com/")
            .then((response) => {
              setFilteredDataSource(response.data);
              setMasterDataSource(response.data);
              setLoaded(false)
              let newArray = response.data.map((item) => {
                return {key: item.Symbol, value: item.Symbol}
              }); 
              setData(newArray);
            })
            .catch((error) => {
                console.log(error)
            });
}
 

    const Create = () => {
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
        <ScrollView>
          <View style={styles.header}>
              <Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>My Portfolio</Text>

              <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {setModalVisible(!modalVisible); showSymbol()}}>
                  <Image source={icons.add}
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.black,
                          opacity: 0.5
                      }} />
              </TouchableOpacity>
          </View>

          {/* <GestureRecognizer
            style={{flex: 1}}> */}


      <Modal
        style={{
          height: 300
        }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalStyle}>
          <View style={styles.modalHeader}>
            <Text style={{...lightFONTS.h5, padding: SIZES.padding}}>Add New Stock</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image source={icons.add}
                style={{
                    width: 30,
                    height:30,
                    transform: [{rotate: '45deg'}]
                }}/>
            </TouchableOpacity>
          </View>
          <View>
          { loaded? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={40} color= '#000000' /></View>)
        : (<View>
            <SelectList setSelected={setSelected} data={data}/>
        </View>)}
        <Text style={{...lightFONTS.h3}}>{selected}</Text>
          </View>

        </View>
      </Modal>
      {/* </GestureRecognizer> */}
      </ScrollView>
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
    },

    modalStyle:{
        height: '70%',
        marginTop: 'auto',
        backgroundColor: '#1f1f1f',
        opacity: 0.98,
        borderTopLeftRadius: SIZES.h2,
        borderTopRightRadius: SIZES.h2
    },
    modalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    }
})