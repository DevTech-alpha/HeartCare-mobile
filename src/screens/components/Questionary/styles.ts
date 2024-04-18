import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  questionContainer: {
    marginVertical: 16,
    borderRadius: 20,
    padding: 16,
  },
  questionText: {
    fontSize: 13,
    marginBottom: 16,
  },
  Text: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 15,
  },
  progressBar: {
    height: 5,
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonProximo: {
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navigationButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
