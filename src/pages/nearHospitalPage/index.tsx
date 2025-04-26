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
      name: "Hospital geral",
      address: "Talatona, Luanda",
      phone: "940 929 955",
      latitude: -8.839987,
      longitude: 13.245567,
      open_now: true,
      distance: "2.5 km",
      duration: "5mins",
    },
  ]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getHospitals = async () => {
    try {
      setLoading(false);
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

  return (
    <View style={style.Container}>
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#7f1734" size={30} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={{ width: "85%" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15,
              color: "#7f1734",
              marginLeft: 30,
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
                    color="#7f1734"
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
          <ActivityIndicator size="large" color="#7F1734" />
          <Text>Procurando hospitais próximos...</Text>
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
