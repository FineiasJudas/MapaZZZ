import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Sign from './src/pages/sign';
import MapaPage from './src/pages/mapPage';
import RegisterRiskZone from './src/pages/reportPage'
import EvalsPage from './src/pages/evalsPage';
import NotifyPage from './src/pages/notifyPage';
import WelcomePage from './src/pages/welcomePage';

export default function App() {
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