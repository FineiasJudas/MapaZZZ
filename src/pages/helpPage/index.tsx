import React from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import { ArrowLeft } from "lucide-react-native";

export default function MenuBar({ navigation }: any) {
  return (
    <KeyboardAvoidingView
      style={style.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#7f1734" size={30} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <ScrollView style={style.content} contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#7f1734", marginBottom: 20 }}>
          Suporte e Ajuda
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
