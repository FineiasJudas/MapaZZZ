import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import LoginButton from "../../assets/loginButton.png";
import GoogleLogo from "../../assets/google.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlert } from "../alertProvider/index";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [user, setUser] = useState({});
  const { showAlert } = useAlert();
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("Token");
    if (token) {
      navigation.navigate("initPage");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const state = navigation.getState();
        const { routes, index } = state;
        const prevRoute = index > 0 ? routes[index - 1].name : null;

        if (prevRoute !== "Sign" && prevRoute !== "WelcomePage") {
          showAlert("aviso", "Voltar para a página anterior significa logar ou entrar novamente como visitante.", "Atenção");
          return true;
        }
        // retorna false para deixar o React Navigation tratar o back normalmente
        return false;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        subscription.remove();
    }, [navigation]));

  useEffect(() => {
    checkToken();
  }, []); // Verifica o token na montagem do componente

  const handleLogin = async () => {
    if (!email || !senha) {
      ToastAndroid.show("Preencha todos os campos", ToastAndroid.LONG);
      return;
    }

    setLoading(true); // Ativa o estado de carregamento

    try {
      const response = await fetch(
        "https://mapazzz.onrender.com/api/users/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password: senha }),
        }
      );
      const data = await response.json();
    
      if (response.ok) {
        ToastAndroid.show("Login feito com sucesso", ToastAndroid.LONG);
        await AsyncStorage.setItem("Token", data.token); // Salva o token no AsyncStorage

        const resDetalhes = await fetch(
          "https://mapazzz.onrender.com/api/users/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + data.token,
            },
          }
        );
        const dataDetalhes = await resDetalhes.json();
        if (resDetalhes.ok) {
          const userData = {
            name: dataDetalhes?.data?.name || "",
            address: dataDetalhes?.data?.address || "",
            points: dataDetalhes?.data?.points || 0
          };
          
          await AsyncStorage.setItem("User", JSON.stringify(userData))
        }
        navigation.navigate("initPage");
      } else {
        await showAlert(
          "erro",
          data?.errors?.[0]?.message || data?.message || "Erro ao fazer login",
          "Erro"
        );
      }
    } catch (error) {
      await showAlert("erro", "Falha na conexão com o servidor", "Erro");
      alert(error)
    } finally {
      setLoading(false); // Desativa o estado de carregamento após a resposta
    }
  };

  return (
    <View style={style.body}>
      <View>
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
            style={style.inputSenhaText}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={style.showPasswordButton}
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
          >
            <Text style={style.showPasswordText}>
              {showPassword ? "Esconder" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Exibir o botão de login ou um indicador de carregamento */}
        <TouchableOpacity
          style={style.loginButtonView}
          onPress={handleLogin}
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? (
            <ActivityIndicator size="small" color="#6d1625" />
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
          <TouchableOpacity onPress={() => navigation.navigate("initPage")}>
            <Text style={style.entrarComoGuessButton}>
              Entrar como visitante
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}