import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen'

export default function BookNavigation() {
    const Stack=createStackNavigator()
  return (
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name='booking' component={BookingScreen}/>
<Stack.Screen name='business-detail' component={BusinessDetailsScreen}/>
</Stack.Navigator>
  )
}