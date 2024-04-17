import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textoBotao: {
    fontWeight: "bold",
  },
  itemMedicao: {
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
  textoMedicao: {
    fontSize: 14,
    margin: 2,
  },
  containerBotoes: {
    flexDirection: "row",
  },
  botao: {
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
    marginTop: 8,
  },
});
