import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Locate,
  LogOut,
  MapPinned,
  Navigation,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react-native";
import { useAlert } from "../alertProvider/index";

const EvalsPage = ({ navigation }: any) => {
  interface DangerZone {
    id: string;
    image?: string;
    address?: string;
  }

  const [dangerZone, setDangerZone] = useState<DangerZone | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const { showAlert } = useAlert();
  // Busca os dados da zona de risco da API
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("Token");
      if (!token) {
        showAlert("erro", "Usuário não autorizado.", "Erro");
        navigation.navigate("Login");
        return;
      }
      const response = await fetch(
        "https://mapazzz.onrender.com/api/danger_zone/getZoneRandom",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.dangerZone === null) {
          await showAlert(
            "aviso",
            "Não há mais zonas para repostar.\nMuito obrigado pela sua participação.",
            "Aviso"
          );
          navigation.navigate("MapaPage");
          return;
        }
        setDangerZone(responseData.dangerZone);
      } else if (response.status === 401 || response.status === 403) {
        Alert.alert("Erro", "Você não tem permissão para acessar esses dados.");
        navigation.navigate("Login");
      } else if (response.status === 404) {
        await showAlert(
          "aviso",
          "Não há mais zonas para repostar.\nMuito obrigado pela sua participação.",
          "Aviso"
        );
        navigation.navigate("MapaPage");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      await showAlert("erro", "Ocorreu um erro ao buscar os dados.", "Erro");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  // funcao para pegar os dois ultimos endereços
  const getLastTwoAddresses = (address: string | undefined): string => {
    if (!address) return "";
    const addressParts: string[] = address.split(",");
    const lastTwoParts: string[] = addressParts.slice(-2);
    return lastTwoParts.join(", ");
  };

  // Simula envio de confirmação (like/dislike)
  interface HandleConfirmParams {
    confirm: string;
    dangerZoneId: string | undefined;
  }

  const handleConfirm = async ({
    confirm,
    dangerZoneId,
  }: HandleConfirmParams): Promise<void> => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `https://mapazzz.onrender.com/api/danger_zone/report/` + dangerZoneId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            status: confirm,
          }),
        }
      );
      const responseData: { message: string } = await response.json();
      if (response.ok) {
        await showAlert("sucesso", responseData.message, "Sucesso");
        await fetchData();
      } else {
        await showAlert("erro", responseData.message, "Erro");
      }
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      await showAlert("erro", "Ocorreu um erro ao enviar a avaliação.", "Erro");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={style.mainConteiner}>
      {refreshing && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <StatusBar
        backgroundColor={"transparent"}
        animated={true}
        translucent={true}
        barStyle={"dark-content"}
      />

      {dangerZone?.image ? (
        <>
          {/* Imagem */}
          <Image
            source={{ uri: dangerZone.image }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              flex: 1,
              alignSelf: "center",
            }}
            resizeMode="cover"
            resizeMethod="scale"
          />
          {/* Localização da Foto */}
          <View style={style.headerButtons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("initPage");
              }}
              style={{
                padding: 5,
                borderRadius: 20,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <X color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowLocation(true);

                setTimeout(() => {
                  setShowLocation(false);
                }, 5000);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 20,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MapPinned size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {showLocation && (
            <View style={style.locationContainer}>
              <Text style={style.locationText}>
                {getLastTwoAddresses(dangerZone?.address)}
              </Text>
            </View>
          )}

          {/* Botões de Avaliação */}
          <View style={style.optionButtons}>
            <TouchableOpacity
              style={style.optionsL}
              onPress={() =>
                handleConfirm({ confirm: "yes", dangerZoneId: dangerZone?.id })
              }
              disabled={refreshing}
            >
              <ThumbsUp size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.optionsR}
              onPress={() =>
                handleConfirm({ confirm: "no", dangerZoneId: dangerZone?.id })
              }
              disabled={refreshing}
            >
              <ThumbsDown size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Nenhuma zona de perigo disponível</Text>
        </View>
      )}
    </View>
  );
};
export default EvalsPage;
