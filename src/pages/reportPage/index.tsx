import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { style } from "./style";
import { CircleX, Import } from "lucide-react-native";
import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';

const RegisterRiskZone = () => {

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
      <View style ={style.logoX}>
        <View>
          <TouchableOpacity>
            <Image source={esc} style={style.escImg}>
              </Image>
            </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
          <Image source={logo} style={style.logoImg}>
          </Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.container}>
      
      <Text style={style.header}>Registrar Zona de Risco</Text>

      <TouchableOpacity style={style.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={style.previewImage} />
        ) : (
          <FontAwesome5 name="camera" size={40} color="#fff" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={style.reportButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
          <Text style={style.buttonText}>Reportar</Text>
            <MaterialIcons name="report-problem" size={24} color="#fff" style={{left: -20}} />
          </>
        )}
      </TouchableOpacity>
    </View>
    </View>
    
  );
};

export default RegisterRiskZone;
