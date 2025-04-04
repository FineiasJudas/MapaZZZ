import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { style } from "./style";
import { CircleX, Import } from "lucide-react-native";
import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';
import welcomeView from '../../assets/WelcomeView.png';
import getInButton from '../../assets/loginButton.png';
import sigInButton from '../../assets/SignBotton.png';
import mapaZZZ from '../../assets/MapaZzz.png'
import bySalonis from '../../assets/bySalōnis.png'

const WelcomePage = () => {

  const [riskLevel, setRiskLevel] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => {
      setLoading(false);
      alert("Zona de risco reportada com sucesso!");
    }, 2000);
  };

  return (
    <View style={style.mainConteiner}>
      <View style={style.container}>
      <View style={style.logoX}>
      <Image source={mapaZZZ} style={{width: '100%', height:18, resizeMode: 'contain', marginBottom: 10}}>
      </Image>
      </View>
        <Image source={welcomeView} style={{width: '100%', height:320, resizeMode: 'contain'}}>
      </Image>
    </View>
    <View style={style.enterContainer}>
      
    <TouchableOpacity style={style.loginButtonView}>
                <Image source={getInButton} style={style.loginButtonImage} />
                <Text style={style.buttonEntrarText1}> Entrar </Text>
              </TouchableOpacity>
    <TouchableOpacity style={style.loginButtonView}>
                <Image source={sigInButton} style={style.loginButtonImage} />
                <Text style={style.buttonEntrarText2}> Criar conta </Text>
              </TouchableOpacity>
              
    </View>
    <View style={{alignItems: 'center', justifyContent: 'center', bottom: 30}}>
          <Image source={bySalonis} style={{width: 80, height: 50, resizeMode: 'contain'}}>
          </Image>
    </View>
    </View>
    
  );
};

export default WelcomePage;