import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  textoModal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 12,
    paddingStart: 10,
  },
  button: {
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoFechar: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  textoBotao: {
    fontWeight: "bold",
  },
});

export default styles;
