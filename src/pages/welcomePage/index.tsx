import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image, Dimensions, SafeAreaView } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { style } from "./style";
import { CircleX, Import } from "lucide-react-native";
import {useAlert} from "../alertProvider/index";
import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';
import welcomeView from '../../assets/WelcomeView.png';
import getInButton from '../../assets/loginButton.png';
import sigInButton from '../../assets/SignBotton.png';
import mapaZZZ from '../../assets/MapaZzz.png'
import bySalonis from '../../assets/bySalōnis.png'
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const WelcomePage = ({navigation} : any) => {
  const { showAlert } = useAlert();
  const [riskLevel, setRiskLevel] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   // verifica se o usuário já está logado
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token) {
        navigation.navigate("MapaPage");
      }
    }
    checkLogin();
  }
  , []);

  // Função para capturar foto da galeria ou câmera
  const pickImage = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setImage(result.assets[0].uri); // Now works without TypeScript issues!
  }
};
  // Simulação de envio do relatório
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await showAlert('sucesso' ,"Zona de risco reportada com sucesso!", 'Sucesso');
    }, 2000);
  };

  return (
    <SafeAreaView style={style.safeArea}>
    <View style={style.mainContainer}>
      {/* TOPO */}
      <View style={style.topContainer}>
        <Image source={mapaZZZ} style={[style.mapaLogo, { height: height * 0.025 }]} />
        <Image source={welcomeView} style={[style.welcomeImg, { height: height * 0.5 }]} />
      </View>

      {/* BOTÕES */}
      <View style={style.buttonsContainer}>
        <TouchableOpacity
          style={[style.loginButtonView, { width: width * 0.85 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            source={getInButton}
            style={[style.loginButtonImage, { width: width * 0.85, height: height * 0.065 }]}
          />
          <Text style={style.buttonEntrarText1}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.loginButtonView, { width: width * 0.85 }]}
          onPress={() => navigation.navigate("Sign")}
        >
          <Image
            source={sigInButton}
            style={[style.loginButtonImage, { width: width * 0.85, height: height * 0.065 }]}
          />
          <Text style={style.buttonEntrarText2}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      {/* RODAPÉ */}
      <View style={style.footerContainer}>
        <Image
          source={bySalonis}
          style={[style.bySalonisImg, { width: width * 0.2, height: height * 0.06 }]}
        />
      </View>
    </View>
  </SafeAreaView>
);
};

export default WelcomePage;