import React, { useEffect } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, Dimensions, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Linking } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo.png";
import { ArrowLeft, Gamepad2, MapPinned, Package2 } from "lucide-react-native";

export default function HelperPage({ navigation }: any) {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true // Impede o comportamento padrão do botão voltar
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove() // Limpeza ao desmontar
  }, [navigation])
  function handleLinkPress(): void {
    Linking.openURL('https://salonis-mapzzz.vercel.app');
  }

  return (
    <KeyboardAvoidingView
      style={style.Container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.conteinar}>
        <TouchableOpacity onPress={() =>  navigation.goBack()}>
          <ArrowLeft color="#6d1625" size={30} style={{marginTop: 6}}/>
        </TouchableOpacity>
        <Image source={Logo} style={style.imgLogo} />
      </View>

      <View style={style.content}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", }}>
        Sobre o App{'\n'}
        </Text>
        <ScrollView >
            <Text>
              O <Text style={style.text}>MapaZzz</Text> foi desenvolvido com o objetivo de contribuir para a prevenção da malária, combinando tecnologia, educação e participação comunitária.
              Com uma interface simples e intuitiva, oferecemos funcionalidades como:{'\n'}{'\n'}

              <Text style={style.text}>Mapa interativode risco</Text>, baseado em dados geográficos e relatos dos utilizadores;{'\n'}{'\n'}
              <Text style={style.text}>Sistema de alertas personalizados</Text>, com notificações sobre surtos e condições locais;{'\n'}{'\n'}
              <Text style={style.text}>Gamificação</Text>, incentivando comportamentos preventivos de forma lúdica e educativa.{'\n'}{'\n'}

              O nosso compromisso é com a saúde pública, o empoderamento comunitário e a inovação tecnológica no combate à malária.{'\n'}{'\n'}
              <Text style={style.text}>Versão</Text>: 1.0.0{'\n'}
              <Text style={style.text}>Última atualização</Text>: Maio de 2025{'\n'}{'\n'}
              <Text style={style.text}>Desenvilvido pela equipe Salōnis</Text>:{'\n'}{'\n'}

              <Text style={style.text}>Ohana Bento</Text> – Líder, UI/UX Designer e Gestora de Projeto{'\n'}
              <Text style={style.text}>Justino Soares</Text> – Co-líder e Desenvolvedor Full Stack{'\n'}
              <Text style={style.text}>Josef Quicuma</Text> – Desenvolvedor Back-End{'\n'}
              <Text style={style.text}>Marco Carvalho</Text> – Co-Gestor de Projeto e Desenvolvedor{'\n'}
              <Text style={style.text}>Finéias Jilaiassule</Text> – Desenvolvedor Front-End{'\n'}
              <Text style={style.text}>Mário Salembe</Text> – UI/UX Designer e Desenvolvedor Front-End{'\n'}{'\n'}

              <Text style={style.text}>Site Oficial</Text>:{' '}
              <Text style={style.link} onPress={handleLinkPress}>
                          https://salonis-mapzzz.vercel.app
              </Text>
        </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
