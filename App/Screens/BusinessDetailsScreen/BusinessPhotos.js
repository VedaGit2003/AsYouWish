import { View, Text, Image } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'
import { FlatList } from 'react-native-gesture-handler'

export default function BusinessPhotos({business}) {
  return (
    <View>
      <Heading text={'Our gallery'}/>
      <FlatList 
      numColumns={2}
      data={business.images}
      renderItem={({item})=>(
        <Image source={{uri:item?.url}} style={{width:'100%',flex:1,borderRadius:15,height:120,margin:4}}/>
      )}
      />
    </View>
  )
}