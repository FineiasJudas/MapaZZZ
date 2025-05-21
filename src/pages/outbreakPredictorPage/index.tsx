// OutbreakPredictorPage.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
// Removed MapView and Marker imports
import * as Location from "expo-location";
import { ArrowLeft, AwardIcon, OctagonAlert } from "lucide-react-native";
import Logo from '../../assets/logo.png';
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OutbreakPredictorPage = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [zones, setZones] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function getNameRegion(address: any) {
    const str = address.split(",");
    if (str[str.length - 1] === '' || str[str.length - 1] === " ")
      str.pop();
    str.join(",");
    let name = str[str.length - 1].substr(0, 20);
    if (str[str.length - 1].length > 20)
      name = `${name}...`;
    return name;
  }


  const getZonesMostAffected = async () => {
    const url = "https://mapazzz.onrender.com/api/hospital/most_effected";
    try {
      const respose = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await respose.json();
      if (respose.ok) {
        const mostAffectedZones = await data.mostAffectedZones;
        const getData = mostAffectedZones.map((each: any, index: any) => {
          let color = "";
          if (each.level == "heigh")
            color = "#D32F2F";
          else if (each.level == "medium")
            color = "#FFA000"
          else
            color = "#388E3C"
          const objects = each.objectsFinds || ["Sem"];

          return {
            id: each.id,
            name: getNameRegion(each.address),
            photo: each.photo,
            number_checkers: each.number_checkers || 0,
            level: each.level,
            color: color,
            objectsFinds: objects.join(","),
            weight: ((index + 93) * 7) / 10,
          }
        })
        await AsyncStorage.setItem("zonesMostAffected", JSON.stringify(getData));
        setZones(getData);
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: "Erro na conexão com a internet",
          position: 'top',
        });
      }
    } catch (error) {
      console.log("Erro ao pegar as zonas", error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: "Erro na conexão com a internet",
        position: 'top',
      });
    }
  }

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("zonesMostAffected");
      const zonesMostAffected = data ? JSON.parse(data) : null;
      if (zonesMostAffected)
        setZones(zonesMostAffected);
    })();
    getZonesMostAffected();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setUserLocation(loc.coords);
      }
      // Simulate fetch
      setTimeout(() => {
        //setZones(mockZones);
        setLoading(false);
      }, 1000);
    })();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: any) => {
    const chance = Math.round(item.weight * 100);
    return (
      <View style={styles.zoneContainer}>
        {/* Zone image */}
        <Image source={{ uri: item.photo }} style={styles.snapshot} />

        {/* Card below image */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <OctagonAlert
              size={24}
              color={item.color}
            />
            <Text style={styles.zoneName}>{item.name}</Text>
            <Text style={styles.chanceText}>{item.weight}%</Text>
          </View>

          {expandedId === item.id && (
            <View style={styles.details}>
              <Text style={styles.detailText}>Relatórios: {item.number_checkers}</Text>
              <Text style={styles.detailText}>Nível: {item.level}</Text>
              <Text style={styles.detailText}>Objectos: {item.objectsFinds}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#6D122C" size={30} />
          </TouchableOpacity>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Previsão de Surtos - Zonas</Text>
        </View>
        <ActivityIndicator size="large" color="#6D122C" style={{ marginTop: 80 }} />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#6D122C" size={30} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Previsão de Surtos - Zonas</Text>
      </View>

      <FlatList
        data={zones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  textContainer: {
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
  },
  logo: { width: width * 0.085, height: width * 0.1, resizeMode: 'contain' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D122C',
    marginLeft: width * 0.02,
    marginBottom: height * 0.015,
  },
  listContent: { padding: width * 0.04, marginHorizontal: width * 0.04 },
  zoneContainer: { marginBottom: height * 0.05 },
  snapshot: { width: '100%', height: height * 0.25, borderRadius: 8 },
  card: {
    backgroundColor: '#FFF',
    padding: width * 0.04,
    borderRadius: 10,
    marginTop: height * 0.02,
    marginHorizontal: width * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  zoneName: { fontSize: 16, fontWeight: '600', color: '#000' },
  chanceText: { fontSize: 16, fontWeight: '600', color: '#000' },
  details: { marginTop: height * 0.010 },
  detailText: { fontSize: 14, color: '#555', marginBottom: height * 0.005 },
});

export default OutbreakPredictorPage;

