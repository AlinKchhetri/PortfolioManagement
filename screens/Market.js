import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, lightFONTS, darkFONTS, SIZES } from '../constants'
import NepseApi from './MainScreen/NepseApi'

const Market = () => {
  return (
    <View style={styles.marketContainer}>
      <ScrollView
      showsVerticalScrollIndicator ={false}>
    <Text style={{...darkFONTS.h3, padding: SIZES.padding, alignSelf: 'flex-start'}}>Today's Market</Text>
      <NepseApi />
      </ScrollView>
    </View>
  )
}

export default Market

const styles = StyleSheet.create({
    marketContainer:{
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 34,
        flex: 1,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center', 
    }
})