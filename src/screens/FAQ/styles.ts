import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  questionContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 3, // Adiciona elevação para a sombra no Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, // Ajusta a opacidade da sombra no iOS
    shadowRadius: 4, // Ajusta o raio da sombra no iOS
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
