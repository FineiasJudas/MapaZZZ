import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import welcomeView from "../../assets/WelcomeView.png";
import getInButton from "../../assets/loginButton.png";
import sigInButton from "../../assets/SignBotton.png";
import mapaZZZ from "../../assets/MapaZzz.png";
import bySalonis from "../../assets/bySalōnis.png";

const { width, height } = Dimensions.get("window");

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
          <Image source={mapaZZZ} style={[style.mapaLogo, { height: height * 0.025 }]} />
          <Image source={welcomeView} style={[style.welcomeImg, { height: height * 0.5 }]} />
        </View>

        {/* BOTÕES */}
        <View style={style.buttonsContainer}>
          <TouchableOpacity
            style={[style.loginButtonView, { width: width * 0.85 }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Image
              source={getInButton}
              style={[style.loginButtonImage, { width: width * 0.85, height: height * 0.065 }]}
            />
            <Text style={style.buttonEntrarText1}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.loginButtonView, { width: width * 0.85 }]}
            onPress={() => navigation.navigate("Sign")}
          >
            <Image
              source={sigInButton}
              style={[style.loginButtonImage, { width: width * 0.85, height: height * 0.065 }]}
            />
            <Text style={style.buttonEntrarText2}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        {/* RODAPÉ */}
        <View style={style.footerContainer}>
          <Image
            source={bySalonis}
            style={[style.bySalonisImg, { width: width * 0.2, height: height * 0.06 }]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;