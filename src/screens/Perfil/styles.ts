import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e61919',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  choosePhotoText: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 10,
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#e61919',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  text: {
    color: '#a1a1a1',
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
    justifyContent: 'center',
  },
  buttonLogout: {
    backgroundColor: '#e61919',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '20%', // Ajustado para evitar sobreposição com o botão de acesso
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
