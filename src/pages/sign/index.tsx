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
  ActivityIndicator,
  Modal
} from 'react-native'
import { style } from './style'
import Logo from '../../assets/logo.png'
import LoginButton from '../../assets/loginButton.png'
import GoogleLogo from '../../assets/google.png'
import Toast from 'react-native-toast-message'
import {useAlert} from "../alertProvider/index";
import { BoxSelectIcon, ScrollText } from 'lucide-react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Sign ({ navigation }: any) {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const { showAlert } = useAlert();
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // Estado para controlar o carregamento
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [acceptedTerms, setAcceptedTerms] = useState(false)

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
      await showAlert('erro','Falha na conexão com o servidor', 'Erro')
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
                  <Text>{item}</Text>
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
        {/* Checkbox para aceitar termos */}
        <View style={style.checkboxContainer}>
        <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
          <View style={style.checkbox}>
            {acceptedTerms && <View style={style.checkboxChecked} />}
            </View>
            </TouchableOpacity>
              <Text style={style.checkboxText}>
               Concordo com os{' '}
              <Text style={style.linkText} onPress={() => setShowTermsModal(true)}>
            termos e condições
          </Text>
        </Text>
      </View>


      <TouchableOpacity
          style={[
          style.loginButtonView,
          (!acceptedTerms || loading) && style.disabledButton
            ]}
            onPress={handleSignUp}
            disabled={!acceptedTerms || loading}
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

        <View style={style.signAsGuessView}>
          <TouchableOpacity>
            <Text
              style={style.entrarComoGuessButton}
              onPress={() => navigation.navigate('MapaPage')}
            >
              Entrar como visitante
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingTop: 8}}>
            <Text
              style={style.entrarComoGuessButton}
              onPress={() => navigation.navigate('Login')}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
  visible={showTermsModal}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowTermsModal(false)}
>
  <View style={style.modalOverlay}>
    <View style={style.modalContainer}>
      <Text style={style.modalTitle}>TERMOS E CONDIÇÕES – MapaZZZ</Text>
      
      <ScrollView style={style.modalScroll} showsVerticalScrollIndicator={true}>
        <Text style={style.modalContent}>
        Salõnis (adiante designada “Salõnis”) desenvolveu a inovadora aplicação móvel "MapaZZZ" (adiante designada “MapaZZZ” ou “Aplicação”), um projecto sem fins lucrativos para ajudar na erradicação da malária, que oferece acesso a mapas online e offline, funcionalidades de reporte de zonas de risco e um jogo educativo. Ao aceder e utilizar esta Aplicação, o utilizador declara ter lido, entendido e aceitado os termos e condições que regem o seu funcionamento e que se encontram definidos a seguir.{'\n'}{'\n'}

1. OBJECTO {'\n'}
O presente clausulado destina-se a regular o acesso e a utilização da Aplicação MapaZZZ (adiante designada “App MapaZZZ”), que é disponibilizada pela Salõnis ao Utilizador.{'\n'}{'\n'}

2. ADESÃO E ACESSO{'\n'}
2.1. O Utilizador pode aceder aos serviços do MapaZZZ através da Aplicação num dispositivo móvel, disponível para download nas lojas de aplicações relevantes (Play Store, App Store, etc.). A utilização de certas funcionalidades poderá depender do tipo de utilizador (privado anónimo ou registado).{'\n'}
2.2. Utilizadores Privados (Acesso Anónimo): Podem aceder ao mapa online imediatamente após a instalação da Aplicação, sem necessidade de registo, mediante a concessão de permissão de acesso à sua localização GPS. Para descarregar mapas offline, também será necessário conceder acesso à localização GPS para o cálculo da área do mapa. O tratamento destes dados será realizado em conformidade com a Política de Privacidade da Salõnis e com a Lei n.º 22/11, de 17 de Junho, da Protecção de Dados Pessoais, garantindo o respeito pela reserva da vida privada dos cidadãos.{'\n'}
2.3. Utilizadores Registados (Contribuintes e Jogadores): Para aceder às funcionalidades de reporte de zonas de risco e ao jogo de perguntas e respostas, o Utilizador deverá efectuar um registo na Aplicação, fornecendo um endereço de correio eletrónico válido, um número de telefone, criando uma password e um username (que não precisa ser o seu nome verdadeiro). O tratamento destes dados será realizado em conformidade com a Política de Privacidade da Salõnis e com a Lei n.º 22/11, de 17 de Junho, da Protecção de Dados Pessoais, garantindo o respeito pela reserva da vida privada e o direito à protecção dos dados pessoais nas comunicações electrónicas, conforme estabelecido na Lei n.º 23/11, de 20 de Junho.{'\n'}
2.4. O Utilizador será responsável pela veracidade, validade e precisão dos dados pessoais por si fornecidos no acto de registo (para utilizadores registados).{'\n'}{'\n'}

3. UTILIZAÇÃO E FUNCIONAMENTO{'\n'}
3.1. Utilizadores Privados (Acesso Anónimo): A utilização do mapa online requer a ativação dos serviços de localização (GPS) no dispositivo móvel e uma ligação à internet (dados móveis ou Wi-Fi). O download de mapas offline requer permissão de acesso ao armazenamento do dispositivo.{'\n'}
3.2. Utilizadores Registados: A autenticação do utilizador na App MapaZZZ efectua-se através da introdução do endereço de correio eletrónico e da password definidos aquando do registo.{'\n'}
3.3. O Utilizador é responsável por manter confidenciais todos os códigos de acesso, palavras-passe ou qualquer outra informação pessoal referente à execução da App MapaZZZ, não podendo transmiti-los a terceiros.{'\n'}
3.4. Quaisquer danos que possam emergir da eventual transmissão a terceiros da informação pessoal abrangida no número anterior são da exclusiva responsabilidade do Utilizador.{'\n'}
3.5. A utilização e a qualidade da App MapaZZZ dependem do dispositivo móvel utilizado e de conexão à internet (serviço de dados activo ou ligação Wi-Fi) para aceder ao mapa online e a outras funcionalidades que requeiram internet, competindo ao Utilizador certificar-se de que aquele é adequado para o efeito. A funcionalidade de mapa offline dependerá do espaço de armazenamento disponível no dispositivo.{'\n'}
3.6. Mediante notificação da Salõnis, o Utilizador fica responsável por actualizar a App MapaZZZ, por meio das lojas oficiais da Google, da Huawei e da Apple (Play Store, Gallery e App Stores, respectivamente).{'\n'}
3.7. A Salõnis não se responsabiliza por qualquer tentativa de utilização da aplicação por um equipamento incompatível ou que não permita a sua correta segurança e execução.{'\n'}
3.8. A utilização da App MapaZZZ possui carácter pessoal e intransmissível e está autorizada unicamente para fins lícitos relacionados ao objectivo de combate à malária e outras funcionalidades disponibilizadas. O Utilizador obriga-se a não a utilizar com fins ilícitos ou lesivos.{'\n'}
3.9. O Utilizador deverá manter e manter actualizados os necessários aplicativos de segurança no seu dispositivo móvel.{'\n'}
3.10. O Utilizador reconhece que o acesso à App MapaZZZ e a sua utilização são feitos com recurso a sistemas informáticos e redes de comunicações que podem apresentar falhas, defeitos ou erros.{'\n'}
3.11. Em caso de perda do dispositivo móvel com a app instalada, suspeita de acções fraudulentas, tentativas de manipulação ou acesso não autorizado à sua conta (para utilizadores registados), o Utilizador deverá informar a Salõnis através dos contactos fornecidos para que as medidas adequadas possam ser tomadas.{'\n'}
3.12. A Salõnis reserva-se o direito de incluir informações sobre o projecto e possíveis formas de apoio dentro da Aplicação, dada a sua natureza não lucrativa.{'\n'}{'\n'}

4. SEGURANÇA E RESPONSABILIDADE{'\n'}
4.1. A App MapaZZZ implementa medidas de segurança razoáveis para proteger os dados dos utilizadores, garantindo a confidencialidade e integridade das informações, seguindo as melhores práticas da indústria. A Salõnis compromete-se a garantir a segurança da informação e a protecção dos dados pessoais dos Utilizadores, em conformidade com a Lei n.º 22/11, de 17 de Junho, e demais legislação aplicável.{'\n'}
4.2. A Salõnis envidará os melhores esforços para garantir a disponibilidade e o correcto funcionamento da Aplicação, mas não garante a sua operação ininterrupta ou isenta de erros.{'\n'}
4.3. A Salõnis não se responsabiliza pela utilização indevida da Aplicação por parte do Utilizador, incluindo o reporte de informações falsas ou enganosas.{'\n'}
4.4. A Salõnis não responderá por quaisquer danos sofridos pelo Utilizador em consequência do não cumprimento das obrigações decorrentes destes Termos ou por falhas de internet, do dispositivo móvel ou de outros factores externos ao controlo da Salõnis.{'\n'}
4.5. O Utilizador é o único responsável pelo conteúdo das fotografias e informações que reporta através da Aplicação. A Salõnis utiliza IA para auxiliar na análise, mas não garante a veracidade de todo o conteúdo reportado pelos utilizadores.{'\n'}{'\n'}

5. CANCELAMENTO E SUSPENSÃO{'\n'}
5.1. Utilizadores Registados: O Utilizador poderá, a qualquer momento, solicitar o cancelamento da sua conta na App MapaZZZ através das opções disponíveis na Aplicação ou entrando em contacto com a Salõnis.{'\n'}
5.2. A Salõnis reserva-se o direito de suspender ou cancelar o acesso de um Utilizador à Aplicação, temporária ou permanentemente, em caso de violação destes Termos, uso indevido da Aplicação ou por outras razões justificadas, sem necessidade de aviso prévio.{'\n'}{'\n'}

6. PROPRIEDADE INTELECTUAL{'\n'}
6.1. A Salõnis conserva integralmente os direitos de propriedade intelectual e industrial sobre a App MapaZZZ, incluindo o seu design, código, funcionalidades e conteúdo (excepto o conteúdo gerado pelos utilizadores). Os mapas offline gerados com Protomaps e os tiles utilizados são regidos pelos seus próprios termos de licenciamento.{'\n'}
6.2. Qualquer uso não autorizado, como cópias, distribuição, modificação ou engenharia reversa da Aplicação ou dos seus componentes, implica responsabilidade civil e/ou criminal e obrigação de indemnização à Salõnis e/ou aos detentores dos direitos de licenciamento aplicáveis.{'\n'}{'\n'}

7. DADOS PESSOAIS{'\n'}
7.1. A recolha e tratamento de dados pessoais dos Utilizadores da App MapaZZZ são realizados em conformidade com a Política de Privacidade da Salõnis e com a Lei n.º 22/11, de 17 de Junho, da Protecção de Dados Pessoais, bem como com a Lei n.º 23/11, de 20 de Junho, das Comunicações Electrónicas e dos Serviços da Sociedade da Informação, no que for aplicável. Ao utilizar a Aplicação, o Utilizador reconhece e concorda com os termos da Política de Privacidade, que detalha os tipos de dados recolhidos, as finalidades do tratamento, os direitos dos titulares dos dados e as medidas de segurança implementadas.{'\n'}
7.2. Para Utilizadores Privados (Acesso Anónimo): Recolhemos e utilizamos a sua localização GPS apenas para fornecer o mapa online e calcular a área para download do mapa offline, conforme detalhado na Política de Privacidade. Estes dados não são armazenados de forma persistente nem associados a uma identidade específica.{'\n'}
7.3. Para Utilizadores Registados: Recolhemos e tratamos os dados fornecidos durante o registo (endereço de correio eletrónico, número de telefone, password, username) para gerir a sua conta, autenticação, permitir a contribuição de informações e a participação no jogo. As fotografias e coordenadas GPS reportadas como zonas de risco são utilizadas para criar o mapa de calor, conforme descrito na Política de Privacidade.{'\n'}
7.4. A Salõnis é responsável pelo tratamento dos dados pessoais, conforme a Política de Privacidade e a legislação aplicável.{'\n'}{'\n'}

8. ACTUALIZAÇÕES{'\n'}
8.1. Os presentes Termos e Condições podem ser alterados unilateralmente pela Salõnis sempre que se mostre necessário, seja por motivos legais, técnicos ou de melhoria da Aplicação.{'\n'}
8.2. As alterações serão comunicadas aos Utilizadores através da Aplicação (por exemplo, mediante notificação ou publicação da versão actualizada).{'\n'}
8.3. O Utilizador reconhece que o uso contínuo da Aplicação após a publicação das alterações implica a aceitação dos novos Termos e Condições. Caso não concorde com as alterações, deverá cessar a utilização da Aplicação e, se for um utilizador registado, poderá cancelar a sua conta.{'\n'}{'\n'}

9. SUPORTE{'\n'}
9.1. Em caso de dúvidas, problemas ou necessidade de suporte técnico relacionado com a App MapaZZZ, o Utilizador poderá entrar em contacto com a Salõnis através do seguinte endereço de correio eletrónico: [Inserir Endereço de Email de Suporte].{'\n'}
9.2. A Salõnis envidará os melhores esforços para responder às questões e fornecer suporte de forma atempada.{'\n'}{'\n'}

10. LEI APLICÁVEL E FORO{'\n'}
10.1. Os presentes Termos e Condições regem-se pelas leis da República de Angola.{'\n'}
10.2. Qualquer litígio, questão ou reclamação decorrente ou relacionada com estes Termos e Condições será submetido à jurisdição exclusiva dos tribunais da República de Angola, especificamente o Tribunal da Comarca de Luanda, com renúncia a qualquer outro foro que possa ser competente em razão da sua nacionalidade ou domicílio.{'\n'}
Ao utilizar a Aplicação MapaZZZ, o Utilizador declara que compreendeu e aceita integralmente os presentes Termos e Condições.{'\n'}
        </Text>
      </ScrollView>

      <TouchableOpacity
        style={style.closeModalButton}
        onPress={() => setShowTermsModal(false)}
      >
        <Text style={style.closeModalButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  )
}

