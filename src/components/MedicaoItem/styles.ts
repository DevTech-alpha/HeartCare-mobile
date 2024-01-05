import { StyleSheet } from "react-native";

import theme from "../../theme";

export const styles = StyleSheet.create({
  textoBotao: {
    color: '#FFF',
  },
  itemMedicao: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    elevation: 3, // Adiciona elevação para a sombra no Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3, // Ajusta a opacidade da sombra no iOS
    shadowRadius: 4, // Ajusta o raio da sombra no iOS
    borderWidth: 2, // Adiciona uma leve borda
    borderColor: '#e0e0e0', // Cor da borda
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
