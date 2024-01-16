import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.BACKGROUND,
  },

  overlay: {
    flex: 1,
    backgroundColor: theme.COLORS.OVERLEY,
  },

  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: theme.COLORS.BUTTON,
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

  buttonInfo: {
    position: 'absolute',
    top: 100,  // Adjusted the position to the top
    right: 24,
    backgroundColor: theme.COLORS.BUTTON,
    width: 50,
    height: 50,
    borderRadius: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

  addButtonText: {
    fontSize: 30,
    color: theme.COLORS.WHITE,
    fontWeight: 'bold',
  },

  message: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.COLORS.WHITE,
  },
});
