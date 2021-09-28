import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  viewContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImageWrapper: {
    paddingLeft: 15,
    paddingBottom: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
    fontFamily: "sans-serif",
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
  input: {
    padding: 8,
    margin: 10,
    width: 310,
    height: 60,
    borderWidth: 1,
  },
  button: {
    alignSelf: "center",
    width: 200,
    margin: 10,
  },
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
