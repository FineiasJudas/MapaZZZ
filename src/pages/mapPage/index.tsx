import React, { useState, useEffect, useRef } from "react";
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
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Circle, Polyline } from "react-native-maps";
import axios from "axios";
import dangerIcon from "../../assets/mosquito.png";
import { style } from "./style";
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
  OctagonAlert,
  User,
  CheckCheck,
  Cog,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImprovedSideMenu from "../siderMenuBar";
import { useAlert } from "../alertProvider/index";
import { useRoute } from "@react-navigation/native";
import useSocketNotification from "../utils/socketio";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SidebarComponent({ navigation }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const mapRef = useRef<MapView | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.6)).current;
  const [is3D, setIs3D] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [dangerZones, setDangerZones] = useState([]);
  const [userName, setUserName] = useState("Visitante...");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [destination, setDestination] = useState(null);
  const { showAlert } = useAlert();
  
  useSocketNotification();
  const getUserName = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");
      if (token) {
        setLoading(true);
        setLogged(true);
        const response = await fetch(
          "https://mapazzz.onrender.com/api/users/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserName(data.data.name);
          setLoading(false);
        } else {
          setUserName("Visitante...!!");
          setLoading(false);
          console.error("Erro ao buscar nome do usuário:", data);
        }
      } else {
        setUserName("Visitante...");
      }
      setLoading(false);
    } catch (error) {
      setUserName("Visitante...");
      setLoading(false);
      console.error("Erro ao buscar nome do usuário:", error);
    }
  };

  const getZoneStyle = (level: string) => {
    switch (level) {
      case "low":
        return { color: "#26A269", radius: 350 };
      case "medium":
        return { color: "#F6C915", radius: 500 };
      case "high":
        return { color: "#C01C28", radius: 1000 };
      default:
        return { color: "#808080", radius: 100 };
    }
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const apiKey = "AIzaSyD5z9XkSGLQvbWJ27yZ2CPlJMvwcmFEQho";
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}&mode=walking`;

      const response = await axios.get(url);
      const data = response.data;

      if (data.status === "OK") {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      } 
      // else {
        // console.log("Erro ao buscar rota:", data.status);
        // showAlert("erro", "Não foi possível traçar a rota.", "Erro");
      // }
    } catch (error) {
      console.error("Erro ao buscar rota:", error);
      showAlert("erro", "Erro ao conectar com o serviço de rotas.", "Erro");
    }
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  const handleTraceRoute = async () => {
    if (!location) {
      // showAlert("erro", "Localização atual não disponível.", "Erro");
      return;
    }
  
    const GEO = await AsyncStorage.getItem("GEO");
    const parse = JSON.parse(GEO);
  
    const FIXED_DESTINATION = {
      latitude: parse.latitude,
      longitude: parse.longitude,
    };  
    setDestination(FIXED_DESTINATION);
    fetchRoute(location.coords, FIXED_DESTINATION);
  };
  

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

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      await AsyncStorage.removeItem("User");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
      setShowBottomBar(true);
    } else {
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowBottomBar(false);
    }
  };

  const LocalizaçãoActual = async () =>{
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert(
          "erro",
          "Permissão negada para acessar a localização.",
          "Erro"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const callGEO = async () => {
        const GEO = await AsyncStorage.getItem("GEO");
        if (GEO) {
          handleTraceRoute();
        }
      };
      if (destination)
        callGEO();
  }
  LocalizaçãoActual();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert(
          "erro",
          "Permissão negada para acessar a localização.",
          "Erro"
        );
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
          pitch: 60,
          heading: 0,
          altitude: 1000,
          zoom: 10,
        });
      }
      try {
        const response = await fetch(
          "https://mapazzz.onrender.com/api/danger_zone/all"
        );
        const data = await response.json();
        if (response.ok) {
          setDangerZones(data.dangerZones || []);
        } else {
          console.error("Erro ao buscar zonas de perigo:", data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar zonas de perigo:", error);
      }
    })();
    getUserName();
    
  }, []);

  const MapStyle = [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "water",
      stylers: [{ color: "#aadaff" }],
    },
    {
      featureType: "landscape",
      stylers: [{ color: "#f3f4f4" }],
    },
  ];

  return (
    <View style={style.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={MapStyle}
        showsUserLocation
        showsCompass={false}
        showsMyLocationButton={false}>
        {location && (
          <Marker coordinate={location.coords}>
            <PersonStanding color="#77767B" style={style.meIcon} />
          </Marker>
        )}
        {destination && (
          <Marker coordinate={destination} title="Destino">
            <Hospital color="#7f1734" />
          </Marker>
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#7f1734"
            strokeWidth={4}
          />
        )}
        {dangerZones.map((zone) => {
          const { color, radius } = getZoneStyle(zone.level);
          return (
            <React.Fragment key={zone.id}>
              <Circle
                key={zone.id}
                center={{
                  latitude: parseFloat(zone.lat),
                  longitude: parseFloat(zone.lon),
                }}
                radius={radius}
                strokeColor={color}
                fillColor={`${color}55`}
                strokeWidth={2}
              />
              <Marker
                coordinate={{
                  latitude: parseFloat(zone.lat),
                  longitude: parseFloat(zone.lon),
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                pinColor={color}
                title={`Zona de perigo ${
                  zone.level === "high"
                    ? "alta"
                    : zone.level === "medium"
                    ? "média"
                    : "baixa"
                }`}
                description={`${zone.description}`}>
                <Image
                  source={dangerIcon}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>
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
      {!menuOpen && (
        <TouchableOpacity style={style.menuButton} onPress={toggleMenu}>
          <Menu color="#7f1734" style={style.menuIcon} />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={style.recenterButton} onPress={handleRecenter}>
        <MapPinned color="#7f1734" style={style.recenterIcon} />
      </TouchableOpacity>
      {routeCoordinates.length > 0 && (
        <TouchableOpacity
          style={style.clearRouteButton}
          onPress={async () => {
            setRouteCoordinates([]);
            setDestination(null);
            await AsyncStorage.removeItem("GEO");
          }}>
          <Text style={style.clearRouteText}>Limpar Rota</Text>
        </TouchableOpacity>
      )}
      {showBottomBar && (
      <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("ProfilePage")}>
        <User color="#7f1734" />
        <Text style={styles.navButtonText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("reportPage")}>
        <Siren color="#7f1734" />
        <Text style={styles.navButtonText}>Reportar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={async () => {
          if (logged) {
            navigation.navigate("EvalsPage");
            await showAlert(
              "aviso",
              "Essa página irá mostrar possíveis zonas de risco. \
                                                        precisamos da sua ajuda para verificar se realmente são zonas de risco. Por favor, clique no botão 'Verificar' para confirmar se a zona de risco é real ou não. \
                                                        Obrigado por sua colaboração!",
              "Atenção"
            );
          } else {
            navigation.navigate("Login");
            await showAlert(
              "aviso",
              "Você precisa estar logado para acessar esta página, tente Logar",
              "Atenção"
            );
          }
        }}>
        <CheckCheck color="#7f1734" />
        <Text style={styles.navButtonText}>Verificar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("configPage")}>
        <Cog color="#7f1734" />
        <Text style={styles.navButtonText}>Definições</Text>
      </TouchableOpacity>
    </View>
  // </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    color: "#7f1734",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  puzzleIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#871434",
    borderRadius: 4,
  },
  puzzleText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  welcomeCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#dfdfdf",
    borderRadius: 12,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userIconText: {
    fontSize: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    width: "90%",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  actionButtonText: {
    fontSize: 14,
    color: "#7f1734",
  },
  statsContainer: {
    flexDirection: "row",
    margin: 16,
    gap: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: "#871434",
    borderRadius: 12,
    padding: 16,
    height: 120,
    justifyContent: "space-between",
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  statsLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsLabel: {
    color: "white",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  recentRecords: {
    paddingLeft: 16,
  },
  recordCard: {
    width: 120,
    height: 180,
    backgroundColor: "#ccc",
    borderRadius: 12,
    marginRight: 8,
    position: "relative",
    overflow: "hidden",
  },
  recordTimeLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  recordImage: {
    width: 120,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  recordTimeLabelText: {
    color: "white",
    fontSize: 12,
  },
  gameSection: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  gameContent: {
    flexDirection: "row",
    padding: 16,
  },
  gameImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: "contain",
  },
  gameTextContainer: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gameSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  startButton: {
    backgroundColor: "#871434",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  startButtonText: {
    color: "white",
    fontSize: 14,
  },
  hospitalSection: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  hospitalContent: {
    flexDirection: "row",
    padding: 16,
  },
  hospitalImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: "contain",
  },
  hospitalTextContainer: {
    flex: 1,
  },
  hospitalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hospitalSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  findButton: {
    backgroundColor: "#871434",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  findButtonText: {
    color: "white",
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 20,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 12,
    color: "#871434",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
});
