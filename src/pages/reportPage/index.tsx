import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { style } from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reportCamera from '../../assets/reportCamera.png'
import bySalonis from '../../assets/bySalōnis.png'
import {useAlert} from "../alertProvider/index";
const { showAlert } = useAlert();

const RegisterRiskZone = ({ navigation }: any) => {
  const [image, setImage] = useState<string | null>(null)
  
  const checkPermission = async () => {
    const token = await AsyncStorage.getItem('Token')
    if (!token) {
      await showAlert('erro', 'Você não tem permissão para acessar essa tela', 'Erro')
      navigation.navigate('Login')
    }
  }

  useEffect(() => {
    checkPermission()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.mainConteiner}>
        <View style={style.container}>
          <View style={style.imagePicker}>
            <Image source={reportCamera} style={{ width: 150, height: 150 }} />
          </View>

          <View style={style.reportButton}>
            <Text style={style.buttonText}>
              Denuncie e Ajude a Combater a Malária!
            </Text>
            <Text style={style.textMinus}>
              Ao clicar em Reportar será redirecionado para fazer foto do local e terá uma
              previsualização da imagem. Depois de aceitar, o local será registrado
              como uma zona de risco.
            </Text>
          </View>

          <TouchableOpacity
            style={style.buttonReportar}
            onPress={() => navigation.navigate('photo')}
          >
            <Text style={style.textReportar}>Reportar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center',}}>
          <Image
            source={bySalonis}
            style={{ width: 80, height: 80, resizeMode: 'contain', marginTop:  50}}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterRiskZone;