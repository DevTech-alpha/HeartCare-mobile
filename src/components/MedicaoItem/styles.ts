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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  textoMedicao: {
    fontSize: 15,
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
