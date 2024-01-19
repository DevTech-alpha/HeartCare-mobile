import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 10,
	},
	input: {
		backgroundColor: "white",
		height: 40,
		marginBottom: 12,
		borderWidth: 2,
		marginTop: 12,
		fontSize: 16,
		paddingLeft: 5,
		borderRadius: 10,
	},
	actionButton: {
		width: "100%",
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "white",
		paddingVertical: 8,
		marginTop: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	roundedActionButton: {
		width: "100%",
		paddingVertical: 8,
		marginTop: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#FFF",
		fontSize: 15,
		fontWeight: "bold",
	},
})
