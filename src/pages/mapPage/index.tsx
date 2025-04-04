import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';
import { style } from './style';
import { Menu, House, MessageCircleWarning, BellRing, Gamepad2, Hospital, CircleHelp, LogOut, LocateFixed, Globe, Star } from 'lucide-react-native';

export default function SidebarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showBottomBar, setShowBottomBar] = useState(true); // Controle da visibilidade da barra inferior
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
  
        // Move a câmera em visão 3D logo que abre o app
        if (mapRef.current) {
          mapRef.current.animateCamera({
            center: location.coords,
            zoom: 18,
            pitch: 60, // 3D direto
            heading: 0,
            altitude: 0,
          });
          setIs3D(true); // Atualiza o estado pra refletir que já está em 3D
        }
      }
    };
    getLocation();
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
  

  const toggle3DView = () => {
    if (mapRef.current && location) {
      setIs3D(!is3D);
      mapRef.current.animateCamera({
        center: location,
        zoom: 15,
        pitch: is3D ? 0 : 60, // Alterna entre 2D e 3D
      });
    }
  };

  return (
    <View style={style.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation
        showsTraffic
        showsCompass={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location ? location.latitude : -8.839, // Usa a localização obtida ou uma coordenada padrão
          longitude: location ? location.longitude : 13.289,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker coordinate={location}>
            <View style={style.meIcon} />
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

      {/* Botão de Recentralizar e Visão 3D */}
      <TouchableOpacity
        style={style.recenterButton}
        onPress={toggle3DView}
      >
        {is3D ? (
          <Globe size={30} color="#77767b" />
        ) : (
          <LocateFixed size={30} color="#77767b" />
        )}
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