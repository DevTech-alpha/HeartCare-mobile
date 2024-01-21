import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},
	textoModal: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
	},
	botaoSalvar: {
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
		marginBottom: 10,
	},
	botaoFechar: {
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
	},
	textoBotao: {
	},
})

export default styles
