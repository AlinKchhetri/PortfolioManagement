import { StyleSheet,RefreshControl, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {db} from '../../components/Firebase/configexpo';
import { collection, doc, getDocs } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'

const MyPortfolio = () => {

    const [dataItem, setDataItem] = useState([]);
    const [refreshing, setRefreshing]= useState(false);

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

      // const render = () => {
      //   return (
          
      //   )
      // }

      // useEffect(() => {
      //   render();
      // }, [])

  return (
    <View
      refreshControl = {
        <RefreshControl 
          // refreshing ={refreshing}
          onRefresh ={ReadAll}
          colors={['blue']}

        />
      }>
        <ScrollView
      showsVerticalScrollIndicator ={false}>
        <View style={styles.header}>
              <Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>My Portfolio</Text>

              <TouchableOpacity
                onPress={ReadAll}
                  style={styles.addButton}
                  >
                  <Image source={icons.refresh}
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.black,
                          opacity: 0.5
                      }} />
              </TouchableOpacity>
          </View>

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
                <Text style={{...darkFONTS.h5}}>{doc.symbol}</Text>
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
      </ScrollView>
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