import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";

type AlertType = "erro" | "sucesso" | "aviso";

interface CustomAlertProps {
  visible: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function CustomAlert({
  visible,
  type = "erro",
  title,
  message,
  onClose,
}: CustomAlertProps) {
  const titleMap = {
    erro: "Erro",
    sucesso: "Sucesso",
    aviso: "Aviso",
  };

  const colorMap = {
    erro: "#B00020",
    sucesso: "#007E33",
    aviso: "#FF8800",
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text style={[style.modalTitle, { color: colorMap[type] }]}>
            {title || titleMap[type]}
          </Text>
          <Text style={style.modalText}>{message}</Text>
          <TouchableOpacity style={style.modalButton} onPress={onClose}>
            <Text style={style.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
