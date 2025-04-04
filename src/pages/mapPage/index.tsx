import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';
import { style } from './style';
import MapStyle from '../../../mapStyle.json';
import { Menu, House, MessageCircleWarning, BellRing, Gamepad2, Hospital, CircleHelp, LogOut, LocateFixed, Globe, Star, PersonStanding, MapPinned } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get("window").width; // Largura da tela

export default function SidebarComponent() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.6)).current;
  const [is3D, setIs3D] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true); // Controle da visibilidade da barra inferior
 


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão negada para acessar a localização.");
        return;
      }      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          pitch: 60, // Inclinação 3D
          heading: 0, // Direção
          altitude: 1000, // Altura da câmera
          zoom: 18, // Zoom
        });
      }
    })();
  }, []);
  
  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
    setShowBottomBar(menuOpen); // Corrigido: Agora oculta a barra inferior quando o menu está aberto
  };
  

  // Função para recentralizar no usuário
  const handleRecenter = async () => {
    if (!location || !mapRef.current) return;    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      pitch: 60,
      heading: 0,
      altitude: 1000,
      zoom: 18,
    });
  };

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
            <PersonStanding color="#77767B" style={style.meIcon} />
          </Marker>
        )}
      </MapView>

      {/* Aba lateral */}

      {menuOpen && (
  <TouchableWithoutFeedback onPress={toggleMenu}>
    <View style={style.overlay}>
      <TouchableWithoutFeedback>
      <Animated.View style={[style.sideMenu, { transform: [{ translateX: slideAnim }] }]}> 
        <View style={style.profileContainer}>
          <View style={style.profileIcon}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>J</Text>
          </View>
          <View style={style.profileTextContainer}>
            <Text style={style.profileName}>Justino Soares</Text>
            <Text style={style.profileStatus}>Ativo</Text>
            <View style={{display: "flex", flexDirection: "row", marginTop: 5}}>
              <Star size={18} color={"#26A269"}/>
              <Star size={18} color={"#26A269"}/>
              <Star size={18} color={"#26A269"}/>
              <Star size={18} color={"#000000"}/>
              <Star size={18} color={"#000000"}/>
            </View>
          </View>
        </View>

        <ScrollView style={style.scrollView}>
          <TouchableOpacity style={style.menuItem} activeOpacity={0.1}>
            <House size={30} color={'#77767b'} />
            <Text style={style.menuItemText}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.menuItem}>
            <MessageCircleWarning size={30} color={'#77767b'} />
            <Text style={style.menuItemText}>Reportar</Text>
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
          <TouchableOpacity style={style.menuItem}>
            <LogOut size={30} color={'#77767b'} />
            <Text style={style.menuItemText}>Sair</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{marginBottom: 20, marginLeft: 15}}>
          <Text style={{fontSize: 20}}>Info de contacto:</Text>
          <Text style={{fontSize: 18, color: '#77767B'}}>Salonis@gmail.com</Text>
          <Text style={{fontSize: 18, color: '#77767B'}}>+244 946671828</Text>
        </View>
      </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
)}

      {/* Ícone de Menu */}
      {!menuOpen && (
        <TouchableOpacity style={style.menuButton} onPress={toggleMenu}>
          <Menu color="#77767b" style={style.menuIcon} />
        </TouchableOpacity>
      )}

      {/* Ícone para Recentralizar */}
      <TouchableOpacity style={style.recenterButton} onPress={handleRecenter}>
        <MapPinned color="#77767B" style={style.recenterIcon} />
      </TouchableOpacity>

      {/* Barra Inferior com opções */}
      {showBottomBar && (
        <View style={style.bottomBar}>
          <TouchableOpacity style={style.bottomBarItem}>
            <House size={30} color={'#77767b'} />
            <Text style={style.bottomBarText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.bottomBarItem}>
            <MessageCircleWarning size={30} color={'#77767b'} />
            <Text style={style.bottomBarText}>Reportar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.bottomBarItem}>
            <BellRing size={30} color={'#77767b'} />
            <Text style={style.bottomBarText}>Notifics</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}