import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Home, Portfolio, Profile, Reels, Shop} from "../screens"
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
                    height: (SIZES.height*84)/SIZES.height,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#000',
                    elevation: 0
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Portfolio}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Reels"
                component={Reels}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.reels}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Shop"
                component={Shop}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.shop}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={icons.profile}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25
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