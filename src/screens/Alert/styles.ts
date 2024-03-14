import { Platform, StyleSheet } from "react-native";

export const estilo = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    width: "90%",
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
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  days: {},
  button: {
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    margin: 20,
  },
  buttonText: {
    fontSize: 15,
  },
  content: {
    width: "90%",
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  containerScroll: {
    width: "90%",
    marginTop: 8,
  },
  themeToggleButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 0 : 40,
    right: 20,
    padding: 5,
    borderRadius: 20,
  },
});
