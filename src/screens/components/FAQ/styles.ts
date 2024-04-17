import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  questionContainer: {
    margin: 16,
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
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
  button: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
