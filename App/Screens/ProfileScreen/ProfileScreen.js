import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUser, useClerk } from '@clerk/clerk-react';
import HomeScreen from '../HomeScreen/HomeScreen';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen({ navigation }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      // After successful logout, you can navigate to the login screen or any other screen.
      // For example, you can use react-navigation for navigation.
      // Replace 'LoginScreen' with the appropriate screen name.
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout error if needed
    }
  };

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      onPress: () => navigation.navigate('home'), // Replace 'HomeScreen' with the appropriate screen name.
    },
    {
      id: 2,
      name: 'My Booking',
      icon: 'bookmark-sharp',
      onPress: () => navigation.navigate('Booking'), // Replace 'MyBookingScreen' with the appropriate screen name.
    },
    // {
    //   id: 3,
    //   name: 'Reach Us',
    //   icon: 'mail',
    //   onPress: () => navigation.navigate('ReachUsScreen'), // Replace 'ReachUsScreen' with the appropriate screen name.
    // },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
      onPress: handleLogout,
    },
  ];

  return (
    <ScrollView>
      {/* <StatusBar backgroundColor='#a516f2' barStyle="light-content" translucent={false} /> */}
      <View style={{ padding: 20, backgroundColor: '#a516f2',borderBottomLeftRadius:80,
    borderBottomRightRadius:80,
    }}>
        <Text style={{ fontSize: 24, fontFamily: 'Anta',color:'white' }}>Your Profile</Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Image source={{ uri: user.imageUrl }} style={{ width: 90, height: 90, borderRadius: 99 }} />
          <Text style={{ fontSize: 20, fontFamily: 'secondary', color: 'white', marginTop: 8 }}>{user.fullName}</Text>
          <Text style={{ fontSize: 16, fontFamily: 'secondary', color: 'yellow', marginTop: 8 }}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                margin: 20,
                paddingHorizontal: 70,
                backgroundColor:'white',
                padding:10,
                borderRadius:20,
                // alignSelf:'flex-start',
                elevation:15
              }}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon} size={44} color="#a516f2" />
              <Text style={{ fontSize: 20,color:'black' }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={{
          padding:20,textAlign:'center',marginTop:40,color:'grey'
        }}>Copyright ©2024 Veda's®. All rights reserved.</Text>
              <Text style={{
          padding:20,textAlign:'center',marginTop:40,color:'grey'
        }}>
        "For questions, suggestions, or anything else, feel free to reach out to us at vedapaulchowdhury@gmail.com. We'd love to hear from you! 🌸"</Text>
    </ScrollView>
  );
}
