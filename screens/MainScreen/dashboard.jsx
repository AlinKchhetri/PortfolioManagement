import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, lightFONTS, icons,  darkFONTS, SIZES } from '../../constants'

const DashboardCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View
        style={styles.dashboard}>
            <View style={styles.balanceSection}>
                <View>
                    <Text style={{...lightFONTS.h4}}>Current Balance</Text>
                    <Text style={{...lightFONTS.h2}}>{props.currentBalance}</Text>
                </View>
            </View>
            <View style={styles.unitSection}>
                <View style={styles. unitAmount}>
                    <Text style={{...lightFONTS.h6}}>Total Units</Text>
                    <Text style={{...lightFONTS.h5}}>{props.totalUnits}</Text>
                </View>
                <View style={styles.unitAmount}>
                    <Text style={{...lightFONTS.h6}}>Total Investment</Text>
                    <Text style={{...lightFONTS.h5}}>{props.totalInvestment}</Text>
                </View>
            </View>
            
            <View style={styles.profitLossSection}>
                <View style={styles.profitAmount}>
                    <Text style={{...lightFONTS.h5}}>Profit/Loss</Text>
                    <Text style={{...lightFONTS.h3}}>{props.profitLoss}</Text>
                </View>
                    <Image 
                    style={{
                        height: 20,
                        width: 20
                    }}
                    source={icons.up} 
                    />
            </View>
        </View>
      </View>
    </View>
  )
}

export default DashboardCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: SIZES.padding,
    },

    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
    },

    dashboard:{
        width: SIZES.width-50,
        height: (SIZES.height*190)/SIZES.height,
        borderRadius: SIZES.padding,
        backgroundColor: '#3570e8',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        padding: SIZES.padding

    },
    balanceSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: SIZES.padding
    },
    profitLossSection:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.base
    },
    profitAmount: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: SIZES.padding,

    },
    unitSection:{
        marginTop: SIZES.base-2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: SIZES.padding
    },
    unitAmount:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})