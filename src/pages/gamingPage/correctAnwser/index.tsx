import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, Puzzle } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CorrectAnwswerScreen = ({ navigation }: any) => {
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
      onPress={() => navigation.navigate("GamingPage")}
      style={styles.exitButton}>
        <Text style={styles.exitText}>voltar</Text>
      </TouchableOpacity>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Puzzle Icon */}
        <Gift color="#177E51" size={40} />

        {/* Title */}
        <Text style={styles.title}>Resposta certa!</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{recommendation}</Text>
      </View>
  


      <Puzzle size={35} color="#FFFFFF" style={{}} />
      <Image
        source={require("../../../assets/buttonGreen.png")} // Altere para o caminho correto
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  exitButton: {
    position: "absolute",
    right: 14,
    borderWidth: 1,
    borderColor: "#6D122C",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 20,
  },
  backgroundImage: {
    position: "absolute",
    bottom: -40,
    width: "100%",
    height: 300,
  },
  exitText: {
    color: "#6D122C",
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#177E51",
    marginBottom: 8,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#177E51",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 100,
    paddingHorizontal: 8,
    maxWidth: 350,
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  startButton: {
    borderRadius: 8,
    overflow: "hidden",
    width: "60%",
    maxWidth: 300,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 140,
  },
});

export default CorrectAnwswerScreen;
