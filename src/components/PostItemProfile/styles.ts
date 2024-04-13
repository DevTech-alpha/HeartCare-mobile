import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 16,
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
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContent: {
    fontSize: 13,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: "flex-end",
  },
});
