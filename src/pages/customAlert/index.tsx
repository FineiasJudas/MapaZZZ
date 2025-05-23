import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";

export type AlertType = "erro" | "sucesso" | "aviso" | "confirmacao";

interface CustomAlertProps {
  visible: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  onClose: (confirmed: boolean) => void; // Alterado para receber booleano
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
    confirmacao: "Confirmação", // Novo título
  };

  const colorMap = {
    erro: "#B00020",
    sucesso: "#007E33",
    aviso: "#6D122C",
    confirmacao: "#6D122C", // Cor para confirmação
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text style={[style.modalTitle, { color: colorMap[type] }]}>
            {title || titleMap[type]}
          </Text>
          <Text style={style.modalText}>{message}</Text>

          {type === "confirmacao" ? (
            <View style={style.modalButtonsContainer}>
              <TouchableOpacity
                style={[style.modalButtonCancel]}
                onPress={() => onClose(false)}
              >
                <Text style={style.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.modalButtonYes]}
                onPress={() => onClose(true)}
              >
                <Text style={style.modalButtonTextYes}>Sim</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[style.modalButton]}
              onPress={() => onClose(false)}
            >
              <Text style={style.modalButtonTextYes}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
