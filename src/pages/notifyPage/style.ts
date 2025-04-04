import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainConteiner:{
    top: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
  logoX:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  escImg:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  logoImg:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  infCamp:{
    width:'100%',
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#D9D9D9',
    marginTop: 10,
    padding: 10
  },
  scroll:
  {
    width: '100%',
    height: '100%'
  },
  notyType:
  {
    marginRight: 8,
    width: 28,
    height: 28,
  },
  styleText: {
    flex: 1,
  },
  
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end', // fica no canto inferior direito
    marginTop: 8,
  },
  
  timeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
}
);
