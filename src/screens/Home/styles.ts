import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.PRIMARY
  },
  containerLogo: {
    flex: 2,
    backgroundColor: theme.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12
  },
  text: {
    color: theme.COLORS.TEXT,
  },
  buttonAcessar: {
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 20,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '15%',  // Ajustado para melhor posicionamento
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: theme.COLORS.BUTTON_TEXT,
    fontWeight: 'bold'
  }
});
