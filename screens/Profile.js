import React, {useState, useCallback} from 'react';
import { Image, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { COLORS, icons, SIZES, images, darkFONTS } from '../constants'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const UI = (props) => {
  return (
    <View style={styles.infoCard}>
      <View style={styles.iconCard}>
        <Image source={props.icon} style={{width: 20, height: 20}}/>
      </View>
      <View style={styles.textCard}>
        <Text style={{...darkFONTS.h5}}>{props.title}</Text>
        <Text style={{...darkFONTS.body5}}>{props.titleInfo}</Text>
      </View>
      <View style={styles.gotoCard}>
        <Image source={props.goto} style={{width: 10, height: 10}}/>
      </View>
    </View>
  )
}

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden = {false} barStyle = 'dark-content' />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style = {styles.avatarSection}>
          <Text style= {{...darkFONTS.h4}}>My Profile</Text>
           <ImageBackground source={images.avatar}  style={styles.avatar}>
            <View  style = {styles.editIcon}>
              <Image source={icons.edit} style={{width: 13, height: 13, opacity: 0.7}}/>
            </View>
           </ImageBackground>
           <Text style={{...darkFONTS.h4, margin: SIZES.base}}>Alin Khatri</Text>
           {/* <Text style={{...darkFONTS.body4}}>9800000000</Text>
           <Text style={{...darkFONTS.body4}}>alinkhatri@gmail.com</Text> */}
           <Pressable style={styles.editProfileButton}>
              <Text style={{...darkFONTS.body4, color: COLORS.blue, paddingHorizontal: 5}}>Edit Profile</Text>
            </Pressable>
          <View>
            <View style={styles.infoSection}>
              <UI 
                icon = {icons.profile}
                title="My Account"
                titleInfo = "Make changes to your account"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
  avatarSection : {
    flex: 1,
    justifyContent: 'flex-start',
    margin: SIZES.padding2,
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: SIZES.padding,
  },
  editIcon: {
    width:25,
    height: 25,
    top: 50,
    left: 58,
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    width: SIZES.width - 50,
    height: (SIZES.height * 350) / SIZES.height,
    backgroundColor: COLORS.darkgray,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  }
});

export default Profile;