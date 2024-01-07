import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    borderRadius: 25,
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
    backgroundColor: theme.COLORS.BUTTON,
    width: '100%',
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.COLORS.BUTTON_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
