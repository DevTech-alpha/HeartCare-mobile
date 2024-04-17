import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 13,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
