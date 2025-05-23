import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
  Container: {
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
  conteinar: { marginTop: height * 0.03, paddingHorizontal: width * 0.08 },
  imgLogo: { width: width * 0.085, height: width * 0.1, resizeMode: "contain" },
  content: { width: "100%", maxHeight: height * 0.78 },
  buttonEnviar: {
    width: "80%",
    height: 45,
    backgroundColor: "#6D122C",
    borderRadius: 10,
    justifyContent: "center",
    padding: 12,
    alignItems: "center",
    marginTop: 30,
  },
  infCamp: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: height * 0.01,
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    flexDirection: "row",
    padding: width * 0.03,
    marginBottom: height * 0.015,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D122C",
    marginLeft: 0,
  },
  notyType: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.03,
    resizeMode: "contain",
  },
  styleText: {
    flex: 1,
  },
  notificationText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  modalStyle: {
    position: "absolute",
    bottom: 100,
    left: 50,
    right: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
