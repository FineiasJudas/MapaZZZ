import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {
  Home,
  Star,
  OctagonAlert,
  BellRing,
  Gamepad2,
  Hospital,
  CircleHelp,
  LogOut,
  Mail,
  Phone,
} from 'lucide-react-native';
import {useAlert} from "../alertProvider/index";

interface ImprovedSideMenuProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  slideAnim: Animated.Value; // ou Animated.Value dependendo da versão
  userName: string;
  loading: boolean;
  logged: boolean;
  navigation: any; // idealmente você pode usar o tipo do React Navigation
  showAlert: (type: string, message: string, title: string) => void;
  logOut: () => void;
}

const ImprovedSideMenu: React.FC<ImprovedSideMenuProps> = ({
  menuOpen,
  toggleMenu,
  slideAnim,
  userName,
  loading,
  logged,
  navigation,
  showAlert,
  logOut
}) => {

  if (!menuOpen) return null;
  
  return (
    <TouchableWithoutFeedback onPress={toggleMenu}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.sideMenu,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfilePage')}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#7F1734" />
                  ) : (
                    <Text style={styles.profileIconText}>
                      {userName ? userName[0] : "U"}
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={styles.profileTextContainer}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#7F1734" />
                  ) : (
                    <Text style={styles.profileName}>{userName}</Text>
                  )}
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#12ab40" fill="#12ab40" />
                    <Star size={16} color="#12ab40" fill="#12ab40" />
                    <Star size={16} color="#12ab40" fill="#12ab40" />
                    <Star size={16} color="#ccc" />
                    <Star size={16} color="#ccc" />
                  </View>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.menuItems} showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route, logged, showAlert, navigation)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemIconContainer}>
                    <item.icon size={22} color="#7F1734" />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                onPress={logOut}
                activeOpacity={0.7}
              >
                <View style={[styles.menuItemIconContainer, styles.logoutIconContainer]}>
                  <LogOut size={22} color="#ff3b30" />
                </View>
                <Text style={styles.logoutText}>Terminar Sessão</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Contact Information */}
            <View style={styles.contactContainer}>
              <Text style={styles.contactHeader}>Informações de Contacto:</Text>
              <View style={styles.contactItem}>
                <Mail size={16} color="#7F1734" />
                <Text style={styles.contactText}>Salonis@gmail.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Phone size={16} color="#7F1734" />
                <Text style={styles.contactText}>+244 946671828</Text>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Helper function to handle navigation with auth checks
const handleNavigation = (route: string, logged: boolean, showAlert: { (type: string, message: string, title: string): void; (arg0: string, arg1: string, arg2: string): void; }, navigation: { navigate: (arg0: string) => void; }) => {
  switch (route) {
    case 'initPage':
      navigation.navigate('initPage');
      break;
    case 'EvalsPage':
      if (logged) {
        showAlert(
          'aviso',
          "Essa página irá mostrar possíveis zonas de risco. Precisamos da sua ajuda para verificar se realmente são zonas de risco. Por favor, clique no botão 'Verificar' para confirmar se a zona de risco é real ou não. Obrigado por sua colaboração!",
          'Atenção'
        );
        navigation.navigate('EvalsPage');
      } else {
        showAlert(
          'aviso',
          'Você precisa estar logado para acessar esta página, tente Logar',
          'Atenção'
        );
        navigation.navigate('Login');
      }
      break;
    case 'notifyPage':
      if (logged) {
        navigation.navigate('notifyPage');
      } else {
        showAlert(
          'aviso',
          'Você precisa estar logado para acessar esta página, tente Logar', 
          'Aviso'
        );
      }
      break;
    case 'GamingPage':
      if (logged) {
        navigation.navigate('GamingPage');
      } else {
        showAlert(
          'aviso',
          'Você precisa estar logado para jogar o Malária Quiz, tente Logar', 
          'Aviso'
        );
      }
      break;
    case 'nearHospitalPage':
      navigation.navigate('nearHospitalPage');
      break;
    case 'helpPage':
      navigation.navigate('helpPage');
      break;
  }
};

// Menu items configuration
const menuItems = [
  { title: 'Início', icon: Home, route: 'initPage' },
  { title: 'Verificar Relatos', icon: OctagonAlert, route: 'EvalsPage' },
  { title: 'Notificações', icon: BellRing, route: 'notifyPage' },
  { title: 'Jogos', icon: Gamepad2, route: 'GamingPage' },
  { title: 'Hospitais Próximos', icon: Hospital, route: 'nearHospitalPage' },
  { title: 'Ajuda e Suporte', icon: CircleHelp, route: 'helpPage' },
];

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1001,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#ccc",
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7F1734',
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
  logoutItem: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 0,
  },
  logoutIconContainer: {
    backgroundColor: '#fff2f2',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
  },
  contactContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  contactHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

export default ImprovedSideMenu;