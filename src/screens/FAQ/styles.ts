import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  questionContainer: {
    margin: 16,
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  questionText: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 16,
  },
  answerText: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Ajustando o alinhamento dos ícones
    alignItems: "center",
    padding: 10,
  },
});
