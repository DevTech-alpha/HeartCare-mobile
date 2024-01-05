import { StyleSheet } from "react-native";

import theme from "../../theme";

export const styles = StyleSheet.create({
  textoBotao: {
    color: '#FFF',
  },
  itemMedicao: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  textoMedicao: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textoMedicaoBoa: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  textoMedicaoRuim: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  containerBotoes: {
    flexDirection: 'row',
  },
  botaoEditar: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
  botaoExcluir: {
    backgroundColor:  theme.COLORS.BUTTON,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
});
