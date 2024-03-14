import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textoVazio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  containerHeader: {
    marginTop: "15%",
    marginBottom: "10%",
    paddingStart: "5%",
  },
  containerForm: {
    flex: 1,
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
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 10,
  },
  toggleHorarioButtonText: {},
  botaoAdicionar: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 14,
  },
  textoBotao: {},
  listaContainer: {
    flex: 1,
  },

  addButtonText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textoMedicao: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },

  containerBotoes: {
    flexDirection: "row",
  },
  botaoEditar: {
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
  },
  botaoExcluir: {
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  themeToggleButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 0 : 40,
    right: 20,
    padding: 5,
    borderRadius: 20,
  },
});
