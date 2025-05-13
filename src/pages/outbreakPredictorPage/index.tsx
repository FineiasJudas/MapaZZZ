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
  TextComponent,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { ArrowLeft, OctagonAlert } from "lucide-react-native";
import Logo from '../../assets/logo.png';

const { width, height } = Dimensions.get("window");

const OutbreakPredictorPage = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [zones, setZones] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock data
  const mockZones = [
    { id: '1', name: 'Cazenga', coords: { latitude: -8.8383, longitude: 13.2344 }, weight: 0.7, reports: 12, rain: 120, ponds: 5 },
    { id: '2', name: 'Luanda Sul', coords: { latitude: -8.8583, longitude: 13.2134 }, weight: 0.5, reports: 8, rain: 95, ponds: 3 },
    { id: '3', name: 'Talatona', coords: { latitude: -8.85, longitude: 13.2 }, weight: 0.3, reports: 4, rain: 75, ponds: 2 },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setUserLocation(loc.coords);
      }
      // Simulate fetch
      setTimeout(() => {
        setZones(mockZones);
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
        {/* Small map snapshot */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.snapshot}
          initialRegion={{
            ...item.coords,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          pointerEvents="none"
        >
          <Marker coordinate={item.coords} />
        </MapView>

        {/* Card below map */}
        <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)} activeOpacity={0.8}>
          <View style={styles.cardHeader}>
            <OctagonAlert
              size={24}
              color={item.weight > 0.6 ? '#D32F2F' : item.weight > 0.3 ? '#FFA000' : '#388E3C'}
            />
            <Text style={styles.zoneName}>{item.name}</Text>
            <Text style={styles.chanceText}>{chance}%</Text>
          </View>

          {expandedId === item.id && (
            <View style={styles.details}>
              <Text style={styles.detailText}>Relatórios: {item.reports}</Text>
              <Text style={styles.detailText}>Chuva (mm): {item.rain}</Text>
              <Text style={styles.detailText}>Águas paradas: {item.ponds}</Text>
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
        <ActivityIndicator size="large" color="#6D122C" style={{ marginTop: 80}}/>
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
  textContainer:{marginTop: height * 0.03,
  paddingHorizontal: width * 0.08},
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.02 },
  logo: { width: width * 0.085, height: width * 0.1, resizeMode: 'contain' },
  title: {fontSize: 18,
    fontWeight: "bold",
    color: "#6D122C", marginLeft: width * 0.02, marginBottom: height * 0.015 },
  listContent: { padding: width * 0.04 , marginHorizontal: width * 0.04},
  zoneContainer: { marginBottom: height * 0.05 },
  snapshot: { width: '100%', height: height * 0.25, borderRadius: 8},
  card: { backgroundColor: '#FFF', padding: width * 0.04, borderRadius: 10, marginTop: height * 0.02, marginHorizontal: width * 0.02, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  zoneName: { fontSize: 16, fontWeight: '600', color: '#000' },
  chanceText: { fontSize: 16, fontWeight: '600', color: '#000' },
  details: { marginTop: height * 0.010 },
  detailText: { fontSize: 14, color: '#555', marginBottom: height * 0.005 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default OutbreakPredictorPage;

