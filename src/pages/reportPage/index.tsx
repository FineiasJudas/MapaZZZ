import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
  BackHandler,
  Dimensions
} from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { style } from './style'
import { ArrowLeft, CircleX, Import } from 'lucide-react-native'
import {useAlert} from "../alertProvider/index";
import logo from '../../assets/logo.png'
import esc from '../../assets/esc.png'
import reportCamera from '../../assets/reportCamera.png'
import apelo from '../../assets/apelo.png'
import bySalonis from '../../assets/bySalōnis.png'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window');

const RegisterRiskZone = ({navigation} : any) => {
  const { showAlert } = useAlert();
  const [riskLevel, setRiskLevel] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkPermission = async () => {
    const token = await AsyncStorage.getItem('Token')
    if (!token) {
      await showAlert('erro', 'Você não tem permissão para acessar essa tela', 'Erro')
      // Redirecionar para a tela de login
      navigation.navigate('Login')
      return
    }
  }
  useEffect(() => {
    checkPermission();
  }, [])

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
    setTimeout(async () => {
      setLoading(false)
      await showAlert('sucesso', 'Zona de risco reportada com sucesso!', 'Sucesso')
    }, 2000)
  }

  return (
    <View style={style.mainConteiner}>
      {/* Topo */}
      <View style={style.logoX}>
        <TouchableOpacity onPress={() => navigation.navigate("initPage")}>
        <ArrowLeft color="#6d1625" size={30} />
        </TouchableOpacity>
        <Image source={logo} style={style.logoImg} />
      </View>
      <View style={style.container}>
        <View style={style.imagePicker}>
        <Image
          source={reportCamera}
            style={{ width: width * 0.4, height: width * 0.4, resizeMode: 'contain' }}/>
        </View>

        <View
          style={style.reportButton}

        >
          <Text style={style.buttonText}>
            Denuncie e Ajude a Combater a Malária!
          </Text>
          <Text style={style.textMinus}>
            Ao clicar em Reportar será redirecionado para fazer foto do local e terá uma
            previsualização da image, depois de aceitar o local será registado
            como uma zona de risco.
          </Text>
        </View>

        <TouchableOpacity style={style.buttonReportar} onPress={() => navigation.navigate('photo')}>
          <Text style={style.textReportar}>Reportar</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', bottom: -30 }}
      >
        <Image
          source={bySalonis}
          style={{ width: 80, height: 110, resizeMode: 'contain', marginBottom: 15 }}
        ></Image>
      </View>
    </View>
  )
}

export default RegisterRiskZone
