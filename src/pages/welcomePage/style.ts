import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner:{
    top: 30,
    flexDirection: 'column'
  },
  container: {
    marginTop: 50,
  },
  enterContainer:{
    marginTop: 30,
    marginBottom:120,
    alignItems: 'center',
  },
  logoX:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  escImg:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  logoImg:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loginButtonView:{
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
buttonEntrarText1:{
  position: 'absolute',  
  color: 'white',       
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
},
buttonEntrarText2:{
  position: 'absolute',  
  color: '#7F1734',       
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center'
}
});