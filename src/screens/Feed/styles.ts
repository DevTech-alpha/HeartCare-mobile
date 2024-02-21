import { StyleSheet } from "react-native"



export const styles = StyleSheet.create({
	container: {
		flex: 1,

	},

	overlay: {
		flex: 1,
	},

	addButton: {
		position: "absolute",
		bottom: 24,
		right: 24,
		width: 60,
		height: 60,
		borderRadius: 30,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		elevation: 10,
	},

	addButtonText: {
		fontSize: 30,
		fontWeight: "bold",
	},

	message: {
		fontSize: 32,
		fontWeight: "bold",
	},
	stores: {
    height: 104,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingVertical: 10,
  },
  storesCard: {
    borderRadius: 50,
    marginRight: 14,
  },
  storesCardImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
    margin: 2,
  },
})
