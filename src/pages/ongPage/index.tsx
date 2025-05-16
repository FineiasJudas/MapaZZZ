import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import { ArrowLeft } from "lucide-react-native";
import axios from "axios";
import { useAlert } from "../alertProvider/index";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HelperPage({ navigation }: any) {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [helpDescription, setHelpDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleSubmit = async () => {
    // Validate inputs
    if (!orgName.trim()) {
      showAlert("erro", "Por favor, insira o nome da organização.", "Erro");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert("erro", "Por favor, insira um email válido.", "Erro");
      return;
    }
    if (!helpDescription.trim()) {
      showAlert("erro", "Por favor, descreva como pode ajudar.", "Erro");
      return;
    }

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem("Token")
      const response = await fetch(
        "https://mapazzz.onrender.com/api/help/create",
        {
          method : "POST",
          body: JSON.stringify({
            name: orgName,
            email,
            kind: "helpOrganization",
            message: helpDescription,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      console.log(JSON.stringify(data))
      if (response.ok) {
        showAlert("sucesso", "Formulário enviado com sucesso!", "Sucesso");
        // Clear form
        setOrgName("");
        setEmail("");
        setHelpDescription("");
        // Optionally navigate back
        // navigation.navigate("MapaPage");

      } else  {
        console.log(JSON.stringify(data))
        showAlert("erro", data.errors[0].message, "Erro");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      showAlert(
        "erro",
        "Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.",
        "Erro"
      );
    } finally {
      setIsLoading(false);
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
    <KeyboardAvoidingView
      style={style.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() =>  navigation.goBack()}>
          <ArrowLeft color="#6D122C" size={30} />
        </TouchableOpacity>

        <Image
          onProgress={() => navigation.navigate("initPage")}
          source={Logo}
          style={style.imgLogo}
        />
      </View>
      {/* <ScrollView > */}
      <View style={style.content}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#6D122C",
            marginBottom: 20,
            marginLeft: 5,
          }}>
          Seja um apoiador
        </Text>
        <Text>
          Você pode ser um ajudador na luta contra a malária! Ao se juntar a
          nós, vai receber notificações sobre áreas de risco e como pode ajudar
          nessas regiões. Com pequenas ações, você pode fazer uma grande
          diferença.
        </Text>

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Nome da Organização</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={style.inputField}
            placeholderTextColor="#aaa"
            value={orgName}
            onChangeText={setOrgName}
          />
        </View>

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            style={style.inputField}
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Diga como Pode ajudar</Text>
          <TextInput
            placeholder="Conte com detalhes..."
            multiline
            numberOfLines={4}
            style={[
              style.inputField,
              { height: 100, textAlignVertical: "top" },
            ]}
            placeholderTextColor="#aaa"
            value={helpDescription}
            onChangeText={setHelpDescription}
            maxLength={500}
          />
          <Text style={{ fontSize: 12, color: "#aaa", textAlign: "right" }}>
            {helpDescription.length}/500
          </Text>
        </View>

        <TouchableOpacity
          style={[style.buttonEnviar, isLoading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={style.textEnviar}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
}
