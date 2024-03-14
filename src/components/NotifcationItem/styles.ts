import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContent: {
    fontSize: 15,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: "flex-end",
  },
  likerImage: {
    width: 24,
    height: 24,
    borderRadius: 8,
    marginRight: 2,
  },
});
