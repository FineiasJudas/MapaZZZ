import React, { useEffect, useState } from "react";
import { 
  Image, Text, TextInput, View, TouchableOpacity, 
  Alert, ToastAndroid, ActivityIndicator 
} from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import LoginButton from "../../assets/loginButton.png";
import GoogleLogo from "../../assets/google.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);  // Estado para controlar o carregamento
  
  // Verifica se já existe um token no AsyncStorage ao iniciar o componente
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await AsyncStorage.getItem("Token");
  //     if (token) {
  //       navigation.navigate("MapaPage");
  //     }
  //   };
  //   checkToken();
  // }, [navigation]);


  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);  // Ativa o estado de carregamento

    try {
      const response = await fetch("https://mapazzz.onrender.com/api/users/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        ToastAndroid.show('Login feito com sucesso', ToastAndroid.LONG);
        await AsyncStorage.setItem("Token", data.token); // Salva o token no AsyncStorage
        ToastAndroid.show('Login feito com sucesso', ToastAndroid.LONG);
        setEmail("");
        setSenha("");
        navigation.navigate("MapaPage");
      } else {
        Alert.alert("Erro", data.errors[0].message || "Erro ao fazer login");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
    } finally {
      setLoading(false);  // Desativa o estado de carregamento após a resposta
    }
  };

  return (
    <View style={style.body}>
      <View style={style.topLeftLogo}>
        <Image source={Logo} style={style.smallLogo} />
      </View>

      <TouchableOpacity style={style.googleButton}>
        <Image source={GoogleLogo} style={style.googleImage} />
        <Text style={style.googleText}> Entrar com Google </Text>
      </TouchableOpacity>

      <View style={style.boxImput}>
        <View style={style.boxNameImput}>
          <TextInput
            style={style.inputText}
            placeholder="Digite telefone ou e-mail"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={style.boxSenhaImput}>
          <TextInput
            style={style.inputText}
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Exibir o botão de login ou um indicador de carregamento */}
        <TouchableOpacity 
          style={style.loginButtonView} 
          onPress={handleLogin} 
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? (
            <ActivityIndicator size="small" color="#7F1734" />
          ) : (
            <>
              <Image source={LoginButton} style={style.loginButtonImage} />
              <Text style={style.buttonEntrarText}>Entrar</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={style.signTexView}>
          <Text> Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign")}>
            <Text style={style.criarButton}> Criar </Text>
          </TouchableOpacity>
        </View>

        <View style={style.signAsGuessView}>
          <TouchableOpacity onPress={() => navigation.navigate("MapaPage")}>
            <Text style={style.entrarComoGuessButton}>
              Entrar como visitante
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
