import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, lightFONTS, icons,  darkFONTS, SIZES } from '../../constants'

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
      <Text style={{...darkFONTS.h3, padding: SIZES.padding}}>Dashboard</Text>
        <View style={styles.dashboard}>
            <View style={styles.balanceSection}>
                    <Text style={{...lightFONTS.h4}}>Current Balance</Text>
                    <Text style={{...lightFONTS.h2}}>50,000</Text>
            </View>
            <View style={styles.unitSection}>
                <View style={styles. unitAmount}>
                    <Text style={{...lightFONTS.h6}}>Total Units</Text>
                    <Text style={{...lightFONTS.h5}}>100</Text>
                </View>
                <View style={styles.unitAmount}>
                    <Text style={{...lightFONTS.h6}}>Total Investment</Text>
                    <Text style={{...lightFONTS.h5}}>10,000</Text>
                </View>
            </View>
            
            
            <View style={styles.profitLossSection}>
                <View style={styles.profitAmount}>
                    <Text style={{...lightFONTS.h5}}>Profit/Loss</Text>
                    <Text style={{...lightFONTS.h3}}>40,000</Text>
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

export default Dashboard

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
        backgroundColor: COLORS.blue,
        borderRadius: SIZES.padding,
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
        flexDirection: 'column',
        justifyContent: 'center',
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