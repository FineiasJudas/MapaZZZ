import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CheckCheck, Puzzle } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const QuizQuestionScreen = ({ navigation }: any) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  
  const handleResponder = () => {
    setInputVisible(true);
  };

  const handleSubmit = () => {
    // Logic to handle submission and move to next question
    console.log("Answer submitted:", answer);
    // Check answer and navigate to next question
    // navigation.navigate("NextQuestion");
  };

  const handleCancel = () => {
    setInputVisible(false);
    setAnswer("");
  };

  const handleSkip = () => {
    // Logic to skip this question
    console.log("Question skipped");
    // navigation.navigate("NextQuestion");
  };

  const handleExit = () => {
    // Logic to exit the quiz
    console.log("Exiting quiz");
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Top wavy background with overlaid elements */}
        <View style={styles.topBackgroundContainer}>
          <Image source={require("../../../assets/topNav.png")} style={styles.topBackground} />
          
          {/* Overlay content on top of the background image */}
          <View style={styles.topContentOverlay}>
            {/* Logo/Puzzle icon */}
            <Puzzle size={40} color="#FFFFFF" style={styles.puzzleIcon} />

            {/* Exit button */}
            <TouchableOpacity onPress={() => navigation.navigate("GamingPage")}
             style={styles.exitButton}>
              <Text style={styles.exitText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Question content */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Questão 1</Text>
          <Text style={styles.questionText}>
            Qual o animal que mais alimenta-se de mosquitos, ajudando a reduzir a sua proliferação
          </Text>
        </View>

        {/* Answer input section */}
        {!inputVisible ? (
          <View style={styles.responderContainer}>
            <TouchableOpacity 
              style={styles.responderButton}
              onPress={handleResponder}
            >
              <Text style={styles.responderText}>Responder</Text>
               <CheckCheck size={25} color={'white'}
               
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <View style={styles.cancelHeaderContainer}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder="Escreva sua mensagem..."
              placeholderTextColor="#FFFFFF80"
              value={answer}
              onChangeText={setAnswer}
              multiline
              autoFocus
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleSkip}>
                <Text style={styles.buttonText}>Pular</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBackgroundContainer: {
    height: height * 0.25,
    position: 'relative',
  },
  topBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  puzzleIcon: {
    marginTop: 20,
  },
  exitButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  exitText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  questionContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: -5,
  },
  questionNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6F132C",
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
    color: "#333333",
    lineHeight: 30,
  },
  responderContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  responderButton: {
    backgroundColor: "#6F132C",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  responderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginRight: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6F132C",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
  },
  cancelHeaderContainer: {
    alignItems: "flex-end",
    marginBottom: 8,
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#FFFFFF",
    padding: 15,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    flex: 0.48,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default QuizQuestionScreen;