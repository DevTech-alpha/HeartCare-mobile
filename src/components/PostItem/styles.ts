import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  postContainer: {
    margin: 16,
    backgroundColor: '#fff',
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
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  postContent: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: 'flex-end',
  },
});
