import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingStart: '5%',
    paddingEnd: '5%',
    position: 'relative', 
  },
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  mapaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapa: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '115%',
    height: '100%',
  },
  alertButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.COLORS.BUTTON,
    borderRadius: 30,
    padding: 15,
  },
});
