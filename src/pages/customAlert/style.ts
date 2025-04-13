import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: screenWidth * 0.8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#7F1734",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});