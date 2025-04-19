import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native'
import * as Location from 'expo-location'
import MapView, { Marker, Circle } from 'react-native-maps'
import dangerIcon from '../../assets/mosquito.png'
import { style } from './style'
import {
  Menu,
  House,
  MessageCircleWarning,
  BellRing,
  Gamepad2,
  Hospital,
  CircleHelp,
  LogOut,
  LocateFixed,
  Globe,
  Star,
  PersonStanding,
  MapPinned,
  Radio,
  Siren,
  Home,
  OctagonAlert
} from 'lucide-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImprovedSideMenu from '../siderMenuBar';
import {useAlert} from "../alertProvider/index";

const SCREEN_WIDTH = Dimensions.get('window').width // Largura da tela

export default function SidebarComponent ({ navigation }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const mapRef = useRef<MapView | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.6)).current
  const [is3D, setIs3D] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(true) // Controle da visibilidade da barra inferior
  const [activeTab, setActiveTab] = useState('home')
  const [dangerZones, setDangerZones] = useState([])
  const [userName, setUserName] = useState('Visitante...')
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(false)
  const { showAlert } = useAlert();


  const getUserName = async () => {
    try {
      const token = await AsyncStorage.getItem('Token')
      if (token) {
        setLoading(true)
        setLogged(true)
        const response = await fetch(
          'https://mapazzz.onrender.com/api/users/',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const data = await response.json()
        if (response.ok) {
          setUserName(data.data.name)
          console.log('Nome do usuário:', data.data.name)
          setLoading(false)
        } else {
          setUserName('Visitante...!!')
          setLoading(false)
          console.error('Erro ao buscar nome do usuário:', data)
        }
      } else {
        setUserName('Visitante...')
      }
      setLoading(false)
    } catch (error) {
      setUserName('Visitante...')
      setLoading(false)
      console.error('Erro ao buscar nome do usuário:', error)
    }
  }
  //

  const getZoneStyle = (level: string) => {
    switch (level) {
      case 'low':
        return { color: '#26A269', radius: 350 }
      case 'medium':
        return { color: '#F6C915', radius: 500 }
      case 'high':
        return { color: '#C01C28', radius: 1000 }
      default:
        return { color: '#808080', radius: 100 }
    }
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        await showAlert('erro','Permissão negada para acessar a localização.', 'Erro')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          pitch: 60, // Inclinação 3D
          heading: 0, // Direção
          altitude: 1000, // Altura da câmera
          zoom: 10 // Zoom
        })
      }
      // 🔴 Busca as zonas de perigo
      try {
        const response = await fetch(
          'https://mapazzz.onrender.com/api/danger_zone/all'
        )
        const data = await response.json()
        if (response.ok) {
          setDangerZones(data.dangerZones || [])
        } else {
          console.error('Erro ao buscar zonas de perigo:', data.message)
        }
      } catch (error) {
        console.error('Erro ao buscar zonas de perigo:', error)
      }
    })()
    // pegar o nome
    getUserName()
  }, [])

  const toggleMenu = () => {
    if (menuOpen) {
      // Fechar menu
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true
      }).start(() => setMenuOpen(false)) // Só esconde depois da animação
      setShowBottomBar(true)
    } else {
      setMenuOpen(true) // Mostra antes de animar
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
      setMenuOpen(true)
      setShowBottomBar(false) // Corrigido: Agora oculta a barra inferior quando o menu está aberto
    } // Corrigido: Agora oculta a barra inferior quando o menu está aberto
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('Token')
      navigation.navigate('Login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  // Função para recentralizar no usuário
  const handleRecenter = async () => {
    if (!location || !mapRef.current) return
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      pitch: 60,
      heading: 0,
      altitude: 1000,
      zoom: 18
    })
  }

  const MapStyle = [
    {
      featureType: 'poi.business', // Remove empresas e lojas
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'poi.school', // Opcional: remove escolas
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'poi.place_of_worship', // Opcional: remove igrejas
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi', // Mantém somente hospitais
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi.medical', // Mostra hospitais e farmácias
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'administrative',
      stylers: [{ visibility: 'on' }] // Mostra países, estados, municípios
    },
    {
      featureType: 'transit', // Oculta transporte público se quiser
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'water',
      stylers: [{ color: '#aadaff' }]
    },
    {
      featureType: 'landscape',
      stylers: [{ color: '#f3f4f4' }]
    }
  ]

  return (
    <View style={style.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={MapStyle}
        showsUserLocation
        showsCompass={false}
        showsMyLocationButton={false}
      >
        {location && (
          <Marker coordinate={location.coords}>
            <PersonStanding color='#77767B' style={style.meIcon} />
          </Marker>
        )}

        {/* Zonas de perigo no mapa */}
        {dangerZones.map(zone => {
          const { color, radius } = getZoneStyle(zone.level)
          return (
            <React.Fragment key={zone.id}>
              <Circle
                key={zone.id}
                center={{
                  latitude: parseFloat(zone.lat),
                  longitude: parseFloat(zone.lon)
                }}
                radius={radius}
                strokeColor={color}
                fillColor={`${color}55`}
                strokeWidth={2}
              />
              {/* Ícone de perigo */}
              <Marker
                coordinate={{
                  latitude: parseFloat(zone.lat),
                  longitude: parseFloat(zone.lon)
                }}
                anchor={{ x: 0.5, y: 0.5 }} // Centraliza o ícone no marcador
                pinColor={color} // Cor do pino
                // image={dangerIcon} // ícone customizado
                title={`Zona de perigo ${
                  zone.level === 'high'
                    ? 'alta'
                    : zone.level === 'medium'
                    ? 'média'
                    : 'baixa'
                }`}
                description={`${zone.description}`}
              >
                <Image
                  source={dangerIcon}
                  style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
              </Marker>
            </React.Fragment>
          )
        })}
      </MapView>

      {/* Aba lateral */}
      <ImprovedSideMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        slideAnim={slideAnim}
        userName={userName}
        loading={loading}
        logged={logged}
        navigation={navigation}
        showAlert={showAlert}
        logOut={logOut}
      />
      {/* Ícone de Menu */}
      {!menuOpen && (
        <TouchableOpacity style={style.menuButton} onPress={toggleMenu}>
          <Menu color='#7f1734' style={style.menuIcon} />
        </TouchableOpacity>
      )}

      {/* Ícone para Recentralizar */}
      <TouchableOpacity style={style.recenterButton} onPress={handleRecenter}>
        <MapPinned color='#7f1734' style={style.recenterIcon} />
      </TouchableOpacity>

      {/* Barra Inferior com opções */}
      {showBottomBar && (
        <View style={style.bottomBar}>
          <TouchableOpacity
            style={[
              style.bottomBarItem,
            ]}
            onPress={() =>{ setActiveTab('home'), navigation.navigate('initPage')}} >
            <House
              color={'#7f1734'}
            />
            <Text
              style={[
                style.bottomBarText,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.bottomBarItem,
            ]}
            onPress={async () => {
              if (logged) {
                navigation.navigate('reportPage');
              } else {
                await showAlert(
                  'aviso',
                  'Você precisa estar logado para acessar esta página, tente Logar',
                  'Atenção'
                );
                navigation.navigate('Login');
              }
            }}
          >
            <Siren
              color={ '#7f1734'}
            />
            <Text
              style={[
                style.bottomBarText,
              ]}
            >
              Reportar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={async () => {
            setActiveTab('notifics')
            if (logged) {
              navigation.navigate('notifyPage')
            } else {
              await showAlert(
                'aviso',
                'Você precisa estar logado para acessar esta página, tente Logar', 'Aviso'
              )
              navigation.navigate('Login');
            }
          }}
            style={[
              style.bottomBarItem,
              activeTab === 'notifics' && style.activeTabItem
            ]}
          >
            <BellRing
              color={'#7f1734'}
            />
            <Text
              style={[
                style.bottomBarText,
              ]}
            >
              Notifics
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}