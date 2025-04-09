import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 40,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContainer: {
    alignItems: "center",
    width: "100%",
  },
  mapaLogo: {
    width: "100%",
    height: 18,
    resizeMode: "contain",
    marginBottom: 10,
  },
  welcomeImg: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
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
  buttonEntrarText1: {
    position: "absolute",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonEntrarText2: {
    position: "absolute",
    color: "#7F1734",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  bySalonisImg: {
    width: 80,
    height: 50,
    resizeMode: "contain",
  },
});
