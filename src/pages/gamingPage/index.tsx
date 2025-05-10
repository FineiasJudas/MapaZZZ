import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar, Image, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Puzzle } from 'lucide-react-native';

const QuizStartScreen = ({ navigation }: any) => {

    useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true // Impede o comportamento padrão do botão voltar
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove() // Limpeza ao desmontar
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      
      {/* Exit Button */}
      <TouchableOpacity 
        style={styles.exitButton}
        onPress={() => navigation.navigate("initPage")}
      >
        <Text style={styles.exitText}>Sair</Text>
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Puzzle Icon */}
        <Puzzle color="#6D122C" size={45} />
        
        {/* Title */}
        <Text style={styles.title}>Jogue Connosco</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Acerte as perguntas do nosso Quiz educativo e acumule pontos para poder usá-los quando for preciso!
        </Text>
        
        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate("QuestionPage")}
        >
          <LinearGradient
            colors={['#6D122C', '#8A1538']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../../assets/quiz-background.png.png')} // Altere para o caminho correto
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  exitButton: {
    position: 'absolute',
    right: 14,
    borderWidth: 1,
    borderColor: '#6D122C',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: -80,
    width: '100%',
    height: 300,
  },
  exitText: {
    color: '#6D122C',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6F132C",
    marginBottom: 16,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 8,
    maxWidth: 350,
  },
  startButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '60%',
    maxWidth: 300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 70,
  },
  gradient: {
    paddingVertical: 10,
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
