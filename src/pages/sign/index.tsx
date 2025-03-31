import React from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import LoginButton from "../../assets/loginButton.png";
import GoogleLogo from "../../assets/google.png";

export default function Sign()
{
  return (
    <View style={style.Container}>

     {/* Logo no canto superior direito */}
      <View style={style.topLeftLogo}>
        <Image source={Logo} style={style.smallLogo} />
      </View> 

      {/* Botão de login com Google */}
      <TouchableOpacity style={style.googleButton}>
        <Image source={GoogleLogo} style={style.googleImage} />
        <Text style={style.googleText}>Entrar com Google</Text>
      </TouchableOpacity>

      {/* Campos de Login */}
      <View style={style.boxImput}>
        <View style={style.boxFullNameImput}>
          <TextInput style={style.inputText} placeholder="Digite seu nome completo" />
        </View>

        <View style={style.boxEmailImput}>
          <TextInput style={style.inputText} placeholder="Digite seu email" />
        </View>

        <View style={style.boxAdressImput}>
          <TextInput style={style.inputText} placeholder="Digite seu endereco" />
        </View>

        <View style={style.boxSenhaImput}>
          <TextInput style={style.inputText} placeholder="Digite sua senha" secureTextEntry />
        </View>

        <TouchableOpacity style={style.loginButtonView}>
          <Image source={LoginButton} style={style.loginButtonImage} />
          <Text style={style.buttonEntrarText}> Cadastrar </Text>
        </TouchableOpacity>

        <View style={style.signAsGuessView}>
        <TouchableOpacity>
        <Text style={style.entrarComoGuessButton}> Entrar como visitante </Text>
        </TouchableOpacity>
      </View>

      </View>
    </View>
  );
}

