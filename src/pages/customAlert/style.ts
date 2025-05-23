import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0)",
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
    backgroundColor: "#6D122C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonCancel: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#6D122C",
    borderRadius: 10,
  },
  modalButtonYes: {
    backgroundColor: "#6D122C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonTextCancel: {
    color: "#6D122C",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtonTextYes: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
});
