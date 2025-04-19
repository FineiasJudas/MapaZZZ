import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5f5f5'
  },
  smallLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 60,
  },
  googleButton: {
    width: "80%", // Responsivo
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  googleImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  boxImput: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    padding: 30,
    marginBottom: 30,
  },
  boxNameImput: {
    backgroundColor: '#fff',
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DfDfDf",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  boxSenhaImput: {
    backgroundColor: '#fff',
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DfDfDf",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButtonView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonImage: {
    width: 300,
    height: 50,
    borderRadius: 10,
    resizeMode: "contain",
  },
  signTexView: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  signAsGuessView: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEntrarText: {
    position: "absolute",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  criarButton: {
    fontSize: 14,
    fontWeight: "bold",
  },
  entrarComoGuessButton: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
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