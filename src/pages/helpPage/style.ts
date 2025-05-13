import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const style = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems: 'center'
    },
    conteinar:{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: height * 0.001,
      paddingHorizontal: width * 0.03,
    },
    imgLogo:{width: width * 0.085,
    height: width * 0.1, resizeMode: 'contain'},
    content: {width: '80%', marginTop: 30},
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
        backgroundColor: "#6D122C",
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


