import { StyleSheet,RefreshControl, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {db} from '../../components/Firebase/configexpo';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import DashboardCard from '../HomeScreen/dashboard';
import MyStocks from './MyStocks';

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'


const MyPortfolio = () => {

    const [dataItem, setDataItem] = useState([]);
    const [currentBalance, setCurrentBalance] = useState('');
    const [totalUnits, setTotalUnits] = useState('');
    const [totalInvestment, setTotalInvestment] = useState('');
    const [totalProfitLoss, setTotalProfitLoss] = useState('');

    const ReadAll = () => {
      const buyOnly = query(collection(db, "Portfolio"), where('transactionType', '==' ,'BUY'))
        getDocs(buyOnly)
        .then(docSnap => {
          let userPortfolio = [];
          docSnap.forEach((doc) => {
            userPortfolio.push({...doc.data(), id:doc.id})
          });
          setDataItem(userPortfolio);
        })
      }
      
    //   useEffect(() => {
    //     if (dataItem) {
    //     ReadAll();
    //     } else {
    //       forDashboard();
    //     }
    //   }, [])
    
    // useEffect(() => {
        
    //     forDashboard();
    //   }, [dataItem])
    useEffect(() => {
      ReadAll();
      return () => {
        setCurrentBalance('')
      }
    }, [currentBalance])
  useEffect(() => {
    forDashboard();
    
  }, [ReadAll, currentBalance])



      const forDashboard = () => {
        setCurrentBalance((dataItem.reduce((a,v) =>  a = a + v.currentValue, 0 )).toLocaleString());
        setTotalUnits((dataItem.reduce((a,v) =>  a = a + Math.floor(v.unit), 0 )).toLocaleString());
        setTotalInvestment((dataItem.reduce((a,v) =>  a = a + v.investment, 0 )).toLocaleString());
        setTotalProfitLoss((dataItem.reduce((a,v) =>  a = a + v.profitLoss, 0 )).toLocaleString());

      }


      // const render = () => {
      //   return (
          
      //   )
      // }

      // useEffect(() => {
      //   render();
      // }, [])

      
    
  return (
    <View>
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <DashboardCard currentBalance={currentBalance} totalUnits={totalUnits} totalInvestment = {totalInvestment} profitLoss={totalProfitLoss}/>
        <View style={styles.header}>
              <Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>My Portfolio</Text>

              <TouchableOpacity
                onPress={() => {ReadAll(); forDashboard()}}
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
              <MyStocks 
                symbol={doc.symbol} 
                transactionType = {doc.transactionType} 
                priceNow = {doc.priceNow} 
                profitLossPercentage={doc.profitLossPercentage}
                unit = {doc.unit}
                price= {doc.price}
                investment = {doc.investment}
                currentValue = {doc.currentValue}
                profitLoss = {doc.profitLoss}
              />
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
    height: (SIZES.height * 190) / SIZES.height,
    backgroundColor: COLORS.darkgray,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    margin: SIZES.padding,
    marginTop:SIZES.base,
    padding: SIZES.padding,
    
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
  },
  unitSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.base
  }
})