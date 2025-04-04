import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { style } from "./style";
import esc from '../../assets/esc.png';
import like from '../../assets/Like.png';
import deslike from '../../assets/Deslike.png';

const EvalsPage = () => {
  const [photoLocation, setPhotoLocation] = useState("Localização da foto");

  return (
    <View style={style.mainConteiner}>
      {/* Botão de Fechar */}
      <View style={style.logoX}>
        <TouchableOpacity>
          <Image source={esc} style={style.logoX} />
        </TouchableOpacity>
      </View>

      {/* Localização da Foto */}
      <View style={style.locationContainer}>
        <Text style={style.locationText}>{photoLocation}</Text>
      </View>

      {/* Botões de Avaliação */}
      <View style={style.optionButtons}>
        <TouchableOpacity style={style.optionsL}>
          <Image source={like} style={style.options} />
        </TouchableOpacity>
        <TouchableOpacity style={style.optionsR}>
          <Image source={deslike} style={style.options} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EvalsPage;
