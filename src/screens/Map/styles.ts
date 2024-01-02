import { StyleSheet } from "react-native";

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
    backgroundColor: '#e61919',
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
    backgroundColor: '#e61919',
    borderRadius: 30,
    padding: 15,
  },
});
