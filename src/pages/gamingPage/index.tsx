import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { ArrowLeft, Gamepad2 } from "lucide-react-native";
import { style } from "./style";
import logo from "../../assets/logo.png";
import welcomeImg from "../../assets/quizAlert.png"; // opcional: ilustração leve

const QuizPage = () => {
  const [answer, setAnswer] = useState("");
  const [modalVisible, setModalVisible] = useState(true);

  // Dica de boas-vindas
  const welcomeMessage =
    "Bem-vindo(a) ao Malária Quiz! Aqui você vai testar seus conhecimentos e aprender formas importantes de se proteger dessa doença.";

  const handleSubmit = () => {
    console.log("Resposta enviada:", answer);
    setAnswer(""); 
  };

  return (
    <View style={style.mainConteiner}>
      <View style={style.logoX}>
        <TouchableOpacity>
          <ArrowLeft size={30} color={'#7F1734'} />
        </TouchableOpacity>
        <Image source={logo} style={style.logoImg} />
      </View>

      <View style={style.quizContainer}>
        <View style={{ padding: 15, backgroundColor: '#dfdfdf', borderRadius: 50, elevation: 8 }}>
          <Gamepad2 size={40} color={'#7F1734'} />
        </View>
        <Text style={style.quizTitle}>Malária Quiz</Text>

        <View style={style.quizDivider}>
          <Text style={style.quizQuestion}>
          O João vive em uma zona em que seu quarto está perto de uma lixeira (ou esgoto), local que com certeza apresenta um grande risco de contágio da malária.{"\n"}{"\n"}Que ações João deveria tomar para evitar a malária?
          </Text>
        </View>

        <View style={style.inputContainer}>
          <TextInput
            style={style.textInput}
            placeholder="Digite sua resposta aqui..."
            value={answer}
            onChangeText={setAnswer}
          />
        </View>

        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
          <Text style={style.submitText}>Submeter</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE BOAS-VINDAS */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <View style={{ padding: 15, backgroundColor: '#dfdfdf', borderRadius: 50, elevation: 8, marginBottom: 15 }}>
          <Gamepad2 size={40} color={'#7F1734'} />
        </View>
            <Text style={style.modalText}>{welcomeMessage}</Text>
            <TouchableOpacity
              style={style.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={style.closeButtonText}>Começar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizPage;
