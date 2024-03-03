import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ onSearch }) {
  const { user, isLoading } = useUser();
  const [searchText, setSearchText] = useState('');
  const navigation=useNavigation()

  const handleChangeText = (text) => {
    setSearchText(text);
  };

  const handleSearchPress = () => {
    // Call onSearch prop with the current search text
    onSearch(searchText);
  };

  return user && (
    <View style={styles.container}>
      {/* ProfileSection */}
      <View style={styles.profileMainContainer}>
        <TouchableOpacity style={styles.profileContainer} onPress={()=>navigation.navigate('Profile')}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
          <View>
            <Text style={{ color: 'white' }}>Welcome</Text>
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'secondary' }}>{user?.fullName}</Text>
          </View>
        </TouchableOpacity>
        {/* <FontAwesome name="bookmark" size={30} color="white" /> */}
      </View>
      {/* Searchbar Section */}
      <View style={styles.searchbarContainer}>
        <TextInput
          placeholder='Explore our categories.'
          style={styles.textInput}
          value={searchText}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity style={styles.searchbtn} onPress={handleSearchPress}>
          <FontAwesome name="search" size={24} color='#a516f2' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#a516f2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  searchbarContainer: {
    marginTop: 15,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    width: '85%',
    fontSize: 20,
    borderRadius: 15
  },
  searchbtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 50
  }
});
