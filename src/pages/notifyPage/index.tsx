import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useAlert} from "../alertProvider/index";
import { ArrowLeft, Clock } from 'lucide-react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatRelativeDate } from '../utils/date_formater';
import { style } from './style';

import logo from '../../assets/logo.png';
import esc from '../../assets/esc.png';
import alartQuiz from '../../assets/quizAlert.png';
import alartRain from '../../assets/rainAlarte.png';
import alertStop from '../../assets/stop.png';
import alertEdu from '../../assets/goo.png';
import useSocketNotification from '../utils/socketio';

// Configuração do WebSocket com socket.io-client
import { io } from 'socket.io-client';
const socket = io('https://mapazzz.onrender.com', {
  transports: ['websocket'],
  reconnection: true,
  recombinationAttempts: 5,
  recombinationDelay: 1000,
});

// Configuração de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotifyPage = ({ navigation }) => {
  const { showAlert } = useAlert();
  useSocketNotification();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageByType = (type) => {
    switch (type) {
      case 'clima':
        return alartRain;
      case 'jogo':
        return alartQuiz;
      case 'surto':
        return alertStop;
      case 'risco':
        return alertStop;
      default:
        return alertEdu;
    }
  };

  // Buscar notificações da API
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (!token) {
        await showAlert('erro', 'Você precisa estar logado.', 'Erro');
        navigation.navigate('Login');
        return;
      }

      const response = await fetch('https://mapazzz.onrender.com/api/notification', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          await showAlert('erro', 'Sessão expirada. Faça login novamente.', 'Erro');
          await AsyncStorage.removeItem('Token');
          navigation.navigate('Login');
          return;
        }
        throw new Error('Erro ao buscar notificações');
      }

      const notificationsData = Array.isArray(data) ? data : data.notifications || [];
      const notificationsWithImages = notificationsData.map((item) => ({
        ...item,
        image: getImageByType(item.typeNotification),
      }));

      setNotifications(notificationsWithImages);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      await showAlert('erro', 'Não foi possível carregar as notificações.', 'Erro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carregar notificações iniciais
    fetchNotifications();

    // Configurar WebSocket
    const handleConnect = () => {
      console.log('WebSocket conectado');
    };

    const handleNotificationClimate = (event) => {
      console.log('Evento recebido do WebSocket:', event);
      const newNotification = {
        id: Date.now().toString(),
        describe: event.data.describe || 'Chuva detectada na sua localização!',
        createdAt: new Date().toISOString(),
        typeNotification: event.data.typeNotification || 'clima',
        image: getImageByType(event.data.typeNotification || 'clima'),
      };

      // Adicionar apenas uma notificação
      setNotifications((prev) => {
        // Evitar duplicatas verificando ID ou conteúdo
        if (prev.some((n) => n.describe === newNotification.describe && n.createdAt === newNotification.createdAt)) {
          return prev;
        }
        return [newNotification, ...prev];
      });
    };

    const handleDisconnect = () => {
      console.log('WebSocket desconectado');
    };

    socket.on('connect', handleConnect);
    socket.on('notification', handleNotificationClimate);
    socket.on('disconnect', handleDisconnect);

    // Limpar WebSocket ao desmontar
    return () => {
      socket.off('connect', handleConnect);
      socket.off('notification', handleNotificationClimate);
      socket.off('disconnect', handleDisconnect);
    };
  }, [navigation]);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  return (
    <View style={style.mainConteiner}>
      {/* Topo */}
      <View style={style.logoX}>
        <TouchableOpacity onPress={() => navigation.navigate("MapaPage")}>
        <ArrowLeft color="#7F1734" size={35}/>
        </TouchableOpacity>
        <Image source={logo} style={style.logoImg} />
      </View>

      <View style={style.container}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#7f1734", marginBottom: 20, marginLeft: 10 }}>
          Notificações
          </Text>


        {loading ? (
          <ActivityIndicator size="large" color="#7F1734" />
        ) : (
          <ScrollView style={style.scroll}>
            {notifications.length === 0 ? (
              <Text style={style.notificationText}>Nenhuma notificação disponível</Text>
            ) : (
              notifications.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleNotificationPress(item)}
                >
                  <View style={style.infCamp}>
                    <Image source={item.image} style={style.notyType} />
                    <View style={style.styleText}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={style.notificationText}
                      >
                        {item.describe || 'Notificação sem descrição'}
                      </Text>
                      <View style={style.timeInfo}>
                        <Clock color="#999" size={14} />
                        <Text style={style.timeText}>
                          {formatRelativeDate(item.createdAt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            {selectedNotification && (
              <>
                <Image source={selectedNotification.image} style={style.modalImage} />
                <Text style={[style.modalText, { fontWeight: '700', fontSize: 18, marginBottom: 8 }]}>
                  {selectedNotification.title || selectedNotification.describe || 'Notificação'}
                </Text>
                <Text style={style.modalText}>
                  {selectedNotification.describe || 'Sem detalhes'}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={style.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={style.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotifyPage;