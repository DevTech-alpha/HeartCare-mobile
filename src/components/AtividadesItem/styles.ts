import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerCardsAtividade: {
    flexDirection: 'row',
  },
  containerCartao: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  containerProgresso: {
    alignSelf: 'center',
    margin: 5
  },
  textoProgresso: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  containerDetalhes: {
    marginVertical: 5
  },
  textoDetalhes: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  nomeAtividade: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  textoBotao: {},
});
