import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	containerForm: {
		flex: 1,
		borderRadius: 25,
		paddingHorizontal: "5%",
		paddingVertical: "5%",
	},
	title: {
		fontSize: 16,
		marginTop: 20,
		paddingBottom: 5,
	},
	input: {
		borderBottomWidth: 1,
		height: 25,
		marginBottom: 5,
		fontSize: 16,
	},
	button: {
		width: "100%",
		borderRadius: 20,
		paddingVertical: 12,
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
})
