import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 13,
    marginTop: 15,
    paddingBottom: 8,
  },
  input: {
    height: 50,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 12,
    paddingStart: 10,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    padding: 5,
    fontWeight: "bold",
  },
  togglePasswordButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  togglePasswordButtonText: {
    fontSize: 14,
  },
  buttonRegister: {
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
