import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function PageHeading({title}) {
    const navigation=useNavigation()
  return (
    <TouchableOpacity style={{
        display:'flex',flexDirection:'row',alignItems:'center',gap:10
      }} onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color='#a516f2' />
      <Text style={{fontSize:20,fontWeight:'bold',color:'#a516f2'}}>{title}</Text>
      </TouchableOpacity>
  )
}