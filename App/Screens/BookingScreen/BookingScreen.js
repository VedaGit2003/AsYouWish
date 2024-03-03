import { View, Text,FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem';

export default function BookingScreen() {

const {user}=useUser();
const [bookingList,setBookingList]=useState([])
const [loading,setLoading]=useState(false)
useEffect(()=>{
  user&&getUserBookings()
},[user])


const getUserBookings=()=>{
  setLoading(true)
  GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress).then(resp=>{
       setBookingList(resp.bookings)
       setLoading(false)
  })
}

  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'Anta',fontSize:26}}>Your Bookings</Text>
      <Text style={{color:'grey',}}>
      "To cancel, click on your booking and sweetly message 'cancel' with the date and time of your booking. 🌟"</Text>
     <View>
      <FlatList data={bookingList}
      style={{marginBottom:120}}
      onRefresh={()=>getUserBookings()}
      refreshing={loading}
      renderItem={({item,index})=>(
       <BusinessListItem business={item?.businessList}
       booking={item}
       />
      )}
      />
     </View>
      
    </View>
  )
}