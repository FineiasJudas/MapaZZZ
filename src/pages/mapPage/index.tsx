import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { style } from "./style"
import MenuIcon from "../../assets/menuIcon.png";
import NotifyIcon from "../../assets/notifyIcon.png";
import Logo from "../../assets/logo.png";
import mapStyle from "../../../mapStyle.json"; // Estilo personalizado
import CarIcon from "../../assets/pedestre.png"; // Ícone do carro

export default function mapPage() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão negada para acessar a localização.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    })();
  }, []);

  return (
    <View style={style.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        showsUserLocation
        customMapStyle={mapStyle} // Aplica o estilo escuro
        showsTraffic // Mostra trânsito ao vivo
      >
        {location && (
        <Marker coordinate={location.coords}>
          <Image source={CarIcon} style={style.meIcon} />
        </Marker>
      )}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  
});