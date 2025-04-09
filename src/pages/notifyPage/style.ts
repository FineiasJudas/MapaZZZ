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
  escImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  logoImg: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  container: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.06,
    flex: 1,
  },
  scroll: {
    width: '100%',
    maxHeight: height * 0.78, // limita scroll sem ocupar toda tela
  },
  infCamp: {
    width: '100%',
    minHeight: height * 0.1,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.03,
    marginBottom: height * 0.015,
  },
  notyType: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.03,
    resizeMode: 'contain',
  },
  styleText: {
    flex: 1,
    justifyContent: 'space-between',
  },
  notificationText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  timeText: {
    fontSize: width * 0.03,
    color: '#999',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#7F1734',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },  
   
});
