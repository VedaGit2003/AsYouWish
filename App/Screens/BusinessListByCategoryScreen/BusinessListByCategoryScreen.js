import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import { FlatList } from 'react-native-gesture-handler';
import BusinessListItem from './BusinessListItem';

export default function BusinessListByCategoryScreen() {
  const param=useRoute().params;
  const navigation=useNavigation();

  const [businessList,setBusinessList]=useState([])
  useEffect(()=>{
   param&&getBusinessByCategory()
  },[param])
// fetch-category
 const getBusinessByCategory=()=>{
  GlobalApi.getBusinessListByCategory(param.category)
  .then(resp=>{
    setBusinessList(resp.businessLists)
  })
 }

  return (
    <View style={{padding:20,paddingTop:30}}>
      <TouchableOpacity style={{
        display:'flex',flexDirection:'row',alignItems:'center',gap:10
      }} onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color='#a516f2' />
      <Text style={{fontSize:20,fontWeight:'bold',color:'#a516f2'}}>{param?.category}</Text>
      </TouchableOpacity>

      {businessList?.length>0?<FlatList
      style={{marginTop:15}}
      data={businessList}
      renderItem={({item,index})=>(
        <BusinessListItem business={item}/>
      )}
      />:
      <Text style={{
        fontFamily:'secondary',fontSize:20,textAlign:'center',
        marginTop:'50%',color:'#cbbae8'}}>
          Oops! No records found. Keep smiling, though – better things are on the way! 😊</Text>}
      
    </View>
  )
}