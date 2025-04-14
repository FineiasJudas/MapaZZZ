import React, { useEffect, useState } from 'react'
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
import {
  BellRing,
  CircleHelp,
  CircleX,
  Earth,
  Gamepad2,
  Hospital,
  Import,
  OctagonAlert,
  Siren
} from 'lucide-react-native'
import * as Location from 'expo-location'
import logo from '../../assets/logo.png'
import esc from '../../assets/esc.png'
import welcomeView from '../../assets/WelcomeView.png'
import getInButton from '../../assets/loginButton.png'
import sigInButton from '../../assets/SignBotton.png'
import mapaZZZ from '../../assets/MapaZzz.png'
import bySalonis from '../../assets/bySalōnis.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import notifyIcon from '../../assets/notifyIcon.png'
import geo from '../../assets/geo.png'

const initPage = ({ navigation }: any) => {
  const [riskLevel, setRiskLevel] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(false)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [address, setAddress] = useState<{
    country: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    suburb?: string
    county?: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getLocation = async () => {
    setLoading(true)
    try {
      // Solicitar permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permissão para acessar a localização foi negada')
        setLoading(false)
        return
      }

      // Obter a localização atual
      let location = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

      // Usar Nominatim para obter o endereço
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'MapaZzz/1.0 (justinocsoares123@gmail.com)'
          }
        }
      )
      const data = await response.json()
      // console.log(data.address)
      if (response.ok) {
        if (data.address) {
          setAddress({
            country: data.address.country,
            city: data.address.city,
            town: data.address.town,
            village: data.address.village,
            suburb: data.address.suburb,
            county: data.address.county,
            municipality: data.address.municipality
          })
        } else {
          console.error('Endereço não encontrado')
        }
      }
    } catch (err) {
      setError('Erro ao obter localização')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const checkPermission = async () => {
    const token = await AsyncStorage.getItem('Token')
    if (token) {
      setLogged(true)
    }
  }
  useEffect(() => {
    checkPermission()
    getLocation()
  }, [])

  const getLocationName = () => {
    if (!address) return 'Obtendo a localização...'

    // Tentar obter o nome do município/cidade em ordem de prioridade
    const locality =
      address.municipality ||
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      address.county ||
      'Localidade desconhecida'
    return `${locality}, ${address.country || 'País desconhecido'}`
  }

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            top: 0
          }}
        >
          <View>
            <Text style={{ color: 'grey', fontSize: 10 }}>Localização</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Image source={geo} style={style.logoGeo} />

              {loading ? (
                <ActivityIndicator size='small' color='grey' />
              ) : (
                <>
                  <Text>{getLocationName()}</Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (logged) {
                navigation.navigate('notifyPage')
              } else {
                Alert.alert(
                  'Atenção',
                  'Você precisa estar logado para acessar esta página, tente Logar'
                )
                navigation.navigate('Login');
              }
            }}
          >
            <Image
              source={notifyIcon}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
        </View>
        {/* Container para as categorias */}
        <View style={style.containerCategoria}>
          <View style={style.TitleCategoria}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categorias</Text>
          </View>
          <View style={style.categorias}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MapaPage')}
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 10
                }}
              >
                <Earth size={30} color={'#77767b'} />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 10,
                  color: '#77767b',
                  textAlign: 'center'
                }}
              >
                Zonas de Risco
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 10
                }}
              >
                <Hospital size={30} color={'#77767b'} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: '#77767b',
                  textAlign: 'center'
                }}
              >
                Hospitais
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (logged) {
                    navigation.navigate('EvalsPage')
                    Alert.alert(
                      'Atenção',
                      "Essa página irá mostrar possíveis zonas de risco. \
                                                          precisamos da sua ajuda para verificar se realmente são zonas de risco. Por favor, clique no botão 'Verificar' para confirmar se a zona de risco é real ou não. \
                                                          Obrigado por sua colaboração!"
                    )
                  } else {
                    navigation.navigate('Login')
                    Alert.alert(
                      'Atenção',
                      'Você precisa estar logado para acessar esta página, tente Logar'
                    )
                  }
                }}
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 10
                }}
              >
                <OctagonAlert size={30} color={'#77767b'} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: '#77767b',
                  textAlign: 'center'
                }}
              >
                Verificar
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 100,
                  marginBottom: 10
                }}
              >
                <Gamepad2 size={30} color={'#77767b'} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  color: '#77767b',
                  textAlign: 'center'
                }}
              >
                Jogo
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={style.containerSobre}>
        <View style={style.TitleCategoria}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sobre o app</Text>
        </View>
        <Text style={style.textSobre}>
          O MapaZzz é um aplicativo colaborativo que permite identificar e
          reportar zonas de perigo na sua região, promovendo a segurança da
          comunidade.
          <Text style={{ fontWeight: '400' }}>
            Se desejar reportar uma área de risco, clique no botão abaixo.
          </Text>
        </Text>

        <View>
          <TouchableOpacity
            // style={style.menuItem}
            onPress={() => {
              if (logged) {
                navigation.navigate('reportPage')
              } else {
                navigation.navigate('Login')
                Alert.alert(
                  'Atenção',
                  'Você precisa estar logado para acessar esta página, tente Logar'
                )
              }
            }}
            activeOpacity={0.1}
            style={{
              width: 80,
              height: 80,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 100,
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 50,
              marginTop: 20
            }}
          >
            <Siren size={70} color={'#77767b'} />

            {/* <Text style={style.menuItemText}>Verificar Relatos</Text> */}
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ alignItems: 'center', justifyContent: 'center', bottom: -110 }}
      >
        <Image
          source={bySalonis}
          style={{ width: 80, height: 50, resizeMode: 'contain' }}
        ></Image>
      </View>
    </View>
  )
}

export default initPage
