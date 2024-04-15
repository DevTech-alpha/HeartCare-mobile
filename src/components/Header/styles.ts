import { StyleSheet, Platform } from "react-native";

const isAndroid = Platform.OS === "android";

export const styles = StyleSheet.create({
  contain: {
    marginTop: isAndroid ? -10 : 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: isAndroid ? 0 : 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800020",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: isAndroid ? 10 : 5,
  },
});
