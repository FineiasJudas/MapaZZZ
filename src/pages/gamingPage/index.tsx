import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from "react-native";
import { ArrowLeft, Gamepad2 } from "lucide-react-native";
import { style } from "./style";
import {useAlert} from "../alertProvider/index";
import logo from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

const QuizPage = ({ navigator }: any) =>  {
  const { showAlert } = useAlert();
  const [logged, setLogged] = useState(false)
  const [answer, setAnswer] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorText, setEditorText] = useState(answer);


  const welcomeMessage =
  "Bem-vindo(a) ao Malária Quiz! Aqui você vai testar seus conhecimentos e aprender formas importantes de se proteger dessa doença.";

  const handleSubmit = () => {
    console.log("Resposta enviada:", answer);
    setAnswer("");
  };

  return (
    <View style={style.mainConteiner}>
      {/* Cabeçalho */}
      <View style={style.logoX}>
        <TouchableOpacity onPress={async () => { navigator.navigate('initPage'); }}>
          <ArrowLeft size={30} color={"#7F1734"} />
        </TouchableOpacity>
        <Image source={logo} style={style.logoImg} />
      </View>

      <View style={style.quizContainer}>
        <View style={{ padding: 15, backgroundColor: "#dfdfdf", borderRadius: 50, elevation: 8 }}>
          <Gamepad2 size={40} color={"#7F1734"} />
        </View>
        <Text style={style.quizTitle}>Malária Quiz</Text>

        <View style={style.quizDivider}>
          <Text style={style.quizQuestion}>
            O João vive em uma zona em que seu quarto está perto de uma lixeira (ou esgoto), local que com certeza apresenta um grande risco de contágio da malária.{"\n\n"}
            Que ações João deveria tomar para evitar a malária?
          </Text>
        </View>

        {/* Campo de resposta: inativo para edição direta; ao tocar, abre o modal editor */}
        <TouchableOpacity
          style={style.inputContainer}
          onPress={() => {
            setEditorText(answer); // inicia o editor com o texto atual
            setEditorVisible(true);
          }}
        >
          <TextInput
            style={style.textInput}
            placeholder="Digite sua resposta aqui..."
            value={answer}
            placeholderTextColor="#888"
            editable={false} // campo somente leitura
          />
        </TouchableOpacity>

        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
          <Text style={style.submitText}>Submeter</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Boas-Vindas */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <View
              style={{
                padding: 15,
                backgroundColor: "#dfdfdf",
                borderRadius: 50,
                elevation: 8,
                marginBottom: 15,
              }}
            >
              <Gamepad2 size={40} color={"#7F1734"} />
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

      {/* Modal Editor de Resposta */}
      <Modal
        visible={editorVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditorVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <Text style={style.modalTitle}>Editor de Resposta</Text>
            <TextInput
              style={style.editorTextInput}
              multiline
              value={editorText}
              onChangeText={setEditorText}
              placeholder="Digite sua resposta..."
              placeholderTextColor="#888"
            />
            <View style={style.modalButtonContainer}>
              <TouchableOpacity
                style={style.cancelButton}
                onPress={() => setEditorVisible(false)}
              >
                <Text style={style.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.saveButton}
                onPress={() => {
                  setAnswer(editorText);
                  setEditorVisible(false);
                }}
              >
                <Text style={style.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizPage;