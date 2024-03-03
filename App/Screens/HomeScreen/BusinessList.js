import { View, Text, FlatList,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall'

export default function BusinessList() {
   const [businessList,setBusinessList]=useState([])
   
    useEffect(()=>{
        getBusinessList();
    },[])
   
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(resp => {
            
            setBusinessList(resp.businessLists)
        })
    }
    return (
        <ScrollView style={{ marginTop: 10 }}>
            <Heading text={'Business List'}/>
            <FlatList
            style={{marginTop:3}}
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <View style={{marginRight:10}}>
                    <BusinessListItemSmall business={item}/>
                </View>
            )}
            />
        </ScrollView>
    )
}