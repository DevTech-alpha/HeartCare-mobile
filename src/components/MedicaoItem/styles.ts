import { StyleSheet } from "react-native";

import theme from "../../theme";

export const styles = StyleSheet.create({
  textoBotao: {
    color: theme.COLORS.BUTTON_TEXT,
  },
  itemMedicao: {
    margin: 16,
    backgroundColor: theme.COLORS.WHITE,
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
    color: theme.COLORS.POST_CONTENT,
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
