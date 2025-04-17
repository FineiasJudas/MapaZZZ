import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner: {
    top: 25,
    width: '100%',
    height: '100%',
  },
  escImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoX: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: 5
  },
  optionsL: {
    marginBottom: 140,
    width: 60,
    height: 60,
    marginLeft: 50,
    resizeMode: 'contain'
  },
  optionsR: {
    marginBottom: 140,
    width: 60,
    height: 60,
    marginRight: 50,
    resizeMode: 'contain'
  },
  options: {
    marginBottom: 80,
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  locationContainer: {
    marginLeft: 30,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});