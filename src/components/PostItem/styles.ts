import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/ThemeProvider';

const { theme } = useTheme();

export const styles = StyleSheet.create({
  postContainer: {
    margin: 16,
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    resizeMode: 'contain',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.COLORS.POST_TITLE,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.COLORS.POST_TITLE,
  },
  postContent: {
    fontSize: 18,
    color: theme.COLORS.POST_CONTENT,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: 'flex-end',
  },
});
