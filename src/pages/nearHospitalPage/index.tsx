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
  SafeAreaView,
} from "react-native";
import { ArrowLeft, Hospital, MapPin } from "lucide-react-native";
import Logo from "../../assets/logo.png";
import { style } from "./style";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  open_now: boolean;
  distance: string;
  distance_km: string;
  duration: string;
}
[];

const HospitalListScreen = ({ navigation }: any) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: 1,
      name: "Luanda Medical Center",
      address: "R. Amílcar Cabral 3, Talatona, Luanda",
      phone: "222 720 888",
      latitude: -8.91827,
      longitude: 13.17391,
      open_now: true,
      distance: "2.1 km",
      distance_km: "2.1 km",
      duration: "6 mins",
    },
  ]);

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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
        await AsyncStorage.setItem("cachNearyHospitals", JSON.stringify(dados));
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
    (async () =>{
      const data = await AsyncStorage.getItem("cachNearyHospitals");
      const hospitals = data ? JSON.parse(data) : null;
      if (hospitals)
        setHospitals(hospitals);
    })();

    getHospitals();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true; // Impede o comportamento padrão do botão voltar
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Limpeza ao desmontar
  }, [navigation]);

  return (
    <SafeAreaView style={style.Container}>
      <View style={style.logoX}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#6d1625" size={30} style={{ marginTop: 6 }} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={style.conteinar}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Hospitais Próximos
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "regular",
            color: "#999",
          }}
        >
          Clique no hospital para ver mais detalhes
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginTop: 20,
          alignItems: "flex-start",
          width: "88%",
          marginHorizontal: "auto",
        }}
      >
        {loading ? (
          <ScrollView style={style.content}>
            {hospitals.map((hospital) => (
              <TouchableOpacity
                style={{ width: "100%" }}
                key={hospital.id}
                onPress={() => {
                  setSelectedHospital(hospital);
                  setModalVisible(true);
                }}
              >
                <View style={style.infCamp}>
                  <View style={style.styleText}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={style.notificationText}
                    >
                      {hospital.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#6d1625",

                          fontWeight: "bold",
                          paddingHorizontal: 12,
                          paddingVertical: 3,
                          borderRadius: 6,
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <Text style={{}}>{hospital.distance_km}/Km</Text> de
                        distância
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ActivityIndicator size="large" color="#6d1625" />
          </View>
        )}
      </View>

      {/* Modal com detalhes do hospital */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setModalVisible(false)}
        >
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
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {"Detalhes"}
            </Text>
            <View
              style={{
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
              >
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
                {selectedHospital?.distance_km || "N/A"}
              </Text>

              <Text>
                <Text style={{ fontWeight: "bold" }}>⏱️ Tempo estimado: </Text>
                {selectedHospital?.duration || "N/A"}
              </Text>
            </View>

            <TouchableOpacity onPress={handleCreateTarget}>
              <Text
                style={{ fontSize: 16, color: "#007BFF", marginVertical: 10 }}
              >
                Criar Target no Mapa
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HospitalListScreen;