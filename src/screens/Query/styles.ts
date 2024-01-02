import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e61919',
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
      backgroundColor: '#FFF', // Substitua pela cor desejada
      borderRadius: 4,
      padding: 8,
      marginHorizontal: 5,
    },
    messagePre:{
      paddingTop:20,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#e61919',
    },
    containerForm: {
      flex: 1,
      backgroundColor: '#FFF',
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
  });
  