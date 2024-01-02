import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e61919'
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#e61919',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12
  },
  text: {
    color: '#a1a1a1'
  },
  buttonAcessar: {
    backgroundColor: '#e61919',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  }
});
