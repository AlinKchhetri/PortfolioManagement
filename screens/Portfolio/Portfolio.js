import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import MyPortfolio from './MyPortfolio'

import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'
import Dashboard from '../HomeScreen/Dashboard';

const Portfolio = () => {
  return (
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator ={false}>
        {/* <Text>New</Text>
      <Dashboard /> */}
      <MyPortfolio />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1, 
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center'
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
})

export default Portfolio