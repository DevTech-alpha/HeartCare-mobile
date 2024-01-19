import { StyleSheet } from "react-native"
// import { useTheme } from '../../hooks/ThemeProvider';

// // const { theme } = useTheme();

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: theme.COLORS.PRIMARY,
	},
	containerHeader: {
		marginTop: "14%",
		marginBottom: "8%",
		paddingStart: "5%",
	},
	message: {
		fontSize: 28,
		fontWeight: "bold",
		color: 'white',
	},
	containerForm: {
		flex: 1,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: "5%",
		paddingVertical: "5%",
	},
	title: {
		fontSize: 20,
		marginTop: 28,
	},
	input: {
		borderBottomWidth: 1,
		height: 40,
		marginBottom: 12,
		fontSize: 16,
	},
	button: {
		width: "100%",
		borderRadius: 20,
		paddingVertical: 12,
		marginTop: 14,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	togglePasswordButton: {
		marginTop: 10,
		alignSelf: "flex-end",
	},
	togglePasswordButtonText: {
		fontSize: 14,
	},
	backToLogin: {
		fontSize: 14,
		marginTop: 16,
		textAlign: "center",
	},
})
