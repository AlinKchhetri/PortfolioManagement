import { StyleSheet, Text, View, Image , TouchableOpacity, FlatList} from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'

import { COLORS, lightFONTS, icons,  darkFONTS, SIZES } from '../../constants'

const NepseApi = () => {
    const [data, setData] = useState();
    
    const getApi = () => {
        axios.get("http://nepstockapi.herokuapp.com/")
            .then((response) => {
                setData(response.data);
            }).catch((error) => {
                console.log(error)
            })
    }

  return (
    <View>
       <View style={{

}}>
  <TouchableOpacity 
  onPress={getApi}
  style={{
    width: SIZES.width-50,
    height: (SIZES.height*40)/SIZES.height,
    backgroundColor: COLORS.blue,
    margin: SIZES.padding
    
  }}>
    <Text>ADD</Text>
  </TouchableOpacity>

  <View>
        <FlatList 
            data={data}
            initialNumToRender={20}
            renderItem = {({item}) => {
      return (
        <View style={styles.shareContainer}>
            <View style={{flex: 1}}>
                <Image source={icons.stock} style={{width:40, height: 40}} />
            </View>
            <View style={{flex: 1,  justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text>{item.Symbol}</Text>
            </View>
            <View style={styles.priceDiff}>
                <Text>{item.Close}</Text>
                <Text>{item.Diff}</Text>
            </View>
        </View>
      )}} />
    </View>
</View>
    </View>
  )
}

export default NepseApi

const styles = StyleSheet.create({
    shareContainer:{
        width: SIZES.width-50,
        height: (SIZES.height*90)/SIZES.height,
        backgroundColor: COLORS.darkgray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.padding
    },
    priceDiff:{
        flex: 2,
        alignItems: 'flex-end',
        marginHorizontal: SIZES.base
    }
})