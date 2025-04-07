import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner: {
    flex: 1,
    justifyContent: 'space-between', // Distribui o espaço entre os componentes
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    marginTop: 50,
  },
  enterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoX: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButtonImage: {
    width: 300,
    height: 50,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  buttonEntrarText1: {
    position: 'absolute',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonEntrarText2: {
    position: 'absolute',
    color: '#7F1734',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 60,
    marginBottom: 15, // Ajuste essa margem conforme necessário
  },
  bySalonisImg: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
});