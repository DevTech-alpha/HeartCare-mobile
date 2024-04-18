import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerCartao: {
    margin: 5,
    borderRadius: 20,
    padding: 8,
  },
  containerCardsAtividade: {
    flexDirection: "row",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  containerProgresso: {
    alignSelf: "center",
    margin: 5,
  },
  containerDetalhes: {
    marginVertical: 5,
  },
  textoDetalhes: {
    fontSize: 10,
    fontWeight: "bold",
  },
  nomeAtividade: {
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  circle: {
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontWeight: "bold",
    fontSize: 12,
  },
});