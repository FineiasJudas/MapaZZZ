import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
  mainConteiner: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff", // Pode mudar conforme seu tema
  },
  logoX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.06,
  },
  logoImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  quizContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: width * 0.06,
  paddingTop: height * 0.02,
},

quizTitle: {
  fontSize: 20,
  fontWeight: '800',
  marginVertical: 20,
  color: '#7F1734'
},

quizDivider: {
  elevation: 6, // um pouco mais suave
  shadowColor: '#7F1734',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  width: '95%',
  borderRadius: 12,
  backgroundColor: '#f5f5f5', // um pouco mais claro que #dfdfdf
  padding: 18,
  alignSelf: 'center',
},
quizQuestion: {
  fontSize: 16,
  color: '#333',
  marginBottom: 20,
  lineHeight: 22,
},
inputContainer: {
  marginTop: 16,
  width: '95%',
},

textInput: {
  elevation: 4,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  borderColor: "#dfdfdf",
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: 16,
  backgroundColor: "#f0f0f0",
  color: "#000",
},

submitButton: {
  backgroundColor: "#7F1734",
  width: '95%',
  paddingVertical: 14,
  borderRadius: 10,
  marginTop: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

submitText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
},

modalContainer: {
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 25,
  width: "85%",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 8,
},

modalImage: {
  width: 100,
  height: 100,
  marginBottom: 15,
  resizeMode: "contain",
},

modalText: {
  fontSize: 16,
  color: "#333",
  textAlign: "center",
  marginBottom: 20,
  lineHeight: 22,
},

closeButton: {
  backgroundColor: "#7F1734",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
},

closeButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},


});
