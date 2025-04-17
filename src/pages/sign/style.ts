import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
    body : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 70
    },
    Container:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Logo no top
    topLeftLogo: {
    },
    smallLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 60
        
    },
    // Botão de login com Google
    googleButton: {
        width: "80%",
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: '#7F1734',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    googleImage: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    googleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    // Campos de entrada
    boxImput:{
        height: Dimensions.get('window').height / 2,
        width: '100%',
        padding: 30
    },
    boxFullNameImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        marginTop: 10,
        paddingHorizontal: 15
    },
    boxphoneImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        marginTop: 10,
        paddingHorizontal: 15
    },
    boxAdressImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        marginTop: 10,
        paddingHorizontal: 15
    },
    boxSenhaImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        marginTop: 10,
        paddingHorizontal: 15
    },
    inputText: {
        flex: 1,
        fontSize: 15,
        color: '#333000'
    },
    // Botões de login e cadastro
    loginButtonView:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonImage: { 
        width: 300,
        height: 50,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    signAsGuessView:{
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonEntrarText:{
        position: 'absolute',  
        color: 'white',       
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    entrarComoGuessButton:{
        fontSize: 14,
    fontWeight: 'bold'
    },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        padding: 10
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#7F1734',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
      },
      checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: '#7F1734'
      },
      checkboxText: {
        fontSize: 14
      },
      disabledButton: {
            opacity: 0.3
      },
      modalOverlay: {
        flex: 1,
        paddingVertical: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalContainer: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 20,
        elevation: 10
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
      },
      modalContent: {
        fontSize: 14,
        color: '#333',
        marginBottom: 20
      },
      closeModalButton: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#7F1734',
        borderRadius: 8
      },
      closeModalButtonText: {
        color: '#FFF',
        fontWeight: 'bold'
      },
      linkText: {
        color: '#7F1734',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
      },
      modalScroll: {
        maxHeight: 300, // ajuste conforme o tamanho ideal
        marginBottom: 10
      }      
});
