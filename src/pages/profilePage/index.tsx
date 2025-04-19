import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  User,
  Hospital,
  CheckCheck,
  Cog,
  ChevronRight,
  Image as ImageIcon,
  Map,
  Wallet,
  ShoppingBag,
  MapPin,
  GraduationCap
} from 'lucide-react-native';

const ProfilePage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../assets/pedestre.png')} 
            style={styles.profileImage}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Finéias Judas João Jilaiassule</Text>
            <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}}>
                <MapPin color="#7f1734" size={18} style={{marginRight: 6}}/>
                <Text style={styles.statLabel}>Localizacao...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f5f5f5' }]}>
              <GraduationCap size={20} color="#7f1734" />
            </View>
            <Text style={styles.menuLabel}>Meu ranking</Text>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f5f5f5' }]}>
              <ImageIcon size={20} color="#7f1734" />
            </View>
            <Text style={styles.menuLabel}>Meus Registros</Text>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MapaPage')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f5f5f5' }]}>
              <Map size={20} color="#7f1734" />
            </View>
            <Text style={styles.menuLabel}>Zonas de Risco</Text>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#f5f5f5' }]}>
              <ShoppingBag size={20} color="#7f1734" />
            </View>
            <Text style={styles.menuLabel}>Meus Recursos</Text>
            <ChevronRight size={20} color="#7f1734" />
          </TouchableOpacity>
        </ScrollView>
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
    backgroundColor: '#7f1734',
    paddingTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  profileInfoContainer: {
    flex: 1,
    marginTop: -50,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#ffd7cc',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#888',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    borderWidth: 1,
        borderColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  menuIconContainer: {
    
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
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
    color: '#7f1734',
    marginTop: 4,
  },
  activeNavButtonText: {
    color: '#7f1734',
  },
});

export default ProfilePage;