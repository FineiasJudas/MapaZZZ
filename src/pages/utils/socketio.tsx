// src/hooks/useSocketNotification.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import * as Notifications from 'expo-notifications';

export default function useSocketNotification() {
  useEffect(() => {
    const socket = io('https://mapazzz.onrender.com', {
      transports: ['websocket'],
    },);

    socket.on('notification', (data) => {
      console.log('Notificação recebida do servidor:', data);
      const typeNotify = data.data.title == "Jogo" ? "GamingPage" : "initPage";
      Notifications.scheduleNotificationAsync({
        content: {
          title: data.data.title || 'Nova Notificação!',
          body: data.data.describe|| 'Você recebeu uma nova notificação',
          sound: true,
          data : {
            screen : typeNotify 
          }
        },
        trigger: null,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}

