import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import {
  User,
  Hospital,
  CheckCheck,
  Cog,
  ChevronRight,
  Bell,
  Lock,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  Moon,
  Globe,
  Languages
} from 'lucide-react-native';

const SettingsPage = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Definições</Text>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* Account Settings */}
        <Text style={styles.sectionTitle}>Conta</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <User size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Informações Pessoais</Text>
            </View>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Segurança e Privacidade</Text>
            </View>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Verificação de Conta</Text>
            </View>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notificações</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Notificações Push</Text>
            </View>
            <Switch
              trackColor={{ false: '#e0e0e0', true: '#7f1734' }}
              thumbColor={notifications ? '#fff' : '#fff'}
              ios_backgroundColor="#e0e0e0"
              onValueChange={() => setNotifications(!notifications)}
              value={notifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Modo Escuro</Text>
            </View>
            <Switch
              trackColor={{ false: '#e0e0e0', true: '#7f1734' }}
              thumbColor={darkMode ? '#fff' : '#fff'}
              ios_backgroundColor="#e0e0e0"
              onValueChange={() => setDarkMode(!darkMode)}
              value={darkMode}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Serviços de Localização</Text>
            </View>
            <Switch
              trackColor={{ false: '#e0e0e0', true: '#7f1734' }}
              thumbColor={locationServices ? '#fff' : '#fff'}
              ios_backgroundColor="#e0e0e0"
              onValueChange={() => setLocationServices(!locationServices)}
              value={locationServices}
            />
          </View>
        </View>

        {/* General */}
        <Text style={styles.sectionTitle}>Geral</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Languages size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Idioma</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>Português</Text>
              <ChevronRight size={20} color="#7f1734" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('helpPage')}>
            <View style={styles.settingInfo}>
              <HelpCircle size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Ajuda e Suporte</Text>
            </View>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={22} color="#7f1734" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Sobre o App</Text>
            </View>
            <ChevronRight size={20} color="#" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={22} color="#ff3b30" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Terminar Sessão</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    color: '#7f1734',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
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
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 12,
    marginTop: 24,
    padding: 16,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff3b30',
  },
  versionText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 24,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a86f7',
  },
  navButtonText: {
    fontSize: 12,
    color: '#871434',
    marginTop: 4,
  },
  activeNavButtonText: {
    color: '#4a86f7',
  },
});

export default SettingsPage;