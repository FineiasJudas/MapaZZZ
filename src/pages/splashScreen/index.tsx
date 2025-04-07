// @ts-ignore
import { useNavigation } from '@react-navigation/native';
import { style } from './style';
import React, { useEffect } from 'react';
import splash from '../../assets/splash.png';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // ou o nome da tela principal
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={splash}
      style={style.background}
      resizeMode="cover"
    >
      <View style={style.overlay}>
        <Text style={style.title}>Bem-vindo ao App</Text>
        <Text style={style.subtitle}>Mapa zzZ</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
