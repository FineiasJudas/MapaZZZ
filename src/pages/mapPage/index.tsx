import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { style } from "./style";
import mapStyle from "../../../mapStyle.json"; // Estilo personalizado
import MenuIcon from "../../assets/menuBottton.png";
import MeIcon from "../../assets/pedestre.png"; // Ícone do usuário
import HomeIcon from "../../assets/casa.png";
import ReportIcon from "../../assets/reporter.png";
import NotifyIcon from "../../assets/notifyIcon(1).png";
import LocateIcon from "../../assets/pedestre.png"; // Ícone para recentralizar
import Inicio from "../../assets/Inicio.png";
import menuNotify from "../../assets/Notificoes.png";
import menuHospitais from "../../assets/Hospitais.png";
import menuReportar from "../../assets/Reportar.png";
import menuJogo from "../../assets/jogos.png";
import menuSair from "../../assets/Sair.png";
import menuVerRep from "../../assets/Ver relatos.png";
import menuAjuda from "../../assets/Ajuda.png";
import { BellRing, CircleHelp, Eye, Gamepad2, Hospital, House, LogOut, MapPinned, Menu, MessageCircleWarning, PersonStanding, Star } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width; // Largura da tela

export default function MapPage() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.6)).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão negada para acessar a localização.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (mapRef.current) {
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

  // Função para alternar a aba lateral
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -SCREEN_WIDTH * 1 : 0, // Abre/fecha a aba
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Função para recentralizar no usuário
  const handleRecenter = async () => {
    if (!location || !mapRef.current) return;

    mapRef.current.animateCamera({
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
        customMapStyle={mapStyle}
        showsUserLocation
        showsTraffic
        showsCompass={false}
        showsMyLocationButton={false}
      >
        {location && (
          <Marker coordinate={location.coords}>
            <PersonStanding color="#77767b" style={style.meIcon} />
          </Marker>
        )}
      </MapView>

      {/* Aba lateral */}
      <Animated.View style={[style.sideMenu, { transform: [{ translateX: slideAnim }], display: "flex", flexDirection: "column", justifyContent: "space-between" }]}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          borderBottomWidth: 5,
          borderColor: "#ccc",
          paddingVertical: 15,
          paddingHorizontal: 15
        }}>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:  "#ccc",
            position: "relative"
          }}>
              <Text style={{
                fontSize: 25,
                fontWeight: 800,
              }}>
                J
              </Text>
              <View style={{
                width: 15,
                height: 15,
              borderRadius: 100,
              backgroundColor: "green",
              position: "absolute",
              bottom: 5,
              right: -1,
              borderWidth: 1,
              borderColor: "#fff"
              }}>

              </View>
          </View>
          <View style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
             // color: "#77767b"
            }}>
              Justino Soares
            </Text>
            <Text style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#77767b"
            }}>
              active
            </Text>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 5}}>
            <Star size={18} color={"#26a269"}/>
            <Star size={18} color={"#26a269"}/>
            <Star size={18} color={"#26a269"}/>
            <Star size={18} color={"#000000"}/>
            <Star size={18} color={"#000000"}/>
            </View>
          </View>

        </View>
        <View style={{height: 100, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 10}}>
          <TouchableOpacity style={style.menuItem}>
            <House size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <Eye size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Ver relatos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <MessageCircleWarning size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Reportar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
          <BellRing size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <Gamepad2 size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Jogos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <Hospital size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Hospitais próximos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <CircleHelp size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Ajuda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.menuItem}>
            <LogOut size={30} color={"#77767b"} />
            <Text style={{marginLeft: 10, color: "#77767b", fontSize: 18}}>Sair</Text>
          </TouchableOpacity>

        </View>

        <View style={{marginBottom: 20}}>
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            borderBottomWidth: 5,
            borderColor: "#ccc",
            paddingVertical: 15,
            paddingHorizontal: 15
          }}>
          </View>

          <TouchableOpacity style={style.menuItem}>
            <Text style={{marginLeft: 15, color: "#77767b", fontSize: 18}}>Info sobre contacto:</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={{marginLeft: 15, color: "#77767b", fontSize: 18}}>Salonis@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={{marginLeft: 15, color: "#77767b", fontSize: 18}}>+244 946677128</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>



      {/* Ícone de Menu */}
      {!menuOpen && ( // Só exibe quando o menu está fechado
        <TouchableOpacity style={style.menuButton} onPress={toggleMenu}>
          <Menu color="#77767b" style={style.menuIcon} />
        </TouchableOpacity>
      )}


      {/* Fundo para fechar menu quando clicar fora */}
      {menuOpen && (
        <TouchableOpacity style={style.overlay} onPress={toggleMenu} />
      )}

      {/* Ícone para Recentralizar */}
      <TouchableOpacity style={style.recenterButton} onPress={handleRecenter}>
        <MapPinned color="#77767b" style={style.recenterIcon} />
      </TouchableOpacity>

      {/* Barra inferior fixa */}
      {!menuOpen && (
       <View style={style.bottomBar}>
      
        <View style={style.bottomMenu}>
          <TouchableOpacity style={style.menuItem}>
            <House size={30} color={"#77767b"} style={style.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={style.menuItem}>
            <MessageCircleWarning size={30} color={"#77767b"} style={style.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={style.menuItem}>
            <BellRing size={30} color={"#77767b"} style={style.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>)} 
    </View>
  );
}
