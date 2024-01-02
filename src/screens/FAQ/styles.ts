import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e61919',
    paddingLeft: 10, 
    paddingRight: 10,
  },
  questionContainer: {
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    padding: 16,
  },
  answerText: {
    fontSize: 16,
    color: '#555555',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  questionTouchable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: 20,
    paddingStart: '5%',
  },
  message: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
