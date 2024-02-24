import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
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
    elevation: 10,
  },
  label: {
    fontSize: 15,
		fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  botaoAdicionar: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    margin: 8,
  },
});
