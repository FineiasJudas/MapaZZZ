import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  
  mainConteiner: {
    flex: 1,
    top: 12,
    flexDirection: 'column',
    fontFamily: 'Poppins-Regular',
  },
  enterContainer: {
    marginTop: 30,
    marginBottom: 120,
    alignItems: 'center',
  },
  logoX: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  escImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  logoGeo: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  geoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  loginButtonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
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
    textAlign: 'center'
  },
  buttonEntrarText2: {
    position: 'absolute',
    color: '#7F1734',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  containerCategoria: {
    //  backgroundColor: '#F2F2F2',
    
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 20,
    // marginHorizontal: 20,
    width: '100%',
    height: 50,
  },

  TitleCategoria: {
    width: '100%',
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: "#000",
  },
  containerSobre : {
    marginHorizontal: 10,
  },
  textSobre : {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '200',   
  }

});