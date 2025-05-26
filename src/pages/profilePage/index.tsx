import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {
  ChevronRight,
  MapPin,
  GraduationCap,
  Image as ImageIcon,
  LogOut,
  ShoppingBag,
  MapPlus, 
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = ({ navigation } : any) => {
  const [name, setName] = useState("Visitante");
  const [localizacao, setLocalizacao] = useState("Obtendo a Localização...");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("User");
      if (data) {
        const parse = JSON.parse(data);
        setName(parse.name);
        setLocalizacao(parse.address);
        if (parse.photo) setProfileImage(parse.photo);
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permissão para acessar as fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled)
    {
      setProfileImage(result.uri);
      // Save to storage
      const userStr = await AsyncStorage.getItem('User');
      if (userStr)
      {
        const userObj = JSON.parse(userStr);
        userObj.photo = result.uri;
        await AsyncStorage.setItem('User', JSON.stringify(userObj));
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('Token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={ profileImage ? { uri: profileImage } : require('../../assets/pedestre.png') }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <ImageIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{name}</Text>
            <View style={styles.locationContainer}>
              <MapPin color="#6d1625" size={18} style={{ marginRight: 6 }} />
              <Text style={styles.statLabel}>{localizacao}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.menuContainer}>
        
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: "#f5f5f5" },
              ]}>
              <GraduationCap size={20} color="#6d1625" />
            </View>
            <Text style={styles.menuLabel}>Meu ranking</Text>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: "#f5f5f5" },
              ]}>
              <ImageIcon size={20} color="#6d1625" />
            </View>
            <Text style={styles.menuLabel}>Meus Registros</Text>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("MapaPage")}>
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: "#f5f5f5" },
              ]}>
              <MapPlus size={20} color="#6d1625"/>
            </View>
            <Text style={styles.menuLabel}>Zonas de Risco</Text>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: "#f5f5f5" },
              ]}>
              <ShoppingBag size={20} color="#6d1625" />
            </View>
            <Text style={styles.menuLabel}>Meus Recursos</Text>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>
          {/* Outros itens... */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#6d1625',
    height: 160,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileInfoContainer: { flex: 1, alignItems: 'center', marginTop: -60 },
  profileImageContainer: { position: 'relative' },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#ccc',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6d1625',
    borderRadius: 20,
    padding: 6,
  },
  statsContainer: { width: '80%', paddingVertical: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statLabel: { fontSize: 16, color: '#888' },
  menuContainer: { width: '100%', paddingHorizontal: 30, marginTop: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  menuIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: { flex: 1, fontSize: 16 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  logoutText: { fontSize: 16, color: '#ff3b30' },
});

export default ProfilePage;