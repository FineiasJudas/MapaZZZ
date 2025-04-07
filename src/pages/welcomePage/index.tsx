import React from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { style } from "./style";
import welcomeView from '../../assets/WelcomeView.png';
import getInButton from '../../assets/loginButton.png';
import sigInButton from '../../assets/SignBotton.png';
import mapaZZZ from '../../assets/MapaZzz.png';
import bySalonis from '../../assets/bySalōnis.png';

const WelcomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.mainContainer}>
        {/* Topo */}
        <View style={style.topContainer}>
          <Image source={mapaZZZ} style={style.mapaLogo} />
          <Image source={welcomeView} style={style.welcomeImg} />
        </View>

        {/* Botões */}
        <View style={style.enterContainer}>
          <TouchableOpacity style={style.loginButtonView}>
            <Image source={getInButton} style={style.loginButtonImage} />
            <Text style={style.buttonEntrarText1}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.loginButtonView}>
            <Image source={sigInButton} style={style.loginButtonImage} />
            <Text style={style.buttonEntrarText2}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={style.footerContainer}>
          <Image source={bySalonis} style={style.bySalonisImg} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
