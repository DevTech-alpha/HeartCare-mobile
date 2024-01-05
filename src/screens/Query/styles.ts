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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  botaoEditarAtivo: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
  messagePre: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e61919',
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
    backgroundColor: '#e61919',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 10,
  },
  toggleHorarioButtonText: {
    color: '#FFF',
  },
  botaoAdicionar: {
    backgroundColor: '#e61919',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 14,
  },
  textoBotao: {
    color: '#FFF',
  },
  listaContainer: {
    flex: 1,
  },
  itemMedicao: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    elevation: 3, // Adiciona elevação para a sombra no Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, // Ajusta a opacidade da sombra no iOS
    shadowRadius: 4, // Ajusta o raio da sombra no iOS
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
    backgroundColor: '#e61919',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
  botaoExcluir: {
    backgroundColor: '#e61919',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  botaoCancelar: {
    backgroundColor: '#e61919',
    borderRadius: 4,
    padding: 8,
    marginTop: 10,
  },
  iconeMedicao: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
  },
});
