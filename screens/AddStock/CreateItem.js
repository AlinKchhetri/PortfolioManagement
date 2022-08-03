import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect, RNDateTimePicker } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import GestureRecognizer from 'react-native-swipe-gestures';
import {db} from '../../components/Firebase/configexpo';
import { collection, deleteDoc, doc, getDoc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import SelectList from 'react-native-dropdown-select-list';
import SelectDropdown from 'react-native-select-dropdown';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import CheckBox from '@react-native-community/checkbox';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios'
import MyPortfolio from '../Portfolio/MyPortfolio';


import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'


const CreateItem = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [agree, setagree] = useState(false);

  const [gotDoc, setGotDoc] =useState(false);
  const [loaded, setLoaded] = useState(true);
  const [data,setData] = useState([]);
  const [selectedSymbol, SetSelectedSymbol] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [amountNow, setAmountNow] = useState('');
  const [investment, setInvestment] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [profitLoss, setProfitLoss] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [dateVisible, setDateVisible] = useState(true);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [dataItem, setDataItem] = useState([]);

    const ReadAll = () => {
        getDocs(collection(db, "Portfolio"))
        .then(docSnap => {
          let userPortfolio = [];
          docSnap.forEach((doc) => {
            userPortfolio.push({...doc.data(), id:Math.floor(Math.random() * Date.now())})
          });
          setDataItem(userPortfolio);
          
        })
      }

    
    
    useEffect(() => {
        ReadAll();
        
      }, [])



const showSymbol = () => {
    // axios.get("http://nepstockapi.herokuapp.com/")
    //         .then((response) => {
    //           setFilteredDataSource(response.data);
    //           setMasterDataSource(response.data);
    //           setLoaded(false)
    //           let newArray = response.data.map((item) => {
    //             return {key: item.Symbol, value: item.Symbol}
    //           }); 
    //           setData(newArray);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    axios.get("http://nepstockapi.herokuapp.com/")
            .then((response) => {
                setData(response.data);
                setLoaded(false)
            }).catch((error) => {
                console.log(error)
            })
}


const dateT = () =>{
  setDate(year + '/' + month + '/' + day);

  setInvestment(Math.floor(unit*amount));
  setCurrentValue(Math.floor(unit*amountNow));
  setProfitLoss((Math.floor(currentValue)-Math.floor(investment)));
}



useEffect(() => {
  showSymbol();
  dateT();


}, [])

 

    const Create = () => {
        const myDoc = collection(db, "Portfolio")
        getDocs(myDoc)
          .then (() => {
             setGotDoc(true);
        })
        .catch ((error) => {
          alert(error.message)
      })
    }

    useEffect(() => {
        Create();
      }, [])

    
      const Add = () => {
        const addStock = collection(db, "Portfolio")
    
        const docData = {
            "symbol": selectedSymbol,
            "transactionType": transactionType,
            "unit": unit,
            "price": amount,
            "date": date,
            "priceNow": amountNow,
            "investment": investment,
            "currentValue": currentValue,
            "profitLoss": profitLoss
        }
    
          addDoc(addStock, docData)
          .then (() => {
            alert("Document Created") 
        })
        .catch ((error) => {
          alert(error.message)
        })
      }

      const buysell = [
        'BUY' ,
        'SELL'
      ];


  return (
    <View style={styles.addStockContainer}>
        {/* <ScrollView> */}
          <View style={styles.header}>
              <Text style={{ ...darkFONTS.h4, padding: SIZES.padding }}>My Portfolio</Text>

              <TouchableOpacity
                  style={styles.addButton}
                  >
                  <Image source={icons.add}
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.black,
                          opacity: 0.5
                      }} />
              </TouchableOpacity>
          </View>

          {/* <GestureRecognizer
            style={{flex: 1}}> */}


      
        <View style={styles.modalStyle}>
          <View style={styles.modalHeader}>
            <Text style={{...darkFONTS.h4, padding: SIZES.padding}}>Add New Stock</Text>
            <TouchableOpacity onPress={() => {setModalVisible(!modalVisible); showSymbol()}}>
                <Image source={icons.add}
                style={{
                    width: 30,
                    height:30,
                    tintColor: COLORS.black,
                    opacity: 0.6,
                    transform: [{rotate: '45deg'}]
                }}/>
            </TouchableOpacity>
          </View>
          <View>
          { loaded? (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={40} color= '#000000' /></View>)
        : (<View style={styles.dropDown}>
            {/* <SelectList setSelected={setSelected} data={data}/> */}
            <SelectDropdown
            data={data}
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
        </View>)}
        <View style={styles. addForm}>
          <View style={styles.dropDown}>
        <SelectDropdown
          data={buysell}
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
              value={unit}
              onChangeText={(unit) => setUnit(unit)}
              placeholder='Total Units'
              placeholderTextColor='#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
            
            <TextInput
              value={amount}
              onChangeText={(amount) => setAmount(amount)}
              placeholder= 'Price'
              placeholderTextColor='#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
          </View>
          <View>
          <TextInput
              value={amountNow}
              onChangeText={(amountNow) => setAmountNow(amountNow)}
              placeholder= 'Current Price'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              style={styles.inputField} />
          
          <View style={{flexDirection: 'row'}}>
          <TextInput
              value={year}
              onChangeText={(year) => setYear(year)}
              placeholder= 'YYYY'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              style={styles.inputDateField} />
            
            <TextInput
              value={month}
              onChangeText={(month) => setMonth(month)}
              placeholder= 'MM'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              style={styles.inputDateField} />
            
            <TextInput
              value={day}
              onChangeText={(day) => {setDay(day);}}
              placeholder= 'DD'
              placeholderTextColor= '#696969'
              keyboardType='number-pad'
              style={styles.inputDateField} />
        </View>

        
          
        </View>
        <Pressable 
        onPressIn={() => dateT()}
        onPressOut = {() => Add()}
        onPress={()=>ReadAll()}
        style={{width: 60, height: 40, backgroundColor: 'blue', alignSelf: 'center', margin: 20}}><Text>Add</Text></Pressable>
          </View>
          </View>

        </View>
      <View>
      {
        dataItem.map((doc) => {
          return (
            <View key={doc.id}>
            {/* <Text>{doc.email}</Text>
            <Text>{doc.username}</Text> */}
            <TouchableOpacity style={styles.shareContainer}>
            <View style={{flex: 0.5}}>
                <Image source={icons.stock} style={{width:40, height: 40}} />
            </View>
            <View style={{flex: 0.9, justifyContent: 'center', padding: SIZES.base }}>
                <Text style={{...darkFONTS.h5}}>{doc.symbol}</Text>
                <Text style={{...darkFONTS.h5}}>{doc.transactionType}</Text>
            </View>
            <View style={styles.priceDiff}>
                <Text style={{...darkFONTS.h6}}>{doc.unit}</Text>
                <Text style={{...darkFONTS.h6}}>{doc.investment}</Text>
                <Text style={{...darkFONTS.h6}}>{doc.profitLoss}</Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={icons.up} style={{width: 15, height: 15}}/>
                  <Text style={{...darkFONTS.body4}}>{doc.price}</Text>
                  <Image source={icons.down} style={{width: 15, height: 15}}/>
                </View>
            </View>
        </TouchableOpacity>
            </View>
          )
        })
      }
      </View>
    </View>
  )
}

export default CreateItem

const styles = StyleSheet.create({
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

    modalStyle:{
      flex: 1,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      width: SIZES.width-50,
      height: SIZES.height-250,
      backgroundColor: COLORS.darkgray,
      margin: SIZES.padding,
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
    modalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
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
      paddingHorizontal: SIZES.padding,
      color: 'black',

      },
      inputDateField: {
        ...darkFONTS.body4,
        width: SIZES.width-340,
        height: 40,
        backgroundColor: COLORS.darkgray,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: SIZES.padding,
        margin: 3,
        paddingHorizontal: SIZES.padding,
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
      shareContainer:{
        width: SIZES.width - 50,
        height: (SIZES.height * 100) / SIZES.height,
        backgroundColor: COLORS.darkgray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: SIZES.padding,
        marginTop:SIZES.base,
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
        }
})