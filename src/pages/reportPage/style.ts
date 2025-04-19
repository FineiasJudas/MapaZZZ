import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  mainConteiner: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: height * 0.1,
  },
  logoX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.03,
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
    fontSize: width * 0.055,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: height * 0.02,
  },
  imagePicker: {
    borderRadius: width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.07,
  },
  pikerView: {
    height: height * 0.25,
    width: '100%',
    marginBottom: height * 0.01,
    alignItems: 'center',
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: width * 0.1,
  },
  picker: {
    height: height * 0.06,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: height * 0.07,
  },
  reportButton: {
    padding: height * 0.02,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  textMinus: {
    color: "#000",
    fontSize: width * 0.04,
    textAlign: "center",
    paddingTop: height * 0.01,
    marginTop: height * 0.01,
  },
  buttonReportar: {
    backgroundColor: "#7F1734",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-around",
    width: width * 0.8,
    marginBottom: height * 0.015,
  },
  textReportar: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  levelContainer: {
    marginTop: height * 0.01,
    alignItems: 'center',
  },
  levelText: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Regular',
  },
  descriptionContainer: {
    margin: width * 0.05,
    padding: width * 0.03,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: width * 0.035,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
