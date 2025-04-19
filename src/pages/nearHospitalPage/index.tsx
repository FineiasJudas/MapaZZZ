import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Modal, Pressable } from "react-native";
import { ArrowLeft, Hospital, MapPin } from "lucide-react-native";
import Logo from "../../assets/logo.png";
import { style } from "./style";

const HospitalListScreen = ({ navigation }: any) => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: "Hospital Georgina Marchel", distance: 1.2 },
    { id: 2, name: "Hospital Santa Maria", distance: 2.5 },
    { id: 3, name: "Hospital São João", distance: 3.8 },
    { id: 4, name: "Hospital Universitário", distance: 4.1 },
    { id: 5, name: "Clínica São Lucas", distance: 5.7 },
    { id: 6, name: "Hospital Beneficência Portuguesa", distance: 6.3 },
    { id: 7, name: "Hospital Albert Einstein", distance: 7.8 },
  ]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getDistanceColor = (distance: number) => {
    if (distance < 3) return "#4CAF50";
    if (distance < 6) return "#FF9800";
    return "#F44336";
  };

  const handleCreateTarget = () => {
  };

  return (
    <View style={style.Container}>
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() => navigation.navigation()}>
          <ArrowLeft color="#7f1734" size={30} />
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{width: '85%'}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#7f1734', marginLeft: 10}}>
            Hospitais próximos:
          </Text>
        </View>
        <ScrollView style={style.content}>
          {hospitals.map((hospital) => (
            <TouchableOpacity key={hospital.id} onPress={() =>  setModalVisible(true)}>
              <View style={style.infCamp}>
              <Hospital color="#7f1734" style={{margin: 5, marginRight: 8}}/>
                <View style={style.styleText}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={style.notificationText}>
                    {hospital.name}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <MapPin color={getDistanceColor(hospital.distance)} size={16} />
                    <Text style={{ fontSize: 14, color: getDistanceColor(hospital.distance), marginLeft: 5 }}>
                      {hospital.distance} km de distância
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal para opções */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={() => setModalVisible(false)}>
          <View style={{
            position: 'absolute',
            bottom: 100,
            left: 50,
            right: 50,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Opções</Text>
            <TouchableOpacity onPress={handleCreateTarget}>
              <Text style={{ fontSize: 16, color: '#007BFF' }}>Criar Target no Mapa</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HospitalListScreen;
