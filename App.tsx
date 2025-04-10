import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login';
import Sign from './src/pages/sign';
import MapaPage from './src/pages/mapPage';
import reportPage from './src/pages/reportPage';
import photo from './src/pages/photo';
import WelcomePage from './src/pages/welcomePage';
import EvalsPage from './src/pages/evalsPage';
import NotifyPage from './src/pages/notifyPage';
import initPage from './src/pages/InitPage';
import { AlertProvider } from './src/pages/alertProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AlertProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage">
          <Stack.Screen name="NotifyPage" component={NotifyPage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="initPage" component={initPage} options={{ headerShown: false }} />
          <Stack.Screen name="reportPage" component={reportPage} options={{ headerShown: false }} />
          <Stack.Screen name="photo" component={photo} options={{ headerShown: false }} />
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
          <Stack.Screen name="EvalsPage" component={EvalsPage} options={{ headerShown: false }} />
          <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
          <Stack.Screen name="MapaPage" component={MapaPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
})