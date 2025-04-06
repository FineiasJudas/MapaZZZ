import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner: {
    top: 30,
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
    marginBottom: 80,
    width: 60,
    height: 60,
    marginLeft: 50,
    resizeMode: 'contain'
  },
  optionsR: {
    marginBottom: 80,
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
    alignItems: 'flex-end'
  },
  locationContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // position: 'absolute',
    top: 15,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});