import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,  darkFONTS, icons, images, SIZES } from '../../constants'

const HomeHeader = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.WelcomeSection}>
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate('Profile')
        }}>
          <Image source={images.avatar} 
          style={{
            width: 55,
            height: 55,
          }}/>
        </TouchableOpacity>
        <View style={styles.WelcomeText}>
          <Text style={{...darkFONTS.h3}}>Welcome!</Text>
          <Text style={{...darkFONTS.body3}}>Alin Khatri</Text>
        </View>
        <TouchableOpacity 
        style={styles.notificationButton}
        onPress={() => {
          navigation.navigate('Profile')
        }}>
          <Image source={icons.notification} 
          style={{
            width: 25,
            height: 25,
          }}/>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: SIZES.padding
    },

    WelcomeSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    WelcomeText: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },

    notificationButton: {
        backgroundColor: COLORS.darkgray,
        width: 50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    }
})