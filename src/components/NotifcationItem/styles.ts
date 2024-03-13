import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationContainer: {
    margin: 16,
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
  notificationText: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 16,
  },
  answerText: {
    fontSize: 15,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  message: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },
  userPhoto: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 15,
	},
	postHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	username: {
		fontSize: 20,
		fontWeight: "bold",
	},
});