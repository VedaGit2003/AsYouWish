import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import BookNavigation from './BookNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor:'#a516f2'}}
        >
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tapBarLabel: ({ color, size }) => (
                        <Text style={{ color: color, fontSize: 22, marginTop: -7 }}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Booking" component={BookNavigation}
            options={{
                tapBarLabel: ({ color, size }) => (
                    <Text style={{ color: color, fontSize: 22, marginTop: -7 }}>Booking</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bookmark" size={size} color={color} />
                )
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tapBarLabel: ({ color, size }) => (
                    <Text style={{ color: color, fontSize: 22, marginTop: -7 }}>Profile</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="user-circle-o" size={size} color={color} />
                )
            }}
            />
           

        </Tab.Navigator>

    )
}