import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import {
  User,
  Lock,
  Shield,
  Trash,
  ChevronRight,
  LogOut,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlert } from "../../alertProvider/index";

const SettingsPage = ({ navigation} : any) => {
  const { showAlert, showConfirmAlert } = useAlert();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    (async () => {
      const Token = await AsyncStorage.getItem("Token");
      setLogged(!!Token);
    })();
  }, []);

  const logOut = async () => {
    await AsyncStorage.multiRemove(["Token", "User", "cachNotify"]);
    setLogged(false);
    navigation.navigate("Login");
  };

  const handleLogoutPress = async () => {
    const confirmed = await showConfirmAlert(
      "Ao concluir esta ação irá eliminar sua conta e todos os seus dados serão apagados. Tens a certaza?",
      "Atenção"
    );
    if (confirmed) logOut();
    showAlert("sucesso", "Conta eliminada com sucesso!", "Sucesso");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Segurança e Privacidade</Text>
      </View>

      <ScrollView style={styles.settingsContainer}>

        {/* Segurança e Privacidade */}
        <Text style={styles.sectionTitle}></Text>
        <View style={styles.settingsGroup}>
          {/* Permissões */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => ToastAndroid.show("Funcionalidade ou secção não disponível!", ToastAndroid.LONG)}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Permissões</Text>
            </View>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>

          {/* Login e Senha */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => ToastAndroid.show("Funcionalidade ou secção não disponível!", ToastAndroid.LONG)}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Login e Senha</Text>
            </View>
            <ChevronRight size={20} color="#6d1625" />
          </TouchableOpacity>

          {/* Eliminar Conta */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleLogoutPress()}

          >
            <View style={styles.settingInfo}>
              <Text style={{ fontSize: 16 , color: '#ff3b30' }}  >Eliminar Conta</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { color: '#6d1625', fontSize: 18, fontWeight: 'bold' },
  settingsContainer: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
  settingsGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center', marginLeft: 8},
  settingIcon: { marginRight: 16 },
  settingLabel: { fontSize: 16 ,},
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 12,
    marginTop: 24,
    padding: 14,
  },
  logoutIcon: { marginRight: 12 },
  logoutText: { fontSize: 16, fontWeight: '500', color: '#ff3b30' },
  versionText: { textAlign: 'center', color: '#888', marginVertical: 24, fontSize: 14 },
});

export default SettingsPage;
