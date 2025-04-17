import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
    Container:{
        flex: 1,
    },
    conteinar:{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 30, paddingTop: 4},
    imgLogo:{width: 40, height: 40, resizeMode: 'contain'},
    content: {width: '85%', maxHeight: height * 0.78},
    buttonEnviar: { width: '80%', height: 45, backgroundColor: '#7F1734', borderRadius: 10, justifyContent: 'center', padding: 12, alignItems: 'center', marginTop: 30},
    textEnviar: {color: '#fff', fontWeight: 'bold', position: 'absolute'},
    infCamp: {
        width: '100%',
        minHeight: height * 0.1,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 10,
        flexDirection: 'row',
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
      modalStyle:{
        position: 'absolute',
        bottom: 100,
        left: 50,
        right: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }
});