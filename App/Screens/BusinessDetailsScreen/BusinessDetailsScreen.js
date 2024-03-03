import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import { ScrollView } from 'react-native-gesture-handler';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
    const param = useRoute().params;
    const [business, setBusiness] = useState(param.business)
    const [isReadMore, setReadMore] = useState(false)
    const[showModal,setShowModal]=useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        console.log(param?.business)
    }, [])

const onMessageBtnClick=()=>{
    Linking.openURL('mailto:'+business?.email+"?subject=I am looking for your service&body=Hey,")
}

    return business && (
        <View>
            <ScrollView style={{ height: '89%' }}>
                <Image source={{ uri: business?.images[0]?.url }}
                    style={{ height: 250, width: '100%' }}
                />
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={27} color='#a516f2' />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text style={{ fontFamily: 'Anta', fontSize: 25 }}>{business?.name}</Text>
                    <View style={styles.subContainer}>
                        <Text style={{ color: '#6912ff', fontSize: 20 }}>{business?.contactPerson}🌟🌟</Text>
                        <Text style={{
                            color: '#6912ff', padding: 5, backgroundColor: '#dccef5', fontSize: 14,
                            borderRadius: 5
                        }}>{business?.category?.name}</Text> 
                    </View>
    
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Entypo name="location" size={24} color='#6912ff' />
                        <Text style={{ fontSize: 19, }}>{business?.address}</Text>
                    </View>
                    <View style={{
                        borderWidth: 0.4, borderColor: 'grey',
                        marginTop: 20, marginBottom: 10
                    }}></View>
    
                    <View>
                        <Heading text={'About'} />
                        <Text style={{
                            color: 'grey', fontSize: 16, lineHeight: 28
                        }} numberOfLines={isReadMore ? 20 : 5}>{business?.about}</Text>
                        <TouchableOpacity onPress={() => setReadMore(!isReadMore)}>
                            <Text style={{ color: '#a516f2', }}>{isReadMore ? 'Read less' : 'Read More'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderWidth: 0.4, borderColor: 'grey',
                        marginTop: 20, marginBottom: 10
                    }}></View>
    
                    <BusinessPhotos business={business} />
    
                    <View style={{
                        borderWidth: 0.4, borderColor: 'grey',
                        marginTop: 20, marginBottom: 10
                    }}></View>
                </View>
            </ScrollView>
            <View style={{
                display: 'flex', flexDirection: 'row', margin: 5, gap: 8
            }}>
                <TouchableOpacity style={styles.message} onPress={()=>onMessageBtnClick()}><Text
                    style={{
                        textAlign: 'center',
                        fontFamily: 'Anta',
                        color: '#a516f2',
                        fontSize: 18
                    }}
                >Message</Text></TouchableOpacity>
    
                <TouchableOpacity style={styles.bookingbtn}
                    onPress={() => setShowModal(true)}
                ><Text
                    style={{
                        textAlign: 'center',
                        fontFamily: 'Anta',
                        color: 'white',
                        fontSize: 18
                    }}
                >Book Now</Text>
                </TouchableOpacity>
            </View>
            {/* BOOKING MODAL */}
            <Modal
                animationType='slide'
                visible={showModal}
            >
                <BookingModal
                    businessId={business?.id} 
                    hideModal={() => setShowModal(false)} />
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    backBtnContainer: {
        position: 'absolute',
        margin: 10,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 50
    },
    infoContainer: {
        padding: 20,
        display: 'flex',
        gap: 7
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    message: {
        backgroundColor: 'white',
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 99,
        flex: 1
    },
    bookingbtn: {
        backgroundColor: '#a516f2',
        padding: 15,
        borderColor: '#a516f2',
        borderWidth: 1,
        borderRadius: 99,
        flex: 1
    }

})