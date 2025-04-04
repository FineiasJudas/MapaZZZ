import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { style } from "./style";
import { CircleX, Clock, Import } from "lucide-react-native";
import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';
import alartQuiz from '../../assets/quizAlert.png';
import alartRain from '../../assets/rainAlarte.png'

const RegisterRiskZone = () => {

  return (
    <View style={style.mainConteiner}>
      <View style ={style.logoX}>
        <View>
          <TouchableOpacity>
            <Image source={esc} style={style.escImg}>
              </Image>
            </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
          <Image source={logo} style={style.logoImg}>
          </Image>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.container}>
      <Text style={{marginTop: 20, left: 6, fontSize: 18, fontWeight: '600'}}>Notificações:</Text>
      <Text style={{marginBottom: 20, marginTop: 12, left: 6,fontSize: 18,fontWeight: '600', color: '#7F1734'}}>__ __ __ __ __ __ __ __ __ __ __ __ __ __ </Text>
        <ScrollView style={style.scroll}>
        <TouchableOpacity>
        <View style={style.infCamp}>
         <Image source={alartQuiz} style={style.notyType} />

          <View style={style.styleText}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={style.notificationText}>
              Ha alguma zona de risco de contagio da Malario!
          </Text>
          <View style={style.timeInfo}>
          <Clock color="#999" size={14} />
          <Text style={style.timeText}>há 5 min</Text>
            </View>
            </View>
          </View>
          </TouchableOpacity>


        </ScrollView>
      </View>
    </View>
    
  );
};

export default RegisterRiskZone;