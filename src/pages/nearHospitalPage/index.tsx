import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Pressable,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft, Hospital, MapPin } from "lucide-react-native";
import Logo from "../../assets/logo.png";
import { style } from "./style";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HospitalListScreen = ({ navigation }: any) => {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Luanda Medical Center",
      address: "R. Amílcar Cabral 3, Talatona, Luanda",
      phone: "222 720 888",
      latitude: -8.918270,
      longitude: 13.173910,
      open_now: true,
      distance: "2.1 km",
      duration: "6 mins",
    },
    {
      id: 2,
      name: "Clínica Sagrada Esperança - Talatona",
      address: "Talatona, Luanda",
      phone: "222 693 195",
      latitude: -8.918880,
      longitude: 13.185480,
      open_now: true,
      distance: "1.8 km",
      duration: "5 mins",
    },
    {
      id: 3,
      name: "Clínica Multiperfil",
      address: "Via S8, Talatona, Luanda",
      phone: "222 692 900",
      latitude: -8.910000,
      longitude: 13.190000,
      open_now: true,
      distance: "3.2 km",
      duration: "8 mins",
    },
    {
      id: 4,
      name: "Clínica Girassol Talatona",
      address: "Via Samba, Talatona, Luanda",
      phone: "222 632 700",
      latitude: -8.917300,
      longitude: 13.202600,
      open_now: true,
      distance: "2.9 km",
      duration: "7 mins",
    },
    {
      id: 5,
      name: "Clínica Global Diagnóstico",
      address: "Via Expressa, Talatona, Luanda",
      phone: "222 639 999",
      latitude: -8.921500,
      longitude: 13.207100,
      open_now: true,
      distance: "3.0 km",
      duration: "7 mins",
    },
    {
      id: 6,
      name: "Clínica Sorriso Dourado",
      address: "Talatona Shopping, Luanda",
      phone: "926 442 605",
      latitude: -8.921900,
      longitude: 13.201800,
      open_now: true,
      distance: "2.6 km",
      duration: "6 mins",
    },
  ]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getHospitals = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        "https://mapazzz.onrender.com/api/hospital/nearby",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        }
      );
      const dados = await response.json();
      if (response.ok && dados.length) {
        setHospitals(dados);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(true);
    }
  };

  const getDistanceColor = (distance: number) => {
    return "#4CAF50";
  };

  const handleCreateTarget = async () => {
    await AsyncStorage.setItem("GEO", JSON.stringify(selectedHospital));
    navigation.navigate("MapaPage");
  };

  useEffect(() => {
    getHospitals();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true // Impede o comportamento padrão do botão voltar
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove() // Limpeza ao desmontar
  }, [navigation])

  return (
    <View style={style.Container}>
      <View style={style.logoX}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#6D122C" size={30} style={{ marginTop: 6 }} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={style.conteinar}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#6D122C",
            marginLeft: 18,
          }}>
          Hospitais próximos:
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        {loading ? (
          <ScrollView style={style.content}>
            {hospitals.map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                onPress={() => {
                  setSelectedHospital(hospital);
                  setModalVisible(true);
                }}>
                <View style={style.infCamp}>
                  <Hospital
                    color="#6D122C"
                    style={{ margin: 5, marginRight: 8 }}
                  />
                  <View style={style.styleText}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={style.notificationText}>
                      {hospital.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}>
                      <MapPin
                        color={getDistanceColor(hospital.distance)}
                        size={16}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: getDistanceColor(hospital.distance),
                          marginLeft: 5,
                        }}>
                        {hospital.distance} de distância
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <>
            <ActivityIndicator size="large" color="#6D122C" />
            <Text >Procurando hospitais próximos...</Text>
          </>
        )}
      </View>

      {/* Modal com detalhes do hospital */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setModalVisible(false)}>
          <View
            style={{
              position: "absolute",
              bottom: 100,
              left: 50,
              right: 50,
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5,
            }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {"Detalhes"}
            </Text>
            <View
              style={{
                justifyContent: "flex-start",
              }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                {selectedHospital?.name || "Detalhes do Hospital"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>📍 Endereço: </Text>
                {selectedHospital?.address || "N/A"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>📞 Telefone: </Text>
                {selectedHospital?.phone || "N/A"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>🕐 Aberto agora: </Text>
                {selectedHospital?.open_now ? "Sim" : "Não"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>📏 Distância: </Text>
                {selectedHospital?.distance || "N/A"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>⏱️ Tempo estimado: </Text>
                {selectedHospital?.duration || "N/A"}
              </Text>
            </View>

            <TouchableOpacity onPress={handleCreateTarget}>
              <Text
                style={{ fontSize: 16, color: "#007BFF", marginVertical: 10 }}>
                Criar Target no Mapa
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HospitalListScreen;
