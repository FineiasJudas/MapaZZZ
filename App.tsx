import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertProvider } from './src/pages/alertProvider/index';
import * as Notifications from 'expo-notifications';
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
import { registerForPushNotificationsAsync } from './src/pages/manegeNotification/index';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Registrar para notificações push
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // Enviar o token para o backend (veja passo 2)
        console.log('Enviar token para o backend:', token);
      }
    });

    // Ouvinte para notificações recebidas com o app aberto
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notificação recebida:', notification);
      // Aqui você pode navegar para notifyPage se quiser, mas a notificação já aparece nativamente
    });

    // Ouvinte para quando o usuário interage com a notificação
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notificação clicada:', response);
      // Navegar para uma página específica, se necessário
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <AlertProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage">
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
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
});