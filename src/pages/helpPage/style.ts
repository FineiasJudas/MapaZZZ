import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
    Container:{
        flex: 1,
    },
    conteinar:{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 30},
    imgLogo:{width: 40, height: 40, resizeMode: 'contain'},
    content: {flex: 1, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', },
    boxImput: { width: '80%', height: 45,  marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DFDFDF'},
    boxImputP: { width: '80%', height: 100,  marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#DFDFDF'},
    boxInput: {
        marginBottom: 15,
      },
      
      inputLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        marginLeft: 5,
      },
      
      inputField: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
      
      buttonEnviar: {
        backgroundColor: "#7f1734",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
      },
      
      textEnviar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      
});


