import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, StatusBar, Image, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Puzzle, ReceiptEuro } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
const QuizStartScreen = ({ navigation }: any) => {

  const route = useRoute();

  const [questionAi, setQuestionAi] = useState("Carregando...");
  const [loading, setLoading] = useState(true);

  const get_question = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");

      if (!token) {
        ToastAndroid.show("Tente fazer login", ToastAndroid.LONG);
        navigation.navigate("Login");
        return;
      }
      const url = "https://mapazzz.onrender.com/api/game/get_question";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // <-- Adiciona o token aqui!
        }
      });

      const data = await response.json(); // <-- Adiciona await aqui

      if (response.ok) {
        // Aqui você pode salvar a pergunta no estado, etc.
        setLoading(false);
        return data.problem;
        // Exemplo: setQuestion(data);
      } else {
        if (response.status === 401 || response.status === 403) {
          ToastAndroid.show("Tente fazer login", ToastAndroid.LONG);
          navigation.navigate("Login");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: "Erro na conexão com servidor",
            position: 'top',
          });
        }
        setLoading(false);
        return "Tenta mais tarde...";
      }

    } catch (error) {
      console.error("Erro de rede:", error);
      Toast.show({
        type: 'error',
        text1: 'Sem conexão',
        text2: 'Você perdeu a conexão com a internet.',
        position: 'top',
      });
    }
    finally {
      setLoading(false);
    }
  };
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
        <Puzzle color="#6D122C" size={40} />

        {/* Title */}
        <Text style={styles.title}>Jogue Connosco</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Acerte as perguntas do nosso Quiz educativo e acumule pontos para poder usá-los quando for preciso!
        </Text>

        {/* Start Button */}

        {loading ? (
          <>
            <TouchableOpacity
              style={styles.startButton}
              onPress={async () => {
                const problem = await get_question();
                await AsyncStorage.setItem("Problem", problem)
                navigation.navigate("QuestionPage");
              }
              }
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
          </>
        ) : (
          <>
            <ActivityIndicator size="small" color="#6D122C" />
          </>
        )

        }

      </View>

      <Image
        source={require('../../assets/quiz-background.png.png')} // Altere para o caminho correto
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </SafeAreaView >
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
    paddingHorizontal: 12,
    paddingVertical: 4,
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
    fontSize: 14,
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
    color: "#6F132C",
    marginBottom: 16,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
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
    maxWidth: 250,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 90,
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