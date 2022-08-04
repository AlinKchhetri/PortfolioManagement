import { StyleSheet,RefreshControl, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {db} from '../../components/Firebase/configexpo';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'
import Aashboard from './dashboard'


const show = () => {
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
      
    useEffect(() => {
        ReadAll();
        forDashboard();
      }, [ReadAll])



      const forDashboard = () => {
        setCurrentBalance((dataItem.reduce((a,v) =>  a = a + v.currentValue, 0 )).toLocaleString());
        setTotalUnits((dataItem.reduce((a,v) =>  a = a + Math.floor(v.unit), 0 )).toLocaleString());
        setTotalInvestment((dataItem.reduce((a,v) =>  a = a + v.investment, 0 )).toLocaleString());
        setTotalProfitLoss((dataItem.reduce((a,v) =>  a = a + v.profitLoss, 0 )).toLocaleString());

      }
  return (
    <View>
      <Aashboard currentBalance={currentBalance} totalUnits={totalUnits} totalInvestment = {totalInvestment} profitLoss={totalProfitLoss}/>
    </View>
  )
}

export default show

const styles = StyleSheet.create({})