import { View, Text,TouchableOpacity,StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PageHeading from '../../Components/PageHeading'
import CalendarPicker from "react-native-calendar-picker";
import Heading from '../../Components/Heading';
import { FlatList } from 'react-native-gesture-handler';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment'

export default function BookingModal({businessId,hideModal}) {

const [timeList,setTimeList]=useState()
const [selectedTime,setSelectedTime]=useState()
const [selectedDate,setSelectedDate]=useState()
const [notes,setNote]=useState()
const {user}=useUser();
    useEffect(()=>{
        getTime();
    },[])
const getTime=()=>{
    const timeList=[];
    for (let i=8;i<=12;i++){
        timeList.push({
            time:i+':00 AM'
        })
        timeList.push({
            time:i+':30 AM'
        })
    }
    for (let i=1;i<=7;i++){
        timeList.push({
            time:i+':00 PM'
        })
        timeList.push({
            time:i+':30 PM'
        })
    }
    setTimeList(timeList)
}

const createNewBooking = async () => {
    if (!selectedTime || !selectedDate) {
        ToastAndroid.show('Please Select Date and Time', ToastAndroid.LONG);
        return;
    }

    const data = {
        userName: user?.fullName,
        userEmail: user?.primaryEmailAddress.emailAddress,
        time: selectedTime,
        date:moment(selectedDate).format('DD-MM-YYYY'),
        businessId: businessId,
        note:notes
    };

    try {
        const resp = await GlobalApi.createBooking(data);
        console.log("Resp", resp);
        ToastAndroid.show('Booking Created Successfully!.If you want to cancle booking message us',
         ToastAndroid.LONG);
        hideModal();
    } catch (error) {
        console.error("Error creating booking:", error);
        // Handle the error or show an error message
        ToastAndroid.show('Error creating booking', ToastAndroid.LONG);
    }
};

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
          <TouchableOpacity style={{
        display:'flex',flexDirection:'row',alignItems:'center',gap:10
      }} onPress={()=>hideModal()}>
      <Ionicons name="arrow-back" size={24} color='#a516f2' />
      <Text style={{fontSize:20,fontWeight:'bold',color:'#a516f2'}}>Booking Details</Text>
      </TouchableOpacity>

      {/* calender secction */}
      <Heading text={'Select Date'}/>
      <View style={styles.calendarContainer}>
      <CalendarPicker onDateChange={setSelectedDate}
      width={340}
      minDate={Date.now()}
      todayBackgroundColor='black'
      todayTextStyle={{color:'white'}}
      selectedDayColor='#a516f2'
      selectedDayTextColor='white'
      />
      </View>
{/* TIME */}
      <View style={{marginTop:20,marginBottom:20}}>
        <Heading text={'Select Time Slot'}/>
         <FlatList 
         style={{marginTop:10}}
         data={timeList}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({item,index})=>(
            <TouchableOpacity style={{marginRight:10}}
            onPress={()=>setSelectedTime(item.time)}
            >
                <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
            </TouchableOpacity>
         )}
         />
      </View>


      {/* Note Section */}
      <View>
        <Heading text={'Suggestion Note'}/>
        <TextInput placeholder='Notes'
         multiline={true}  numberOfLines={5} onChangeText={(text)=>setNote(text)}
        style={styles.note}/>
      </View>
{/* Confirm Booking  */}

<TouchableOpacity style={{elevation:7,marginTop:15}}
onPress={()=>createNewBooking()}
>
    <Text style={styles.confirmBtn}>Confirm Booking</Text>
</TouchableOpacity>

    </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    calendarContainer:{
        padding:20,
        backgroundColor:'#daa0fa',
        borderRadius:15,
        marginTop:10
    },
    selectedTime:{
        padding:5,
        borderWidth:1,
        borderColor:'black',
        borderRadius:99,
        paddingHorizontal:18,
        color:'white',
        backgroundColor:'#a516f2'

    },
    unSelectedTime:{
        padding:5,
        borderWidth:1,
        borderColor:'black',
        borderRadius:99,
        paddingHorizontal:18,
        color:'#a516f2'
    },
    note:{
        marginTop:10,
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:16
    },
    confirmBtn:{
        backgroundColor:'#a516f2',
        padding:20,
        marginTop:10,
        borderRadius:50,
        color:'yellow',
        textAlign:'center',
        fontSize:20,
        fontFamily:'secondary',
        
    }
})