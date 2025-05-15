import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { AlertProvider } from './src/pages/alertProvider/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';

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
import ProfilePage from './src/pages/profilePage';
import nearHospitalPage from './src/pages/nearHospitalPage';
import configPage from './src/pages/configPage';
import ongPage from './src/pages/ongPage';
import QuestionPage from './src/pages/gamingPage/questionPage';
import CorretctA from './src/pages/gamingPage/correctAnwser';
import WrongA from './src/pages/gamingPage/wrongAnwser';
import OutbreakPredictorPage from './src/pages/outbreakPredictorPage';
import SplashScreen from './src/pages/splashScreen';

import { registerForPushNotificationsAsync } from './src/pages/manegeNotification/index';
import { Import } from 'lucide-react-native';

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
       <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <AlertProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomePage">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QuestionPage" component={QuestionPage} options={{ headerShown: false }} />
            <Stack.Screen name="GamingPage" component={GamingPage} options={{ headerShown: false }} />
            <Stack.Screen name="CorretctA" component={CorretctA} options={{ headerShown: false }} />
            <Stack.Screen name="WrongA" component={WrongA} options={{ headerShown: false }} />
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
            <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name="OutbreakPredictorPage" component={OutbreakPredictorPage} options={{ headerShown: false }} />
            <Stack.Screen name="nearHospitalPage" component={nearHospitalPage} options={{ headerShown: false }} />
            <Stack.Screen name="configPage" component={configPage} options={{ headerShown: false }} />
            <Stack.Screen name="ongPage" component={ongPage} options={{ headerShown: false }} />
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
