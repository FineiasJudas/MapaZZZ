import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  ArrowLeft,
  Feather,
  Frown,
  Gamepad2,
  HomeIcon,
  Smile,
} from "lucide-react-native";
import { style } from "./style";
import { useAlert } from "../alertProvider/index";
import logo from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
import { Menu } from "lucide-react-native";

const QuizPage = ({ navigation }: any) => {
  const { showAlert } = useAlert();
  const [logged, setLogged] = useState(false);
  const [answer, setAnswer] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [responseAlert, setResponseAlert] = useState(false);
  const [editorText, setEditorText] = useState(answer);
  const [question, setQuestion] = useState(
    "O servidor não conseguiu emitir nem uma mensagem, por favor tente mais tarde"
  );
  const [responseUser, setResponseUser] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const welcomeMessage =
    "Bem-vindo(a) ao Malária Quiz! Aqui você vai testar seus conhecimentos e aprender formas importantes de se proteger dessa doença.";

  const handleSubmit = () => {
    console.log("Resposta enviada:", answer);
    setResponseAlert(true);
    setAnswer("");
  };

  async function getResponse() {
    try {
      setLoadingResponse(true);
      const Token = await AsyncStorage.getItem("Token");
      if (!question || answer.length == 0) {
        await showAlert(
          "erro",
          "Precisas responder primeiro a questão",
          "Erro"
        );
        setLoadingResponse(false);
        return;
      }
      const response = await fetch(
        "https://mapazzz.onrender.com/api/game/get_response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
          body: JSON.stringify({
            problem: question,
            response: answer,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponseUser(data);
      } else if (response.status === 401 || response.status === 403) {
        await showAlert(
          "erro",
          "A tua sessão nessa conta expirou, tente logar novamente",
          "Erro"
        );
      } else {
        // console.log("Question"+ JSON.stringify(data));
        const message =
          data.error || "Erro na conexão, porfavor tente novamente";
        await showAlert("erro", message, "Erro");
      }
    } catch (error) {
      await showAlert(
        "erro",
        "Falha na conexão, verifique a sua internet",
        "Erro"
      );
    } finally {
      setLoadingResponse(false);
    }
  }

  async function getQuestion() {
    try {
      setLoadingQuestion(true);
      const Token = await AsyncStorage.getItem("Token");
      const response = await fetch(
        "https://mapazzz.onrender.com/api/game/get_question",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setQuestion(data.problem);
      } else if (response.status === 401 || response.status === 403) {
        await showAlert(
          "erro",
          "A tua sessão nessa conta expirou, tente logar novamente",
          "Erro"
        );
      } else {
        // console.log("Question"+ JSON.stringify(data));
        const message =
          data.error || "Erro na conexão, porfavor tente novamente";
        await showAlert("erro", message, "Erro");
      }
    } catch (error) {
      await showAlert(
        "erro",
        "Falha na conexão, verifique a sua internet",
        "Erro"
      );
    } finally {
      setLoadingQuestion(false);
    }
  }

  return (
    <View style={style.mainConteiner}>
      {/* Cabeçalho */}
      <View style={style.logoX}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("initPage");
          }}>
          <ArrowLeft size={30} color={"#7F1734"} />
        </TouchableOpacity>
        <Image source={logo} style={style.logoImg} />
      </View>

      <View style={style.quizContainer}>
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            borderRadius: 50,
            elevation: 4,
          }}>
          <Gamepad2 size={40} color={"#7F1734"} />
        </View>
        <Text style={style.quizTitle}>Malária Quiz</Text>

        <View style={style.quizDivider}>
          {loadingQuestion ? (
            <ActivityIndicator size="large" color="#7F1734" />
          ) : (
            <Text style={style.quizQuestion}>{question}</Text>
          )}
        </View>

        {/* Campo de resposta: inativo para edição direta; ao tocar, abre o modal editor */}
        <TouchableOpacity
          style={style.inputContainer}
          onPress={() => {
            setEditorText(answer); // inicia o editor com o texto atual
            setEditorVisible(true);
          }}>
          <TextInput
            placeholder="Escreva sua resposta aqui..."
            multiline
            numberOfLines={4}
            style={[style.textInput, { height: 100, textAlignVertical: "top" }]}
            value={answer}
            placeholderTextColor="#888"
            editable={false} // campo somente leitura
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={style.submitButton}
          onPress={async () => {
            handleSubmit();
            await getResponse();
          }}>
          <Text style={style.submitText}>Submeter</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Boas-Vindas */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <View
              style={{
                padding: 15,
                backgroundColor: "#fff",
                borderRadius: 50,
                elevation: 4,
                marginBottom: 15,
              }}>
              <Gamepad2 size={40} color={"#7F1734"} />
            </View>
            <Text style={style.modalText}>{welcomeMessage}</Text>
            <TouchableOpacity
              style={style.closeButton}
              onPress={async () => {
                await getQuestion();
                setModalVisible(false);
              }}>
              {loadingQuestion ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={style.closeButtonText}>Começar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Editor de Resposta */}
      <Modal
        visible={editorVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditorVisible(false)}>
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
                onPress={() => setEditorVisible(false)}>
                <Text style={style.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.saveButton}
                onPress={() => {
                  setAnswer(editorText);
                  setEditorVisible(false);
                }}>
                <Text style={style.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Editor de Resposta */}
      <Modal
        visible={responseAlert}
        transparent
        animationType="slide"
        onRequestClose={() => setEditorVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            {loadingResponse ? (
              <>
                <ActivityIndicator size="large" color="#7F1734" />
                <Text>Analisando a sua resposta...</Text>
              </>
            ) : (
              <>
                {responseUser?.is_right ? (
                  <>
                    <ConfettiCannon
                      count={200}
                      origin={{ x: -10, y: 0 }}
                      fadeOut
                    />
                    <Smile color="#77767B" />
                    <Text style={style.modalTitle}>Resposta Correta</Text>
                  </>
                ) : (
                  <>
                    <Frown color="#77767B" />

                    <Text style={style.modalTitle}>Resposta Incorreta</Text>
                  </>
                )}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}>
                  Recomendações
                </Text>
                <Text
                  style={{
                    textAlign: "justify",
                    fontWeight: "500",
                    margin: 10,
                  }}>
                  {responseUser?.recommendation}
                </Text>

                <View style={style.modalButtonContainer}>
                  <TouchableOpacity
                    style={style.saveButton}
                    onPress={async () => {
                      await getQuestion();
                      setResponseAlert(false);
                    }}>
                    {loadingQuestion ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={style.saveButtonText}>OK</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizPage;
