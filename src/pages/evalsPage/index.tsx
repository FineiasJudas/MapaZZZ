import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native'
import { style } from './style'
import esc from '../../assets/esc.png'
import like from '../../assets/Like.png'
import deslike from '../../assets/Deslike.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogOut } from 'lucide-react-native'

const EvalsPage = ({navigation} : any) => {
  const [dangerZone, setDangerZone] = useState(null)
  const [loading, setLoading] = useState(true)

  // Busca os dados da zona de risco da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('Token')
        if (!token) {
          Alert.alert('Erro', 'Usuário não autorizado.')
          navigation.navigate('Login')
          return
        }
        const response = await fetch(
          'https://mapazzz.onrender.com/api/danger_zone/getZoneRandom',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization : `Bearer ${token}`
            }
          }
        )
        const responseData = await response.json()
        // console.log("Response: "+ JSON.stringify(responseData))
        if (response.ok) {
          if (responseData.dangerZone === null) {
            Alert.alert('Alerta', 'Não há mais zonas para repostar,Muito obrigado pela sua participação.')
            navigation.navigate('MapaPage')
            return
          }
          setDangerZone(responseData.dangerZone)
        } else if (response.status === 401 || response.status === 403) {
          Alert.alert(
            'Erro',
            'Você não tem permissão para acessar esses dados.'
          );
          console.log("Zonesss "+ JSON.stringify(responseData))
          navigation.navigate('Login');
        }
        else if (response.status === 404) {
          Alert.alert('Alerta', 'Não há mais zonas para repostar,Muito obrigado pela sua participação.')
          navigation.navigate('MapaPage')
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // funcao para pegar os dois ultimos endereços
  const getLastTwoAddresses = (address) => {
    const addressParts = address.split(',');
    const lastTwoParts = addressParts.slice(-2);
    return lastTwoParts.join(', ');
  }

  // Simula envio de confirmação (like/dislike)
  const handleConfirm = async (confirm, dangerZoneId) => {
    try {
      const response = await fetch(
        `https://mapazzz.onrender.com/api/danger_zone/report/` + dangerZoneId,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('Token')}`
          },
          body: JSON.stringify({
            status: confirm
          })
        }
      )
      const responseData = await response.json()
      if (response.ok) {
        console.log('Avaliação enviada com sucesso:', responseData)
        Alert.alert("Sucesso", responseData.message)
        // navigation.navigate('Home')
      }else {
        Alert.alert("Error", responseData.message)
      // alert('Avaliação enviada!')
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
      alert('Erro ao enviar avaliação.')
    }
  }

  if (loading) {
    return <ActivityIndicator size='large' style={{ flex: 1 }} />
  }

  return (
    <View style={style.mainConteiner}>
  {/* Mostra tudo somente se tiver imagem */}
  {dangerZone?.image && (
    <>
      {/* Imagem */}
      <Image
        source={{ uri: dangerZone.image }}
        style={{
          width: '95%',
          height: '100%',
          borderRadius: 10,
          position: 'absolute',
          top: 0,
          flex: 1,
          alignSelf: 'center'
        }}
        resizeMode='cover'
        resizeMethod='scale'
      />

      {/* Localização da Foto */}
      <View style={style.locationContainer}>
        <Text style={style.locationText}>
          {getLastTwoAddresses(dangerZone?.address)}
        </Text>
      </View>

      {/* Botões de Avaliação */}
      <View style={style.optionButtons}>
        <TouchableOpacity
          style={style.optionsL}
          onPress={() => handleConfirm('yes', dangerZone?.id)}
        >
          <Image source={like} style={style.options} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.optionsR}
          onPress={() => handleConfirm('no', dangerZone?.id)}
        >
          <Image source={deslike} style={style.options} />
        </TouchableOpacity>
      </View>
    </>
  )}
</View>
  )
}

export default EvalsPage
