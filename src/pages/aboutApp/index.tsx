import React, { useEffect } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Linking } from "react-native";
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
  function handleLinkPress(): void {
    Linking.openURL('https://salonis-mapzzz.vercel.app');
  }

  return (
    <KeyboardAvoidingView
      style={style.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() =>  navigation.goBack()}>
          <ArrowLeft color="#6d1625" size={30} style={{marginTop: 6}}/>
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={style.content}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#6d1625", marginBottom: 20}}>
        Sobre o App
        </Text>
        <ScrollView>
            <Text>
                Alguma coisa tipo o App MapaZZZ feito pela Salōnis é fixe! {'\n'}{'\n'}
                Site:{' '}
                <Text style={style.link} onPress={handleLinkPress}>
                https://salonis-mapzzz.vercel.app
        </Text>
            </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
