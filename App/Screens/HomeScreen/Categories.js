import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading';
import { useNavigation } from '@react-navigation/native';
export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [indexes,setIndexes]=useState(false)
  const navigation=useNavigation();
  
  function setshow(indexes){
  if (indexes){
      return 100}
  else{
    return 3
  }
  
  }

  useEffect(() => {
    getCategories()
  }, [])
  const getCategories = () => {
    GlobalApi.getCategories().then(resp => {
      // console.log(resp?.categories)
      setCategories(resp?.categories)
    })
  }
  return (
    <View style={{ marginTop: 10 }}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <Heading text={'Categories'}/>
      <TouchableOpacity onPress={()=>setIndexes(!indexes)}>
      <Text>View All</Text>
      </TouchableOpacity>
      </View>
      <FlatList
      style={{marginTop:7}}
        data={categories}
        numColumns={4}
        // horizontal={true}
        renderItem={({ item, index }) =>index<=setshow(indexes) && (
          <TouchableOpacity style={styles.container}
           onPress={()=>navigation.push('business-list',{category:item.name})}>
            <View style={styles.iconContainer}>
              <Image source={{ uri: item?.icon?.url }}
                style={{ width: 30, height: 30 }}
              ></Image>
            </View>
            <Text style={{fontWeight:'bold'}}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: '#e6e1e1',
    padding: 17,
    borderRadius: 99
  }
})