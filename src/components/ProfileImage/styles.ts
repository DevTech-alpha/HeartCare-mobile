import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Common styles
  container: {
    flex: 1,
    backgroundColor: '#e61919',
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
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  // Profile styles
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  choosePhotoText: {
    fontSize: 20,
    color: '#e61919',
    marginTop: 15,
  },
  // Form styles
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
