import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,  darkFONTS, icons, images, SIZES } from '../../constants'

const HomeHeader = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.WelcomeSection}>
        <TouchableOpacity 
        style={{flex: 0.7}}
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
        <View style={styles.notificationButton}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          navigation.navigate('Profile')
        }}>
          <Image source={icons.notification} 
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.black,
            opacity: 0.5,
            backgroundColor: COLORS.darkgray,
            borderRadius: 25,
          }}/>
        </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        padding: SIZES.padding
    },

    WelcomeSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    WelcomeText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    notificationButton: {
      flex: 1.8,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      
        
    },
})