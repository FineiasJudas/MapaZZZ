import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Sign from './src/pages/sign';
import MapaPage from './src/pages/mapPage';
import reportPage from './src/pages/reportPage';
import photo from './src/pages/photo';
import WelcomePage from './src/pages/welcomePage';
import EvalsPage from './src/pages/evalsPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="Login" component={Login} options={{headerShown : false}} />
        <Stack.Screen name="reportPage" component={reportPage} options={{headerShown : false}} />
        <Stack.Screen name="photo" component={photo} options={{headerShown : false}} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown : false}} />
        <Stack.Screen name="EvalsPage" component={EvalsPage} options={{headerShown : false}} />
        <Stack.Screen name="Sign" component={Sign} options={{headerShown:false}} />
        <Stack.Screen name="MapaPage" component={MapaPage} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});