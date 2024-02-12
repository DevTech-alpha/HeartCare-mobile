import { StyleSheet, Platform } from "react-native"


export const styles = StyleSheet.create({
	contain: {
		marginTop: Platform.OS === 'android' ? 0 : 30,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: Platform.OS === 'android' ? 5 : 15,
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#800020",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	text: {
		color: "white",
		fontSize: 25,
	},
})
