import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
  mainConteiner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoX: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
    width: "88%",
    marginHorizontal: "auto",
  },
  logoImg: {
    width: width * 0.085,
    height: width * 0.1,
    resizeMode: "contain",
  },
  container: {
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  scroll: {
    width: "100%",
    maxHeight: height * 0.78, // limita scroll sem ocupar toda tela
  },
  infCamp: {
    backgroundColor: "#fff",
    width: "100%",
    minHeight: height * 0.1,
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: height * 0.015,
  },
  notyType: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.03,
    resizeMode: "contain",
  },
  styleText: {
    flex: 1,
    margin: 1,
    justifyContent: "space-between",
  },
  notificationText: {
    left: 0,
    fontSize: 16,
    color: "#444",
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-end",
    paddingRight: 16,
  },
  timeText: {
    fontSize: 13,
    color: "#999",
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#6D122C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
