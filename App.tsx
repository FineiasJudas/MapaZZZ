import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Login from './src/pages/login';
import Sign from './src/pages/sign';
import MapaPage from './src/pages/mapPage';
import RegisterRiskZone from './src/pages/reportPage'
import EvalsPage from './src/pages/evalsPage';
import NotifyPage from './src/pages/notifyPage';
import WelcomePage from './src/pages/welcomePage';
import { useEffect } from 'react';

// Impede que o splash seja escondido automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    async function prepare() {
      // Realize quaisquer tarefas necessárias antes de renderizar a app,
      // como carregar fontes, dados, etc.
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula um delay de 2 segundos
      // Quando estiver tudo pronto, esconda o splash screen
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <WelcomePage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});