import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#e61919',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  messageNop:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userPostsContainer: {
    backgroundColor: '#e61919',
    marginTop: 20,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userPostsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
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

  containerForm: {
    flex: 1,
    backgroundColor: '#e61919',
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
    marginBottom: 10,
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
