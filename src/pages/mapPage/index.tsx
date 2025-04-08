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
import MapStyle from '../../../mapStyle.json'
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
        alert('Permissão negada para acessar a localização.')
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

  return (
    <View style={style.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={MapStyle}
        showsUserLocation
        showsTraffic
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

      {menuOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={style.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  style.sideMenu,
                  { transform: [{ translateX: slideAnim }] }
                ]}
              >
                <View style={style.profileContainer}>
                  <View style={style.profileIcon}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                      {userName[0]}
                    </Text>
                  </View>
                  <View style={style.profileTextContainer}>
                    <Text style={style.profileName}>
                      {loading ? (
                        <ActivityIndicator size='small' color='#7F1734' />
                      ) : (
                        <Text style={{ fontSize: 20, color: '#77767B' }}>
                          {userName}
                        </Text>
                      )}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 5
                      }}
                    >
                      <Star size={18} color={'#26A269'} />
                      <Star size={18} color={'#26A269'} />
                      <Star size={18} color={'#26A269'} />
                      <Star size={18} color={'#000000'} />
                      <Star size={18} color={'#000000'} />
                    </View>
                  </View>
                </View>

                <ScrollView style={style.scrollView}>
                  {/* <TouchableOpacity style={style.menuItem} onPress={() => navigation.navigate("MapaPage")} activeOpacity={0.1}>
                    <House size={30} color={'#77767b'}  />
                    <Text style={style.menuItemText}>Início</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={style.menuItem}
                    onPress={() => navigation.navigate('initPage')}
                    activeOpacity={0.1}
                  >
                    <Home size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Inicio</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.menuItem}
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
                    activeOpacity={0.1}
                  >
                    <OctagonAlert size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Verificar Relatos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.menuItem}>
                    <BellRing size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Notificações</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.menuItem}>
                    <Gamepad2 size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Jogos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.menuItem}>
                    <Hospital size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Hospitais Próximos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.menuItem}>
                    <CircleHelp size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Ajuda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={style.menuItem} onPress={logOut}>
                    <LogOut size={30} color={'#77767b'} />
                    <Text style={style.menuItemText}>Sair</Text>
                  </TouchableOpacity>
                </ScrollView>
                <View style={{ marginBottom: 20, marginLeft: 15 }}>
                  <Text style={{ fontSize: 20 }}>Info de contacto:</Text>
                  <Text style={{ fontSize: 18, color: '#77767B' }}>
                    Salonis@gmail.com
                  </Text>
                  <Text style={{ fontSize: 18, color: '#77767B' }}>
                    +244 946671828
                  </Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Ícone de Menu */}
      {!menuOpen && (
        <TouchableOpacity style={style.menuButton} onPress={toggleMenu}>
          <Menu color='#77767b' style={style.menuIcon} />
        </TouchableOpacity>
      )}

      {/* Ícone para Recentralizar */}
      <TouchableOpacity style={style.recenterButton} onPress={handleRecenter}>
        <MapPinned color='#77767B' style={style.recenterIcon} />
      </TouchableOpacity>

      {/* Barra Inferior com opções */}
      {showBottomBar && (
        <View style={style.bottomBar}>
          <TouchableOpacity
            style={[
              style.bottomBarItem,
              activeTab === 'home' && style.activeTabItem
            ]}
            onPress={() => setActiveTab('home')}
          >
            <House
              size={30}
              color={activeTab === 'home' ? '#000' : '#77767B'}
            />
            <Text
              style={[
                style.bottomBarText,
                activeTab === 'home' && style.activeTabText
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.bottomBarItem,
              activeTab === 'report' && style.activeTabItem
            ]}
            onPress={() => {
              if (logged) navigation.navigate('reportPage')
              else {
                navigation.navigate('Login')
                Alert.alert(
                  'Atenção',
                  'Você precisa estar logado para acessar esta página, tente Logar'
                )
              }
            }}
          >
            <Siren
              size={30}
              color={activeTab === 'report' ? '#000' : '#77767B'}
            />
            <Text
              style={[
                style.bottomBarText,
                activeTab === 'report' && style.activeTabText
              ]}
            >
              Reportar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.bottomBarItem,
              activeTab === 'notifics' && style.activeTabItem
            ]}
            onPress={() => setActiveTab('notifics')}
          >
            <BellRing
              size={30}
              color={activeTab === 'notifics' ? '#000' : '#77767B'}
            />
            <Text
              style={[
                style.bottomBarText,
                activeTab === 'notifics' && style.activeTabText
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
