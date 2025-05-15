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
  Puzzle,
  Camera,
  TriangleAlert,
  User,
  CheckCheck,
  Cog,
  Split,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import logo from "../../assets/logo.png";
import bySalonis from "../../assets/bySalōnis.png";
import { style } from "./style";
import useSocketNotification from "../utils/socketio";

const HomePage = ({ navigation }: any) => {
  const { showAlert, showConfirmAlert } = useAlert();
  const [location, setLocation] = useState("Obtendo a localização...");
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("Visitante");
  const [userPoints, setUserPoints] = useState(0);
  useSocketNotification();
  // Tipagem opcional (para TypeScript, mas também ajuda a entender o formato)
  type DangerZone = {
    id: string;
    image: string;
    address: string;
  };
  const [regions, setRegions] = useState<DangerZone[]>([]);

  const getFirstName = (name) => {
    return name.split(" ")[0];
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
          setUsername(getFirstName(result.data.name));
          setUserPoints(result.data.points || 0);
          setRegions(result.detalhes.danger_zones);
          await AsyncStorage.setItem(
            "@cachedUsername",
            getFirstName(result.data.name)
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
        setUsername(getFirstName(Data.name));
        setUserPoints(Data.points);
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

  const handleBackPress = async () => {
    const confirmed = await showConfirmAlert(
      "Deseja terminar a sessão?",
      "Confirmação"
    );

    if (confirmed) {
      BackHandler.exitApp(); // Ou sua lógica para terminar sessão
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Início</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Puzzle
              color="#6D122C"
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
            <Bell color="#6D122C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.userInfoContainer}>
            <TouchableOpacity
              style={styles.userIcon}
              onPress={() => navigation.navigate("ProfilePage")}>
              <User color="#6D122C" size={30} />
            </TouchableOpacity>
            <View>
              <Text style={styles.welcomeText}>Bem-vindo, {username}</Text>
              <TouchableOpacity
                style={{ alignItems: "center", flexDirection: "row" }}>
                <MapPin color="#6D122C" size={18} style={{ marginRight: 6 }} />
                <Text style={styles.statLabel}>{location}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionButtons}>
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
              <Text style={styles.actionButtonText}>Reportar </Text>
              <Camera color="#6D122C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text
                style={styles.actionButtonText}
                onPress={async () => {
                  navigation.navigate("MapaPage");
                }}>
                Zonas de Risco
              </Text>
              <TriangleAlert color="#6D122C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cartao de registros */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>+{userPoints}</Text>
            <View style={styles.statsLabelContainer}>
              <Text style={styles.statsLabel}>Pontos acumulados</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>+115</Text>
            <View style={styles.statsLabelContainer}>
              <Text style={styles.statsLabel}>Zonas de Risco</Text>
            </View>
          </View>
        </View>

        {/* Registros recentes */}
        <Text style={styles.sectionTitle}>Registros Recentes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentRecords}>
          {regions.map((item) => (
            <View key={item.id} style={styles.recordCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.recordImage} // você vai definir essa estilização abaixo
                resizeMode="cover"
              />
              <View style={styles.recordTimeLabel}>
                <Text style={styles.recordTimeLabelText}>{item.address}</Text>
              </View>
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
                onPress={() => navigation.navigate("nearHospitalPage")}>
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
                onPress={() => navigation.navigate("OutbreakPredictorPage")}>
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
          <User color="#6D122C" />
          <Text style={styles.navButtonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("nearHospitalPage")}>
          <Hospital color="#6D122C" />
          <Text style={styles.navButtonText}>Hospitais</Text>
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
          <CheckCheck color="#6D122C" />
          <Text style={styles.navButtonText}>Verificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("configPage")}>
          <Cog color="#6D122C" />
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
  header: {
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomColor: "#e0e0e0",
    elevation: 2
  },
  headerTitle: {
    color: "#6D122C",
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
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    padding: 30
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
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4
  },
  actionButtonText: {
    fontSize: 14,
    color: "#6D122C",
  },
  statsContainer: {
    flexDirection: "row",
    margin: 16,
    gap: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: "#6D122C",

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
    backgroundColor: "#6D122C",
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
    backgroundColor: "#6D122C",
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
    color: "#6D122C",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
  },
});

export default HomePage;
