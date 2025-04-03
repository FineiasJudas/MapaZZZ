import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { style } from "./style";
import { CircleX, Import } from "lucide-react-native";
import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';

const EvalsPage = () => {

  return (
    <View style={style.mainConteiner}>
      <View style ={style.logoX}>
        <TouchableOpacity style={style.ButtonX}>
                  <Image source={esc} style={style.logoX} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EvalsPage;
