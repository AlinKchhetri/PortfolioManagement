import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import Dashboard from './Dashboard';
import HomeHeader from './HomeHeader';
import NepseApi from './NepseApi';
import { COLORS, lightFONTS, darkFONTS, SIZES } from '../../constants'


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator ={false}>
        <View>
          <HomeHeader />
          <Dashboard />
          <View style={styles.todayMarket}>
            <Text style={{...darkFONTS.h4, padding: SIZES.padding}}>Today's Market</Text>
            <NepseApi />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1, 
    backgroundColor: COLORS.white,
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  
})

export default Home