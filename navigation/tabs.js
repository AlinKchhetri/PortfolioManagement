import React from "react";
import {
    Image,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Home, Portfolio, Profile, AddStock, Market } from "../screens"
import { COLORS, icons, SIZES } from "../constants"

const Tab = createBottomTabNavigator()


const Tabs = () => {
    return (
        <>
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    width: SIZES.width,
                    height: (SIZES.height*88)/SIZES.height,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: COLORS.white,
                    elevation: 0,
                    borderRadius: SIZES.padding*2,
                    opacity: 0.98,
                    shadowColor: COLORS.black,
                    shadowOpacity: 0.25,
                    shadowOffset:{width:0, height:1},
                    shadowRadius: 4
                }
            }}>
                {/* Adding Screens to tab navigator */}
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused? COLORS.blue: null,
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.portfolio}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused? COLORS.blue: null,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="AddStock"
                component={AddStock}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.addStock}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused? COLORS.blue: null,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.market}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused? COLORS.blue: null,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.profile}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused? COLORS.blue: null,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    </>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;