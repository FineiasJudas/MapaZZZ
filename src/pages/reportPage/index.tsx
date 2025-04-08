import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { style } from './style'
import { CircleX, Import } from 'lucide-react-native'
import logo from '../../assets/logo.png'
import esc from '../../assets/esc.png'
import reportCamera from '../../assets/reportCamera.png'
import apelo from '../../assets/apelo.png'
import bySalonis from '../../assets/bySalōnis.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
const RegisterRiskZone = ({navigation} : any) => {
  const [riskLevel, setRiskLevel] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkPermission = async () => {
    const token = await AsyncStorage.getItem('Token')
    if (!token) {
      Alert.alert('Erro', 'Você não tem permissão para acessar essa tela')
      // Redirecionar para a tela de login
      navigation.navigate('Login')
      return
    }
  }
  checkPermission();
  // Função para capturar foto da galeria ou câmera
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri) // Now works without TypeScript issues!
    }
  }
  // Simulação de envio do relatório
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Zona de risco reportada com sucesso!')
    }, 2000)
  }

  return (
    <View style={style.mainConteiner}>
      <View style={style.container}>
        <TouchableOpacity style={style.imagePicker}>
          <Image source={reportCamera} style={{ width: 150, height: 150 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={style.reportButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={style.buttonText}>
            Denuncie e Ajude a Combater a Malária!
          </Text>
          <Text style={style.textMinus}>
            Ao clicar em Reportar será redirecionado para fazer foto do local e terá uma
            previsualização da image, depois de aceitar o local será registado
            como uma zona de risco.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.buttonReportar} onPress={() => navigation.navigate('photo')}>
          <Text style={style.textReportar}>Reportar</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', bottom: -30 }}
      >
        <Image
          source={bySalonis}
          style={{ width: 80, height: 50, resizeMode: 'contain' }}
        ></Image>
      </View>
    </View>
  )
}

export default RegisterRiskZone
