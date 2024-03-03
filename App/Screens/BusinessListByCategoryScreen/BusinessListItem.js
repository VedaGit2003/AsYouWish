import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function BusinessListItem({ business,booking }) {

  const navigation=useNavigation();

    return business&&(
    
        <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',
     {
        business:business
     }   
        )
        }>
            <Image source={{ uri: business?.images[0]?.url }}
                style={styles.image}
            />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{business?.name}</Text>
                <Text style={{ fontSize: 15, color: '#6912ff' }}>{business?.contactPerson}</Text>
           {!booking?.id?<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Entypo name="location" size={20} color='#6912ff' />
                    <Text style={{ fontSize: 15, color: 'grey' }}>{business?.address}</Text>
                </View>:
                <Text
                style={[{color:'white',padding:5,paddingHorizontal:10,
            textAlign:'center',borderRadius:15,alignSelf:'flex-start'
            },
        booking?.bookingStatus=='Completed'?{backgroundColor:'#1fad43'}:
        booking?.bookingStatus=='Booked'?{backgroundColor:'#ab33f5'}:
        booking?.bookingStatus=='Canceled'?{backgroundColor:'#f24444'}:
        booking?.bookingStatus=='InProgress'?{backgroundColor:'#000000'}:
        null
        ]}>{booking.bookingStatus}</Text>
                }

                {booking?.id?<Text
                style={{color:'grey',fontSize:18
            }}
                ><AntDesign name="calendar" size={24} color="black" />
                {booking?.date} at {booking?.time}</Text>:null}

                {/* {booking?.id?<Text
                style={[{color:'white',padding:5,paddingHorizontal:10,
            textAlign:'center',borderRadius:15,alignSelf:'flex-start'
            },
        booking?.bookingStatus=='Completed'?{backgroundColor:'#1fad43'}:
        booking?.bookingStatus=='Booked'?{backgroundColor:'#ab33f5'}:
        booking?.bookingStatus=='Canceled'?{backgroundColor:'#f24444'}:
        booking?.bookingStatus=='InProgress'?{backgroundColor:'#000000'}:
        null
        ]}>{booking.bookingStatus}</Text>:null} */}

            </View>
        </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        // elevation:15
    },
    subContainer: {
        display: 'flex',
        gap: 7

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15
    }
})