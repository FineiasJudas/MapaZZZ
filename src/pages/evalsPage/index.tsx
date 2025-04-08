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
  const [refreshing, setRefreshing] = useState(false)

  // Busca os dados da zona de risco da API
  const fetchData = async () => {
    try {
      setLoading(true)
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
      if (response.ok) {
        if (responseData.dangerZone === null) {
          Alert.alert('Alerta', 'Não há mais zonas para repostar, Muito obrigado pela sua participação.')
          navigation.navigate('MapaPage')
          return
        }
        setDangerZone(responseData.dangerZone)
      } else if (response.status === 401 || response.status === 403) {
        Alert.alert(
          'Erro',
          'Você não tem permissão para acessar esses dados.'
        );
        navigation.navigate('Login');
      }
      else if (response.status === 404) {
        Alert.alert('Alerta', 'Não há mais zonas para repostar, Muito obrigado pela sua participação.')
        navigation.navigate('MapaPage')
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // funcao para pegar os dois ultimos endereços
  const getLastTwoAddresses = (address) => {
    if (!address) return '';
    const addressParts = address.split(',');
    const lastTwoParts = addressParts.slice(-2);
    return lastTwoParts.join(', ');
  }

  // Simula envio de confirmação (like/dislike)
  const handleConfirm = async (confirm, dangerZoneId) => {
    try {
      setRefreshing(true)
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
        Alert.alert("Sucesso", responseData.message)
        // Fetch new zone after successful report
        await fetchData()
      } else {
        Alert.alert("Error", responseData.message)
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a avaliação.')
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={style.mainConteiner}>
      {refreshing && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <ActivityIndicator size='large' color='#ffffff' />
        </View>
      )}

      {/* Mostra tudo somente se tiver imagem */}
      {dangerZone?.image ? (
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
              disabled={refreshing}
            >
              <Image source={like} style={style.options} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.optionsR}
              onPress={() => handleConfirm('no', dangerZone?.id)}
              disabled={refreshing}
            >
              <Image source={deslike} style={style.options} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhuma zona de perigo disponível</Text>
        </View>
      )}
    </View>
  )
}

export default EvalsPage