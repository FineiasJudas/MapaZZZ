// src/hooks/useSocketNotification.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import * as Notifications from 'expo-notifications';

export default function useSocketNotification() {
  useEffect(() => {
    const socket = io('https://mapazzz.onrender.com', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('notification', (data) => {
      console.log('Notificação recebida do servidor:', data);
        
      Notifications.scheduleNotificationAsync({
        content: {
          title: data.data.title || 'Nova Notificação!',
          body: data.data.describe|| 'Você recebeu uma nova notificação',
          sound: true,
        },
        trigger: { 
          seconds: 1,
          repeats: true,
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}

