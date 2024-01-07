import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  containerHeader: {
    marginTop: '15%',
    marginBottom: '10%',
    paddingStart: '5%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 0,
  },
  label: {
    fontSize: 15,
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  toggleHorarioButton: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 10,
  },
  toggleHorarioButtonText: {
    color: theme.COLORS.BUTTON_TEXT,
  },
  botaoAdicionar: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 14,
  },
  textoBotao: {
    color: theme.COLORS.BUTTON_TEXT,
  },
  listaContainer: {
    flex: 1,
  },
  textoMedicao: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },

  containerBotoes: {
    flexDirection: 'row',
  },
  botaoEditar: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
  },
  botaoExcluir: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },

});
