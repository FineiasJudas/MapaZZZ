import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Clock } from "lucide-react-native";
import { style } from "./style";

import logo from "../../assets/logo.png";
import esc from "../../assets/esc.png";
import alartQuiz from "../../assets/quizAlert.png";
import alartRain from "../../assets/rainAlarte.png";

const NotifyPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const notificationsData = [
    {
      id: 1,
      text: "Há uma nova zona de risco de contágio da malária! Ole pealle. Detalhes completos sobre a localização e medidas de prevenção devem ser consultados.",
      time: "há 5 min",
      image: alartQuiz,
    },
    {
      id: 2,
      text: "Atenção: Chuvas intensas previstas para hoje. Evite áreas alagadas e zonas de mosquito. Use repelente.",
      time: "há 10 min",
      image: alartRain,
    },
  ];

  const handleNotificationPress = (notification: any) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  return (
    <View style={style.mainConteiner}>
      <View style={style.logoX}>
        <TouchableOpacity>
          <Image source={esc} style={style.escImg} />
        </TouchableOpacity>
        <View>
          <Image source={logo} style={style.logoImg} />
        </View>
      </View>

      <View style={style.container}>
        <Text style={{ marginTop: 20, marginBottom: 10, left: 6, fontSize: 18, fontWeight: "700" }}>
          Notificações:
        </Text>
        <ScrollView style={style.scroll}>
          {notificationsData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleNotificationPress(item)}>
              <View style={style.infCamp}>
                <Image source={item.image} style={style.notyType} />
                <View style={style.styleText}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={style.notificationText}>
                    {item.text}
                  </Text>
                  <View style={style.timeInfo}>
                    <Clock color="#999" size={14} />
                    <Text style={style.timeText}>{item.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

            {notificationsData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleNotificationPress(item)}>
              <View style={style.infCamp}>
                <Image source={item.image} style={style.notyType} />
                <View style={style.styleText}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={style.notificationText}>
                    {item.text}
                  </Text>
                  <View style={style.timeInfo}>
                    <Clock color="#999" size={14} />
                    <Text style={style.timeText}>{item.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            {selectedNotification && (
              <Image source={selectedNotification.image} style={style.modalImage} />
            )}
            <Text style={style.modalText}>{selectedNotification?.text}</Text>
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
