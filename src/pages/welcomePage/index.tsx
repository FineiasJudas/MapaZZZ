import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import welcomeView from "../../assets/WelcomeView.png";
import getInButton from "../../assets/loginButton.png";
import sigInButton from "../../assets/SignBotton.png";
import mapaZZZ from "../../assets/MapaZzz.png";
import bySalonis from "../../assets/bySalōnis.png";

const WelcomePage = ({ navigation }: any) => {
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token) {
        navigation.navigate("MapaPage");
      }
    };
    checkLogin();
  }, []);

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.mainContainer}>
        {/* TOPO */}
        <View style={style.topContainer}>
          <Image source={mapaZZZ} style={style.mapaLogo} />
          <Image source={welcomeView} style={style.welcomeImg} />
        </View>

        {/* BOTÕES */}
        <View style={style.buttonsContainer}>
          <TouchableOpacity
            style={style.loginButtonView}
            onPress={() => navigation.navigate("Login")}
          >
            <Image source={getInButton} style={style.loginButtonImage} />
            <Text style={style.buttonEntrarText1}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.loginButtonView}
            onPress={() => navigation.navigate("Sign")}
          >
            <Image source={sigInButton} style={style.loginButtonImage} />
            <Text style={style.buttonEntrarText2}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        {/* RODAPÉ */}
        <View style={style.footerContainer}>
          <Image source={bySalonis} style={style.bySalonisImg} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;