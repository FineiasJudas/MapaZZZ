import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner:{
    flex: 1,
    // backgroundColor: '#7F1734',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 35,
    // paddingLeft: 10,
    // paddingRight: 10
  },
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
     padding: 70,
  },
  logoX:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    backgroundColor: "#7F1734",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  pikerView:{
    height: Dimensions.get('window').height / 4,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 70,
  },
  reportButton: {
    flexDirection: "row",
    backgroundColor: "#7F1734",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 90,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});