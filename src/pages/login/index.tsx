import React from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import LoginButton from "../../assets/loginButton.png";
import GoogleLogo from "../../assets/google.png";

export default function Login()
{
  return (
    <View style={style.Container}>  

     {/* Logo no top */}
      <View style={style.topLeftLogo}>
        <Image source={Logo} style={style.smallLogo} /> 
      </View> 

      {/* Botão de login com Google */}
      <TouchableOpacity style={style.googleButton}>
        <Image source={GoogleLogo} style={style.googleImage} />
        <Text style={style.googleText}> Entrar com Google </Text>
      </TouchableOpacity>

      {/* Campos de Login */}
      <View style={style.boxImput}>
        <View style={style.boxNameImput}>
          <TextInput style={style.inputText} placeholder="Digite seu email ou nome" />
        </View>

        <View style={style.boxSenhaImput}>
        <TextInput style={style.inputText} placeholder="Digite sua senha" secureTextEntry />
        </View>

        <TouchableOpacity style={style.loginButtonView}>
          <Image source={LoginButton} style={style.loginButtonImage} />
          <Text style={style.buttonEntrarText}>Entrar</Text>
        </TouchableOpacity>

      <View style={style.signTexView}>
        <Text> Não tem uma conta? </Text>
        <TouchableOpacity>
        <Text style={style.criarButton}> Criar </Text>
        </TouchableOpacity> 
      </View>
      <View style={style.signAsGuessView}>
        <TouchableOpacity >
          <Text style={style.entrarComoGuessButton}> Entrar como visitante</Text>
        </TouchableOpacity>
      </View>

      </View>

    </View>
  );
}

