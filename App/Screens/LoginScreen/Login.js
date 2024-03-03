import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View
      style={{ alignItems: 'center' }}
    >

      <Image source={require('./../../../assets/images/final_logo.png')}
        style={styles.loginpage}
      ></Image>

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 30, textAlign: 'center', color: 'white', fontWeight: "bold" }}>
          As You Wish
        </Text>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
          We turn your dream to reality
        </Text>

        <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, marginTop: 30 }}>
          Best app for your plan and execution.
          You find everything how you desire.
          asyouwish: Your one-stop destination for personalized services tailored to match your every desire. Explore a world of convenience where your wishes are our top priority!
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ textAlign: 'center', color: '#a516f2', fontSize: 20 }}
            
          >
            Get Start</Text>
        </TouchableOpacity>

        <Text style={{
          padding:20,textAlign:'center',marginTop:40
        }}>Copyright ©2024 Veda's®. All rights reserved.</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  loginpage: {
    height: 300,
    width: 230,
    marginTop: 20,
  },
  subContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#a516f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    marginTop: -7,
    padding: 20
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 70,
    borderRadius: 20,

  }


})