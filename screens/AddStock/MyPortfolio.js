import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import {db} from '../../components/Firebase/configexpo';
import { collection, doc, getDocs } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'

const MyPortfolio = () => {

    const [dataItem, setDataItem] = useState([]);

    const ReadAll = () => {
        getDocs(collection(db, "Portfolio"))
        .then(docSnap => {
          let userPortfolio = [];
          docSnap.forEach((doc) => {
            userPortfolio.push({...doc.data(), id:doc.id})
          });
          setDataItem(userPortfolio);
          
        })
      }
    
    useEffect(() => {
        ReadAll();
      
      }, [])

  return (
    <View>

      {
        dataItem.map((doc) => {
          return (
            <View key={doc.id}>
            {/* <Text>{doc.email}</Text>
            <Text>{doc.username}</Text> */}
            <TouchableOpacity style={styles.shareContainer}>
            <View style={{flex: 0.5}}>
                <Image source={icons.stock} style={{width:40, height: 40}} />
            </View>
            <View style={{flex: 0.9, justifyContent: 'center', padding: SIZES.base }}>
                <Text style={{...darkFONTS.h5}}>{doc.username}</Text>
            </View>
            <View style={styles.priceDiff}>
                <Text style={{...darkFONTS.h6}}>{doc.username}</Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.up} style={{width: 15, height: 15}}/>
                  <Text style={{...darkFONTS.body4}}>{doc.username}</Text>
                  <Image source={icons.down} style={{width: 15, height: 15}}/>
                </View>
            </View>
        </TouchableOpacity>
            </View>
          )
        })
      }

      </View>
  )
}

export default MyPortfolio

const styles = StyleSheet.create({
  shareContainer:{
    width: SIZES.width - 50,
    height: (SIZES.height * 100) / SIZES.height,
    backgroundColor: COLORS.darkgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: SIZES.padding,
    marginTop:SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.padding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    },

    searchBar:{
      ...darkFONTS.h6,
      width: SIZES.width-50,
      height: 50,
      backgroundColor: COLORS.darkGray,
      borderColor: COLORS.darkgray,
      borderWidth:2,
      alignItems: 'center',
      margin: SIZES.base,
      paddingHorizontal: SIZES.padding,
      borderRadius: SIZES.padding,
    },
    priceDiff:{
        flex: 2,
        alignItems: 'flex-end',
        marginHorizontal: SIZES.base
    }
})