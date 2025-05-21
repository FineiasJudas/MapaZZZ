import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartCrack, Puzzle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizStartScreen = ({ navigation }: any) => {

  const [recommendation, setRecommendation] = useState(
      "Sem recomendações de momento..."
    );
  
    useEffect(() => {
      (async () => {
        const res = await AsyncStorage.getItem("recommendation");
        if (res) setRecommendation(res);
      })();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      
      {/* Exit Button */}
      <TouchableOpacity 
        style={styles.exitButton}
        onPress={() => navigation.navigate("GamingPage")}
      >
        <Text style={styles.exitText}>voltar</Text>
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Puzzle Icon */}
        <HeartCrack  color="#f5f5f5" size={40} />
        
        {/* Title */}
        <Text style={styles.title}>Resposta errada!</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {recommendation}
        </Text>
        
        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate("QuestionPage")}
        >
          <LinearGradient
            colors={['#242D29', '#242D29']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Repetir</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../../../assets/buttonBlack.png')} // Altere para o caminho correto
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  exitButton: {
    position: 'absolute',
    right: 14,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: -55,
    width: '100%',
    height: 300,
  },
  exitText: {
    color: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginBottom: 8,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#dfdfdf',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 8,
    maxWidth: 350,
  },
  startButton: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '60%',
    maxWidth: 300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 140,
  },
  gradient: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default QuizStartScreen;