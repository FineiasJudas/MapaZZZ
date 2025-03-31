import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
    Container:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Logo no canto superior direito
    topLeftLogo: {
    },
    smallLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 80
    },
    // Botão de login com Google
    googleButton: {
        width: 300,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#7F1734',
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
        height: Dimensions.get('window').height / 3,
        width: '100%',
        padding: 30,
        marginBottom: 30
    },
    boxNameImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#7F1734',
        marginTop: 10,
        paddingHorizontal: 15
    },
    boxSenhaImput:{
        width:'100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#7F1734',
        marginTop: 10,
        paddingHorizontal: 15
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    // Botões de login e cadastro
    loginButtonView:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginButtonImage: {
        width: 300,
        height: 50,
        borderRadius: 10,
        resizeMode: 'contain'
    },
    signTexView:{
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
    criarButton:{
        fontSize: 14,
        fontWeight: 'bold'
    },
    entrarComoGuessButton:{
        fontSize: 14,
        fontWeight: 'bold'
    },

});


