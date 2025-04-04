import React, { useState, useEffect } from 'react'
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  TextInputProps,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { style } from './style'
import Logo from '../../assets/logo.png'
import LoginButton from '../../assets/loginButton.png'
import GoogleLogo from '../../assets/google.png'
import Toast from 'react-native-toast-message'

export default function Sign ({ navigation }: any) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // Estado para controlar o carregamento
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])

  // Função para buscar sugestões de endereços
  // const fetchAddressSuggestions = async (query: string) => {
  //   if (!query) return setAddressSuggestions([]);

  //   try {
  //     const response = await fetch(`https://geocode.xyz/${query}?json=1`);
  //     const data = await response.json();
  //     const suggestions = data?.standard?.city ? [data.standard.city] : [];
  //     setAddressSuggestions(suggestions);
  //   } catch (error) {
  //     console.error("Erro ao buscar sugestões de endereço:", error);
  //     setAddressSuggestions([]);
  //   }
  // };

  // Função para cadastrar usuário
  const handleSignUp = async () => {
    setLoading(true) // Ativa o estado de carregamento
    if (!fullName || !phone || !address || !password) {
      // Mensagem longa
      ToastAndroid.show('Preencha todos os campos', ToastAndroid.LONG)
      setLoading(false) // Ativa o estado de carregamento
      return
    }

    try {
      const response = await fetch(
        'https://mapazzz.onrender.com/api/users/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: fullName, phone, address, password })
        }
      )

      const data = await response.json()

      if (response.ok) {
        // Mensagem longa
        ToastAndroid.show('usuário cadastrado com sucesso', ToastAndroid.LONG)
        // Redireciona ou limpa os campos conforme necessário
        setFullName('')
        setPhone('')
        setAddress('')
        setPassword('')
        setLoading(false) // Ativa o estado de carregamento
        navigation.navigate("Login");
      } else {
        ToastAndroid.show(
          data.errors[0].message || 'Erro ao cadastrar o usuário',
          ToastAndroid.LONG
        )
      }
    } catch (error) {
      alert('Falha na conexão com o servidor')
    } finally {
      setLoading(false) // Desativa o estado de carregamento após a resposta
    }
  }

  return (
    <View style={style.body}>
      {/* Logo no canto superior direito */}
      <View style={style.topLeftLogo}>
        <Image source={Logo} style={style.smallLogo} />
      </View>

      {/* Botão de login com Google */}
      <TouchableOpacity style={style.googleButton}>
        <Image source={GoogleLogo} style={style.googleImage} />
        <Text style={style.googleText}>Entrar com Google</Text>
      </TouchableOpacity>

      {/* Campos de Cadastro */}
      <View style={style.boxImput}>
        <View style={style.boxFullNameImput}>
          <TextInput
            style={style.inputText}
            placeholder='Digite seu nome completo'
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={style.boxphoneImput}>
          <TextInput
            style={style.inputText}
            placeholder='Digite seu número de telefone'
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={style.boxAdressImput}>
          <TextInput
            style={style.inputText}
            placeholder='Ex: Angola, Luanda, Kilamba-kiaxi'
            value={address}
            onChangeText={setAddress}
          />
          {/* Exibe as sugestões de endereço */}
          {addressSuggestions.length > 0 && (
            <FlatList
              data={addressSuggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setAddress(item)}>
                  <Text style={style.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>

        <View style={style.boxSenhaImput}>
          <TextInput
            style={style.inputText}
            placeholder='Digite sua senha'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Exibir o botão de login ou um indicador de carregamento */}
        <TouchableOpacity
          style={style.loginButtonView}
          onPress={handleSignUp}
          disabled={loading} // Desativa o botão durante o carregamento
        >
          {loading ? (
            <ActivityIndicator size='small' color='#7F1734' />
          ) : (
            <>
              <Image source={LoginButton} style={style.loginButtonImage} />
              <Text style={style.buttonEntrarText}>Cadastrar</Text>
            </>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity style={style.loginButtonView} onPress={handleSignUp}>
          <Image source={LoginButton} style={style.loginButtonImage} />
          <Text style={style.buttonEntrarText}>Cadastrar</Text>
        </TouchableOpacity> */}

        <View style={style.signAsGuessView}>
          <TouchableOpacity>
            <Text
              style={style.entrarComoGuessButton}
              onPress={() => navigation.navigate('MapaPage')}
            >
              Entrar como visitante
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
