import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defina o tipo RootStackParamList para corresponder às suas rotas
type RootStackParamList = {
  SplashScreen: undefined;
  initPage: undefined;
  Login: undefined;
  Sign: undefined;
  MapaPage: undefined;
  reportPage: undefined;
  photo: undefined;
  WelcomePage: undefined;
  EvalsPage: undefined;
  notifyPage: undefined;
  GamingPage: undefined;
  helpPage: undefined;
  ProfilePage: undefined;
  nearHospitalPage: undefined;
  configPage: undefined;
  ongPage: undefined;
  QuestionPage: undefined;
  CorretctA: undefined;
  WrongA: undefined;
  OutbreakPredictorPage: undefined;
};

// Crie um tipo para a navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Navigate to initPage after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('WelcomePage');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Main Africa Map Image */}
      <View style={styles.mapContainer}>
        <Image 
          source={require('../../assets/africa-map 1.png')} 
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
      
      {/* App Name */}
      <Text style={styles.appName}>MapaZZZ</Text>
      
      {/* Logo at bottom */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mapImage: {
    width: 250,
    height: 250,
    tintColor: '#800020', // Burgundy color as in the image
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#800020',
    marginVertical: 20,
    fontFamily: 'Poppins-Bold', // Using the Poppins font family from your existing app
  },
  logoContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    tintColor: '#800020', // Burgundy color as in the image
  },
});

export default SplashScreen;