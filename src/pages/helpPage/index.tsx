import React, { useEffect } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions, BackHandler, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import { ArrowLeft } from "lucide-react-native";

export default function HelperPage({ navigation }: any) {
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() =>  navigation.goBack()}>
          <ArrowLeft color="#6D122C" size={35} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={style.content}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#6D122C", marginBottom: 20, marginLeft: 5 }}>
          Ajuda e Suporte
        </Text>

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Nome completo</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={style.inputField}
            placeholderTextColor="#aaa"
          />
          </View>
        

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Email</Text>
          <TextInput
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            style={style.inputField}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={style.boxInput}>
          <Text style={style.inputLabel}>Descreva o problema</Text>
          <TextInput
            placeholder="Conte com detalhes..."
            multiline
            numberOfLines={4}
            style={[style.inputField, { height: 100, textAlignVertical: "top" }]}
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={style.buttonEnviar}>
          <Text style={style.textEnviar}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
