import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  mainConteiner: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.04,
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  logoX: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  escImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain'
  },
  logoImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain'
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: height * 0.02,
  },
  imagePicker: {
    borderRadius: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.04,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  pikerView: {
    height: height * 0.25,
    width: '100%',
    marginBottom: height * 0.02,
    alignItems: 'center',
  },
  picker: {
    height: height * 0.06,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: height * 0.05,
  },
  reportButton: {
    padding: height * 0.02,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    marginBottom: height * 0.05,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  textMinus: {
    color: "#000",
    fontSize: 15,
    textAlign: "center",
    paddingTop: height * 0.015,
    marginTop: height * 0.015,
  },
  buttonReportar: {
    backgroundColor: "#7F1734",
    padding: height * 0.015,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    maxWidth: 320,
    marginBottom: height * 0.015,
  },
  textReportar: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  levelContainer: {
    marginTop: height * 0.01,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  descriptionContainer: {
    margin: width * 0.05,
    padding: width * 0.03,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
