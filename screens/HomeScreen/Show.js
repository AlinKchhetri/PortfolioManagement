import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import {db} from '../../components/Firebase/configexpo';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { COLORS, icons, SIZES } from '../../constants'
import DashboardCard from './dashboard'


const show = () => {
    const [dataItem, setDataItem] = useState([]);
    const [currentBalance, setCurrentBalance] = useState('');
    const [totalUnits, setTotalUnits] = useState('');
    const [totalInvestment, setTotalInvestment] = useState('');
    const [totalProfitLoss, setTotalProfitLoss] = useState('');
    const [shown, setShown ] = useState(true);
    const [isRefreshed, setIsRefreshed] = useState(false);

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
      
    useEffect(() => {
        ReadAll();
      }, [currentBalance])
    useEffect(() => {
      forDashboard();
    }, [ReadAll, dataItem])




      const forDashboard = () => {
        setCurrentBalance((dataItem.reduce((a,v) =>  a = a + v.currentValue, 0 )).toLocaleString());
        setTotalUnits((dataItem.reduce((a,v) =>  a = a + Math.floor(v.unit), 0 )).toLocaleString());
        setTotalInvestment((dataItem.reduce((a,v) =>  a = a + v.investment, 0 )).toLocaleString());
        setTotalProfitLoss((dataItem.reduce((a,v) =>  a = a + v.profitLoss, 0 )).toLocaleString());
        setIsRefreshed(true)
        if(shown){
          setCurrentBalance('XXXX');
          setTotalUnits('XXXX')
          setTotalInvestment('XXXX')
          setTotalProfitLoss('XXXX')
        }

      }
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: SIZES.padding}}>
      <TouchableOpacity
                onPress={() => {setShown(!shown)}}
                  style={styles.addButton}
                  >
                  <Image source={shown? icons.hideEye : icons.showEye}
                      style={{
                          width: 20,
                          height: 20,
                          tintColor: COLORS.white,
                      }} />
              </TouchableOpacity>
      <TouchableOpacity
                onPress={() => {forDashboard(); ReadAll()}}
                  style={styles.addButton}
                  >
                  <Image source={icons.refresh}
                      style={{
                          width: 20,
                          height: 20,
                          tintColor: COLORS.white,
                      }} />
              </TouchableOpacity>
              </View>
    <DashboardCard currentBalance={currentBalance} totalUnits={totalUnits} totalInvestment = {totalInvestment} profitLoss={totalProfitLoss} />
    </View>
  )
}

export default show

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: COLORS.darkgray,
    width: 40,
    height:40,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
},
})