import React, { useState, useEffect } from 'react';
import {useAlert} from "../alertProvider/index";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Settings
} from 'react-native';
import {
  Bell,
  MapPin,
  Earth,
  Hospital,
  OctagonAlert,
  Gamepad2,
  Siren,
  Puzzle,
  Camera,
  TriangleAlert,
  User,
  CheckCheck,
  Cog
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import logo from '../../assets/logo.png';
import bySalonis from '../../assets/bySalōnis.png';
import { style } from './style';

const HomePage = ({ navigation }: any) => {
  const { showAlert } = useAlert();
  const [location, setLocation] = useState('Obtendo a localização...');
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(true);
  
  const getLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permissão negada');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation('São Paulo, Brasil'); // Simulando localização para demonstração
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = async () => {
    const token = await AsyncStorage.getItem('Token');
    if (token) {
      setLogged(true);
    }
  };

  useEffect(() => {
    checkPermission();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Início</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}  >
          <Puzzle color="#7f1734" onPress={async () => { navigation.navigate('GamingPage');}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
            onPress={() => navigation.navigate('notifyPage')}>
            <Bell color="#7f1734" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.userInfoContainer}>
            <TouchableOpacity style={styles.userIcon} onPress={() => navigation.navigate('ProfilePage')}>
            <User color="#7f1734" />
            </TouchableOpacity>
            <View>
              <Text style={styles.welcomeText}>Bem-vindo, Fineias</Text>
               <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}}>
                <MapPin color="#7f1734" size={18} style={{marginRight: 6}}/>
                <Text style={styles.statLabel}>Localizacao...</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={async () => { navigation.navigate('reportPage');}}>
              <Text style={styles.actionButtonText}>Reportar  </Text>
              <Camera color="#7f1734" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText} onPress={async () => { navigation.navigate('MapaPage');}}>Zonas de Risco  </Text>
              <TriangleAlert color="#7f1734" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cartao de registros */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statsCard}>
            <Text style={styles.statsNumber}>+45</Text>
            <View style={styles.statsLabelContainer}>
              <Text style={styles.statsLabel}>Seus Registros</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statsCard}>
            <Text style={styles.statsNumber}>+115</Text>
            <View style={styles.statsLabelContainer}>
              <Text style={styles.statsLabel}>Todos Registros</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Registros recentes */}
        <Text style={styles.sectionTitle}>Registros Recentes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentRecords}>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.recordCard}>
              <View style={styles.recordTimeLabel}>
                <Text style={styles.recordTimeLabelText}>Registrado há 1d</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Seccao de Jogos */}
        <View style={styles.gameSection}>
          <View style={styles.gameContent}>
            <Image
              source={require('../../assets/GameSugeste.png')}
              style={styles.gameImage}
            />
            <View style={styles.gameTextContainer}>
              <Text style={styles.gameTitle}>Esperimente o Malária Quiz!</Text>
              <Text style={styles.gameSubtitle}>
                Se divirta respondendo questões sobre a Malária e se torne num grande mestre!
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('GamingPage')}>
                <Text style={styles.startButtonText}>Iniciar agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hospital Section */}
        <View style={styles.hospitalSection}>
          <View style={styles.hospitalContent}>
            <Image
              source={require('../../assets/HospitalSugest.png')}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalTextContainer}>
              <Text style={styles.hospitalTitle}>Encontre hospitais mais próximos de si!</Text>
              <Text style={styles.hospitalSubtitle}>
                Saiba a que distância estás do unidade hospitalar mais próxima e receba o atendimente o mais rápido possível!
              </Text>
              <TouchableOpacity style={styles.findButton} onPress={() => navigation.navigate('nearHospitalPage')}>
                <Text style={styles.findButtonText}>Encontrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('ProfilePage')}
            >
          <User color="#7f1734" />
          <Text style={styles.navButtonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
              onPress={() => navigation.navigate('nearHospitalPage')}
        >
          <Hospital color="#7f1734" />
          <Text style={styles.navButtonText}>Hospitais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={async () => {
                  if (logged) {
                    navigation.navigate('EvalsPage')
                   await showAlert(
                      'aviso',
                      "Essa página irá mostrar possíveis zonas de risco. \
                                                          precisamos da sua ajuda para verificar se realmente são zonas de risco. Por favor, clique no botão 'Verificar' para confirmar se a zona de risco é real ou não. \
                                                          Obrigado por sua colaboração!", 'Atenção'
                    )
                  } else {
                    navigation.navigate('Login')
                    await showAlert(
                      'aviso',
                      'Você precisa estar logado para acessar esta página, tente Logar', 'Atenção'
                    ) 
                  }
                }}>
          <CheckCheck color="#7f1734" />
          <Text style={styles.navButtonText}>Verificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
         onPress={() => navigation.navigate('configPage')}
        >
          <Cog color="#7f1734" />
          <Text style={styles.navButtonText}>Definições</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    color: '#7f1734',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  puzzleIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#871434',
    borderRadius: 4,
  },
  puzzleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  welcomeCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#dfdfdf',
    borderRadius: 12,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userIconText: {
    fontSize: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    width: '90%',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#7f1734'
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 16,
    gap: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#871434',
    borderRadius: 12,
    padding: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statsLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsLabel: {
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  recentRecords: {
    paddingLeft: 16,
  },
  recordCard: {
    width: 120,
    height: 180,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginRight: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  recordTimeLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  recordTimeLabelText: {
    color: 'white',
    fontSize: 12,
  },
  gameSection: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  gameContent: {
    flexDirection: 'row',
    padding: 16,
  },
  gameImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: 'contain'
  },
  gameTextContainer: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#871434',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
  },
  hospitalSection: {
    margin: 16,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hospitalContent: {
    flexDirection: 'row',
    padding: 16,
  },
  hospitalImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    resizeMode: 'contain'
  },
  hospitalTextContainer: {
    flex: 1,
  },
  hospitalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hospitalSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  findButton: {
    backgroundColor: '#871434',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  findButtonText: {
    color: 'white',
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
  navButtonText: {
    fontSize: 12,
    color: '#871434',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  }
});

export default HomePage;
