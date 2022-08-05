import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator, KeyboardAvoidingView, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import MyStocks from '../Portfolio/MyStocks';
import { ScrollView } from 'react-native-virtualized-view';
import GestureRecognizer from 'react-native-swipe-gestures';
import {db} from '../../components/Firebase/configexpo';
import { collection, deleteDoc, doc, getDoc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios'
import {Transition, transition, Transitioning} from 'react-native-reanimated'


import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'
const Create = (props) => {

    const [selectedSymbol , SetSelectedSymbol ] = useState('');
    const [transactionType, setTransactionType] = useState('');
  return (
        <View style={styles.modalStyle}>
        <View style={styles.dropDown}>
            {/* <SelectList setSelected={setSelected} data={data}/> */}
            <SelectDropdown
            data={props.data}
            onSelect={(selectedItem, index) => {
              SetSelectedSymbol(selectedItem.Symbol)
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>{selectedSymbol ? selectedSymbol : 'Select Symbol' }</Text>
                    <Image source={icons.dropdown} style ={{height: 15, width: 15}}/>
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item.Symbol}</Text>
                </View>
              );
            }}
            search
            searchInputStyle={styles.dropdown3searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={COLORS.black}
            // renderSearchInputLeftIcon={() => {
            //   return <FontAwesome name={'search'} color={'#FFF'} size={18} />;
            // }}
          />
        </View>
        <View style={styles. addForm}>
          <View style={styles.dropDown}>
        <SelectDropdown
          data={props.buysell}
            onSelect={(selectedItem, index) => {
              setTransactionType(selectedItem);
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>{transactionType ? transactionType : 'BUY/SELL' }</Text>
                    <Image source={icons.dropdown} style ={{height: 15, width: 15}}/>
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item}</Text>
                </View>
              );
            }}
          />
          </View>
          <View>
            <TextInput
              value={props.unit}
              onChangeText={(unit) => setUnit(unit)}
              placeholder='Total Units'
              placeholderTextColor='#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
            
            <TextInput
              value={props.amount}
              onChangeText={(amount) => setAmount(amount)}
              placeholder= 'Price'
              placeholderTextColor='#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
          </View>
          <View>
          <TextInput
              value={props.amountNow}
              onChangeText={(amountNow) => {setAmountNow(amountNow)}}
              placeholder= 'Current Price'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SIZES.padding2}}>
          <TextInput
              value={props.year}
              onChangeText={(year) => setYear(year)}
              placeholder= 'YYYY'
              placeholderTextColor= '#696969'
              returnKeyType='send'
              keyboardType='number-pad'
              maxLength={4}
              style={styles.inputDateField} />
            
            <TextInput
              value={props.month}
              onChangeText={(month) => setMonth(month)}
              placeholder= 'MM'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              maxLength={2}
              style={styles.inputDateField} />
            
            <TextInput
              value={props.day}
              onChangeText={(day) => {setDay(day);}}
              placeholder= 'DD'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              maxLength={2}
              style={styles.inputDateField} />
        </View>

        
          
        </View>
          </View>
          </View>
  )
}

export default Create

const styles = StyleSheet.create({
    modalStyle:{
      flex: 1,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      width: SIZES.width-50,
      height: (SIZES.height*400)/SIZES.height,
      backgroundColor: COLORS.darkgray,
      paddingHorizontal: SIZES.padding,
      borderBottomLeftRadius: SIZES.padding,
      borderBottomRightRadius: SIZES.padding,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    modalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
      width: SIZES.width-50,
      height: (SIZES.height*50)/SIZES.height,
      backgroundColor: COLORS.darkgray,
      marginTop: SIZES.padding,
      paddingHorizontal: SIZES.padding,
      borderRadius: SIZES.padding,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    inputField: {
      ...darkFONTS.body4,
      width: SIZES.width-100,
      height: 40,
      backgroundColor: COLORS.darkgray,
      borderWidth: 1.5,
      borderColor: 'grey',
      borderRadius: SIZES.padding,
      margin: SIZES.padding,
      alignSelf: 'center',
      paddingHorizontal: SIZES.padding,
      color: 'black',

      },
      inputDateField: {
        ...darkFONTS.body4,
        alignSelf: 'center',
        width: 99,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkgray,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: SIZES.padding,
        paddingHorizontal: SIZES.base,
        color: 'black',
  
        },
    

    dropDown:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: SIZES.base
    },
    dropdown3BtnStyle: {
        width: SIZES.width-100,
        height: 40,
        backgroundColor: COLORS.darkgray,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: SIZES.padding
      },
      dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      dropdown3BtnTxt: {
        ...darkFONTS.body3,
        color: '#696969',
        marginHorizontal: SIZES.padding
      },
      dropdown3RowStyle: {
        backgroundColor: '#C1C3C5',
        borderBottomColor: '#C1C3C5',
        borderWidth: 1,
        borderColor: '#696969',
        height: 40,
      },
      dropdown3DropdownStyle: {
        backgroundColor: '#C1C3C5',
        borderRadius: SIZES.padding
      },
      dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZES.h5
      },
      dropdown3RowTxt: {
        ...darkFONTS.body3,
        marginHorizontal:SIZES.padding2
      },
      dropdown3searchInputStyleStyle: {
        ...darkFONTS.h5,
        backgroundColor: '#C1C3C5',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkgray
      },
      
        searchBar:{
          ...darkFONTS.h6,
          width: SIZES.width-50,
          height: 50,
          backgroundColor: COLORS.darkGray,
          borderColor: COLORS.darkgray,
          borderWidth:2,
          alignItems: 'center',
          margin: SIZES.base,
          paddingHorizontal: SIZES.padding,
          borderRadius: SIZES.padding,
        },
        priceDiff:{
            flex: 2,
            alignItems: 'flex-end',
            marginHorizontal: SIZES.base
        },

  unitSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.base
  },
  StockAdd: {
    width: SIZES.width-100, 
    height: 40, 
    borderRadius: SIZES.padding,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'center', 
    margin: SIZES.padding
  },
  StockAddText: {
    ...lightFONTS.body3
  }
})