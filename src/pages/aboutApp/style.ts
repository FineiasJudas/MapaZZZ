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
    content: {width: '85%', marginTop: 30, justifyContent: 'center', paddingBottom: 100},
      
      textEnviar: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
        text: {
          color: '#333',
          fontSize: 16,
          fontFamily: 'poppins',
          fontWeight: '700'
        },
        link: {
          color: 'blue',
          textDecorationLine: 'underline'
        }
      
});


