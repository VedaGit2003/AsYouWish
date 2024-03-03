import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider,SignedIn,SignedOut} from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
 
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Anta': require('./assets/fonts/Anta-Regular.ttf'),
    'secondary': require('./assets/fonts/ProtestRiot-Regular.ttf'),
  });
  return (
    <ClerkProvider
    tokenCache={tokenCache}
    publishableKey='pk_test_YmFsYW5jZWQtZWxrLTc0LmNsZXJrLmFjY291bnRzLmRldiQ'>
    <View style={styles.container}>
      
      <SignedIn>
      <NavigationContainer>
        <TabNavigation></TabNavigation>
      </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <Login/>
        </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff',
    paddingTop:40,
    marginLeft:0
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
