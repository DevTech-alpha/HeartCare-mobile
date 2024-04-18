import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContent: {
    fontSize: 12,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: "flex-end",
  },
});
