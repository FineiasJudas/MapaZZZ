import { StyleSheet, Dimensions } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  meIcon: {
    top: 10,
    left: 10,
    width: 25,
    height: 20,
    resizeMode: "contain",
  },
  menuButton: {
    position: "absolute",
    top: 35,
    left: 15,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 30,
    elevation: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
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
    left: 0,
    top: 30,
    bottom: 2,
    width: "80%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 15,
    color: "#77767b",
    fontSize: 18,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 15,
    marginBottom: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileTextContainer: {
    flexDirection: "column",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileStatus: {
    fontSize: 14,
    color: "#777",
  },
  scrollView: {
    flex: 1,
  },
  contactContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 14,
    color: "#444",
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    borderRadius: 20,
    // borderStartEndRadius: 50,
    // borderEndStartRadius: 50,
    // borderStartStartRadius: 50,
    // borderEndEndRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 20,
    // marginHorizontal: 30,
    // elevation: 6,
    // borderTopWidth: 2,
    // borderColor: '#ddd',
  },
  bottomBarItem: {
    alignItems: 'center',
    
  },
  bottomBarText: {
    fontSize: 10,
    color: '#77767B',
  },
  activeTabItem: {
  // backgroundColor: '#ffffff22', // leve destaque de fundo
  borderRadius: 10,
  // padding: 5,
},

activeTabText: {
  color: '#000', // amarelo ouro
  fontWeight: 'bold',
  textDecorationLine: 'underline', // sublinhado
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#fff',
  width: '80%',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  elevation: 5
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  color: '#333',
  marginBottom: 20,
  textAlign: 'center'
},
modalButton: {
  backgroundColor: '#7F1734',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 20,
},
modalButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});

 