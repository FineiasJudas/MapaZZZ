import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems: 'center'
    },
    conteinar:{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 30, marginBottom: 30},
    imgLogo:{width: width * 0.1,
    height: width * 0.1, resizeMode: 'contain'},
    content: {width: '85%'},
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
        paddingVertical: 12,
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


