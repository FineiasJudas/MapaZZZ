import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertProvider } from './src/pages/alertProvider/index';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Login from './src/pages/login';
import Sign from './src/pages/sign';
import MapaPage from './src/pages/mapPage';
import reportPage from './src/pages/reportPage';
import photo from './src/pages/photo';
import WelcomePage from './src/pages/welcomePage';
import EvalsPage from './src/pages/evalsPage';
import initPage from './src/pages/InitPage';
import notifyPage from './src/pages/notifyPage';
import GamingPage from './src/pages/gamingPage';
import helpPage from './src/pages/helpPage';
import nearHospitalPage from './src/pages/nearHospitalPage';

import { registerForPushNotificationsAsync } from './src/pages/manegeNotification/index';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log('Enviar token para o backend:', token);
      }
    });

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificação recebida:', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notificação clicada:', response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="nearHospitalPage">
            <Stack.Screen name="GamingPage" component={GamingPage} options={{ headerShown: false }} />
            <Stack.Screen name="notifyPage" component={notifyPage} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="initPage" component={initPage} options={{ headerShown: false }} />
            <Stack.Screen name="reportPage" component={reportPage} options={{ headerShown: false }} />
            <Stack.Screen name="photo" component={photo} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
            <Stack.Screen name="EvalsPage" component={EvalsPage} options={{ headerShown: false }} />
            <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
            <Stack.Screen name="MapaPage" component={MapaPage} options={{ headerShown: false }} />
            <Stack.Screen name="helpPage" component={helpPage} options={{ headerShown: false }} />
            <Stack.Screen name="nearHospitalPage" component={nearHospitalPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});