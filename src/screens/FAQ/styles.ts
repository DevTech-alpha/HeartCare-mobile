import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
    padding: 10,
  },
  questionContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
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
  message: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
