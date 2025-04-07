import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      marginTop: 10,
    },
  });