import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, lightFONTS, darkFONTS, SIZES } from '../constants'
import NepseApi from './HomeScreen/NepseApi'

const Market = () => {
  return (
    <View style={styles.marketContainer}>
    <Text style={{...darkFONTS.h3, padding: SIZES.padding, alignSelf: 'flex-start'}}>Today's Market</Text>
      <NepseApi />
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
        justifyContent: 'center',
        alignItems: 'center', 
    }
})