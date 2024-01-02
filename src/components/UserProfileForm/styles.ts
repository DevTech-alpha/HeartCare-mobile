import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  title: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 25,
    marginBottom: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e61919',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
