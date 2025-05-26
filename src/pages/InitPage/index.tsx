import React, { useState, useEffect } from "react";
import { useAlert } from "../alertProvider/index";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Settings,
  BackHandler,
} from "react-native";
import {
  Bell,
  MapPin,
  Earth,
  Hospital,
  OctagonAlert,
  Gamepad2,
  Siren,
  LogOut,
  Puzzle,
  Camera,
  TriangleAlert,
  User,
  CheckCheck,
  Cog,
  Split,
  Sun,
  Cloud,
  CloudRain,
  Zap,
  Snowflake,
  CloudFog,
  Thermometer,
  ImageUp,
  BadgeCheck,
  Bolt,
  Cross,
  ChevronRight,
  MapPlus,
  Box,
  Archive,
  BellElectric,
  Package2,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import logo from "../../assets/logo.png";
import bySalonis from "../../assets/bySalōnis.png";
import { style } from "./style";
import useSocketNotification from "../utils/socketio";
import { StatusBar } from 'react-native';
import App from "../photo";
import RNMinimizeApp from 'react-native-minimize';
import { LinearGradient } from "expo-linear-gradient";

const HomePage = ({ navigation }: any) => {
  const [weather, setWeather] = useState<{ temp: string; condition: string }>({
    temp: "--°C",
    condition: "Carregando..."
  });
  const { showAlert, showConfirmAlert } = useAlert();
  const [location, setLocation] = useState("Obtendo a localização...");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("Visitante");
  const [userPoints, setUserPoints] = useState(formatPoints(0));
  const [userLength, setUserLength] = useState(1);
  const [dangerLength, setDangerLength] = useState(1);
  useSocketNotification();

  const weatherIcons = {
    Clear: <Sun color="#F59E0B" size={18} />,
    Clouds: <Cloud color="#4B5563" size={18} />,
    Rain: <CloudRain color="#3B82F6" size={18} />,
    Thunderstorm: <Zap color="#F59E0B" size={18} />,
    Snow: <Snowflake color="#93C5FD" size={18} />,
    Mist: <CloudFog color="#6B7280" size={18} />,
    default: <Thermometer color="#6D122C" size={18} />
  };

  const weatherColors = {
    hot: "#DC2626",       // >30°C
    warm: "#EA580C",      // 20-30°C
    mild: "#16A34A",      // 10-19°C
    cool: "#3B82F6",      // 0-9°C
    cold: "#1D4ED8"       // <0°C
  };

  function formatPoints(number) {
    return number.toString().padStart(4, '0');
  }

  const getTemperatureColor = (tempStr: string) => {
    const temp = parseInt(tempStr.replace('°C', ''));
    if (temp >= 30) return weatherColors.hot;
    if (temp >= 20) return weatherColors.warm;
    if (temp >= 10) return weatherColors.mild;
    if (temp >= 0) return weatherColors.cool;
    return weatherColors.cold;
  };

  // Clima request
  const getWeather = async (lat: number, lon: number) => {
    try {
      const apiKey = '597816ec128b20a1e0d19827ed21a6f8';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`
      );
      const data = await response.json();

      if (data.weather) {
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;

        setWeather({
          temp: `${temp}°C`,
          condition
        });

        await AsyncStorage.setItem("@cachedWeather", JSON.stringify({
          temp: `${temp}°C`,
          condition
        }));
      }
    } catch (error) {
      const cachedWeather = await AsyncStorage.getItem("@cachedWeather");
      if (cachedWeather) {
        setWeather(JSON.parse(cachedWeather));
      }
    }
  };

  // Tipagem opcional (para TypeScript, mas também ajuda a entender o formato)
  type DangerZone = {
    id: string;
    image: string;
    address: string;
  };
  const [regions, setRegions] = useState<DangerZone[]>([]);

  const getName = (name) => {
    const first = name.split(" ")[0] || " ";
    const last = name.split(" ")[1] || ' ';
    const full = `${first} ${last}`;
    return full;
  };

  const details = async () => {
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        const response = await fetch("https://mapazzz.onrender.com/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });
        
        const result = await response.json();
        if (response.ok) {
          const full_data = {
            name: getName(result?.data?.name ?? ""),
            points: formatPoints(result?.data?.points ?? 0),
            utilizadores: result?.detalhes?.quantidade_users ?? 1,
            zonas: result?.detalhes?.quantidade_danger_zones ?? 0
          };
          setDangerLength(result?.detalhes?.quantidade_danger_zones);
          setUserLength(result?.detalhes?.quantidade_users);
          setUsername(getName(result.data.name));
          setUserPoints(formatPoints(result.data.points) || formatPoints(0));
          setRegions(result.detalhes.danger_zones);
          await AsyncStorage.setItem("cachFullData", JSON.stringify(full_data));
          await AsyncStorage.setItem(
            "@cachedUsername",
            getName(result.data.name)
          );
          await AsyncStorage.setItem("@cachedUserPoints", result.data.points);
        }
      }
    } catch (error) {
      console.log("Erro ao buscar detalhes:", error);
    }
  };
  const getLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permissão negada");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Chama a nova função do clima
      await getWeather(latitude, longitude);
      // Reverse geocoding para obter nome da localidade
      let addressArray = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressArray.length > 0) {
        const address = addressArray[0];

        // Exemplo: "Luanda, Angola"
        const fullAddress = `${address.district || address.city || address.subregion
          }, ${address.country || address.region}`;
        setLocation(fullAddress);
        await AsyncStorage.setItem("@cachedLocation", fullAddress);
      } else {
        setLocation("Localidade não encontrada");
      }
    } catch (err) {
      // console.error(err);
      const cachedLocation = await AsyncStorage.getItem("@cachedLocation");
      if (cachedLocation) {
        setLocation(cachedLocation);
      } else {
        setLocation("Erro ao obter localização");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = async () => {
    const token = await AsyncStorage.getItem("Token");
    if (token) {
      setLogged(true);
    }
  };

  useEffect(() => {
    (async () => {
      const User = await AsyncStorage.getItem("User");

      const Data = User ? JSON.parse(User) : null;
      if (Data) {
        setUsername(getName(Data.name));
        setUserPoints(formatPoints(Data.points));
      }
      const fullData = await AsyncStorage.getItem("cachFullData");
      const detalhes = fullData ? JSON.parse(fullData) : null;
      if (detalhes !== null) {
        setDangerLength(detalhes.zonas);
        setUserLength(detalhes.utilizadores);
      }
    })();
    checkPermission();
    getLocation();
    details();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        handleBackPress();
        return true; // Impede o comportamento padrão
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    (async () => {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) setLogged(true);
      else setLogged(false);
    })();
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      await AsyncStorage.removeItem("User");
      setLogged(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleBackPress = async () => {
    //--
    RNMinimizeApp.minimizeApp(); // Minimiza o app
    return true; // evita o comportamento padrão (fechar o app)
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            style={styles.userIcon}
            onPress={() => navigation.navigate("ProfilePage")}>
            <User color="#000" size={25} />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeText}>{username}</Text>
            <TouchableOpacity
              style={{ alignItems: "center", flexDirection: "row" }}>
              <MapPin color="#6d1625" size={13} style={{ marginRight: 6 }} />
              <Text style={styles.statLabel}>{location}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Puzzle
              color="#6d1625"
              onPress={async () => {
                if (logged) navigation.navigate("GamingPage");
                else {
                  navigation.navigate("Login");
                  await showAlert(
                    "aviso",
                    "Você precisa estar logado para acessar esta página, tente Logar",
                    "Atenção"
                  );
                }
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={async () => {
              if (logged) navigation.navigate("notifyPage");
              else {
                navigation.navigate("Login");
                await showAlert(
                  "aviso",
                  "Você precisa estar logado para acessar esta página, tente Logar",
                  "Atenção"
                );
              }
            }}>
            <Package2 color="#6d1625" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.headerInf}>
          <View style={styles.ratInf}>
            <View >
              <Text style={{ fontWeight: "bold", fontSize: 45, color: '#6d1625', marginLeft: 3, letterSpacing: 2 }}>{userPoints}</Text>
              <View style={{ paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#6d1625', borderRadius: 18 }}>
                <Text style={{ fontSize: 12, color: '#fff' }}>Pontos acumulados</Text>
              </View>

            </View>

          </View>
          <View style={{ alignItems: 'flex-end', marginBottom: 38 }}>
            <View style={styles.infoRow}>
              {weatherIcons[weather.condition as keyof typeof weatherIcons] || weatherIcons.default}
              <Text style={[styles.infoText, { color: getTemperatureColor(weather.temp) }]}>
                {weather.temp} - {weather.condition}
              </Text>
            </View>
          </View>
        </View>
        <View >
          <View style={styles.actionButtonsCont}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                if (logged) navigation.navigate("reportPage");
                else {
                  navigation.navigate("Login");
                  await showAlert(
                    "aviso",
                    "Você precisa estar logado para acessar esta página, tente Logar",
                    "Atenção"
                  );
                }
              }}>
              <Siren color="#000" />
              <Text style={styles.actionButtonText}>Reportar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MapPlus color="#000" />
              <Text
                style={styles.actionButtonText}
                onPress={async () => {
                  navigation.navigate("MapaPage");
                }}>

                Zonas de Risco
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cartao de registros */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>+{userLength}</Text>
            <View style={styles.statsLabelContainer}>
              <Text style={styles.statsLabel}>Utilizadores</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text
              onPress={async () => {
                navigation.navigate("MapaPage");
              }}
              style={styles.statsNumber}>+{dangerLength}</Text>
            <Text style={styles.statsLabel}>Zonas de Risco</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Registros Recentes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentRecords}>
          {regions.map((item) => (
            <View key={item.id} style={styles.recordCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.recordImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.6)', 'transparent']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.recordTimeLabel}
              >
                <Text style={styles.recordTimeLabelText}>{item.address}</Text>
              </LinearGradient>

            </View>
          ))}
        </ScrollView>

        {/* Seccao de Jogos */}
        <View style={styles.gameSection}>
          <View style={styles.gameContent}>
            <Image
              source={require("../../assets/GameSugeste.png")}
              style={styles.gameImage}
            />
            <View style={styles.gameTextContainer}>
              <Text style={styles.gameTitle}>Esperimente o Malária Quiz!</Text>
              <Text style={styles.gameSubtitle}>
                Se divirta respondendo questões sobre a Malária e se torne num
                grande mestre!
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={async () => {
                  if (logged) navigation.navigate("GamingPage");
                  else {
                    navigation.navigate("Login");
                    await showAlert(
                      "aviso",
                      "Você precisa estar logado para acessar esta página, tente Logar",
                      "Atenção"
                    );
                  }
                }}>
                <Text style={styles.startButtonText}>Iniciar agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hospital Section */}
        <View style={styles.hospitalSection}>
          <View style={styles.hospitalContent}>
            <Image
              source={require("../../assets/HospitalSugest.png")}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalTextContainer}>
              <Text style={styles.hospitalTitle}>
                Encontre hospitais mais próximos de si!
              </Text>
              <Text style={styles.hospitalSubtitle}>
                Saiba a que distância estás do unidade hospitalar mais próxima e
                receba o atendimente o mais rápido possível!
              </Text>
              <TouchableOpacity
                style={styles.findButton}
                onPress={async () => {
                  if (logged) navigation.navigate("nearHospitalPage");
                  else {
                    navigation.navigate("Login");
                    await showAlert(
                      "aviso",
                      "Você precisa estar logado para acessar esta página, tente Logar",
                      "Atenção"
                    );
                  }
                }}>
                <Text style={styles.findButtonText}>Encontrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Seção de Previsão de Surtos */}
        <View style={styles.hospitalSection}>
          <View style={styles.hospitalContent}>
            <Image
              source={require("../../assets/malariaSurto.png")} // Adicione um artefato visual
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalTextContainer}>
              <Text style={styles.hospitalTitle}>Previsão de Surtos de Malária</Text>
              <Text style={styles.hospitalSubtitle}>
                Veja as áreas com risco de surto nos próximos dias e tome ações preventivas!
              </Text>
              <TouchableOpacity
                style={styles.findButton}
                onPress={async () => {
                  if (logged) navigation.navigate("OutbreakPredictorPage");
                  else {
                    navigation.navigate("Login");
                    await showAlert(
                      "aviso",
                      "Você precisa estar logado para acessar esta página, tente Logar",
                      "Atenção"
                    );
                  }
                }}>
                <Text style={styles.findButtonText}>Ver Previsão</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={async () => {
            if (logged) navigation.navigate("ProfilePage");
            else {
              navigation.navigate("Login");
              await showAlert(
                "aviso",
                "Você precisa estar logado para acessar esta página, tente Logar",
                "Atenção"
              );
            }
          }}>
          <User color="#6d1625" />
          <Text style={styles.navButtonText}>Perfil</Text>
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
          <BadgeCheck color="#6d1625" />
          <Text style={styles.navButtonText}>Verificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={async () => {
            if (logged) navigation.navigate("nearHospitalPage");
            else {
              navigation.navigate("Login");
              await showAlert(
                "aviso",
                "Você precisa estar logado para acessar esta página, tente Logar",
                "Atenção"
              );
            }
          }}>
          <Cross color="#6d1625" />
          <Text style={styles.navButtonText}>Hospitais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={async () => {
            if (logged) navigation.navigate("configPage");
            else {
              navigation.navigate("Login");
              await showAlert(
                "aviso",
                "Você precisa estar logado para acessar esta página, tente Logar",
                "Atenção"
              );
            }
          }}>
          <Bolt color="#6d1625" />
          <Text style={styles.navButtonText}>Definições</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  weatherText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: 4,
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
  header: {
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderBottomColor: "#e0e0e0",
    elevation: 2
  },
  headerTitle: {
    color: "#6d1625",
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
    borderRadius: 30,
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    padding: 25
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
  actionButtonsCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 15,
    backgroundColor: "#F5F5F5",
    paddingBottom: 15
  },
  headerInf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: "#F5F5F5",
    paddingBottom: 15
  },
  ratInf: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: '48%',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#E4E4E4",
    borderColor: '#D8D8D8',
    borderRadius: 15,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    color: "##1C1C1C",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 1,
    marginBottom: 14
  },
  statsCard: {
    flex: 1,
    backgroundColor: "#6d1625",
    padding: 16,
    height: 60,
    justifyContent: "center",
  },
  statsNumber: {
    fontSize: 24,
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  recordTimeLabelText: {
    color: "white",
    fontSize: 12,
  },
  recordImage: {
    width: 120,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
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
    backgroundColor: "#6d1625",
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
    backgroundColor: "#6d1625",
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
    flexDirection: "row",
    backgroundColor: "white",
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
    elevation: 10
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 12,
    color: "#6d1625",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
});

export default HomePage;