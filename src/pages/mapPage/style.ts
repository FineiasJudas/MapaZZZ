import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  meIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 30,
    elevation: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  menuIcons: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  recenterButton: {
    position: "absolute",
    bottom: 120,
    right: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    elevation: 3,
  },
  recenterIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
    // paddingHorizontal: 20,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  menuItem: {
    padding: 8,
    flexDirection: "row",
    alignItems: 'center'
  },
  menuIc:{
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  spaceName : {
    height : 30,
    width : 30,
    backgroundColor : "black",
    position : "absolute",


  }


});
 