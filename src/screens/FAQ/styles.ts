import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks/ThemeProvider';

const { theme } = useTheme();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },
  questionContainer: {
    margin: 16,
    backgroundColor: theme.COLORS.WHITE,
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
    color: theme.COLORS.POST_TITLE,
    padding: 16,
  },
  answerText: {
    fontSize: 16,
    color: theme.COLORS.POST_CONTENT,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
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
    color: theme.COLORS.WHITE,
  },
});
