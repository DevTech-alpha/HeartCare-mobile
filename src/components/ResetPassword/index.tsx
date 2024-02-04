import React from "react"
import { Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import * as Animatable from "react-native-animatable"
import { styles } from "./styles"
import ResetPasswordFormProps from "../../props/ResetPassowordProps"

import { useTheme } from "../../hooks/ThemeProvider"

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
	resetEmail,
	setResetEmail,
	handleResetPassword,
	loading,
	handleBackToLogin,
}) => {
	const { theme } = useTheme()

	return (
		<Animatable.View animation="fadeInUp" style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}>
			<Text style={[styles.title, { color: theme.COLORS.POST_TITLE }]}>Esqueceu a senha?</Text>
			<TextInput
				placeholder="Digite seu Email para recuperação"
				placeholderTextColor={theme.COLORS.TEXT}
				value={resetEmail}
        style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
				onChangeText={(text) => setResetEmail(text)}
			/>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
				onPress={handleResetPassword}
				disabled={loading}>
				{loading ? (
					<ActivityIndicator size="small" color={theme.COLORS.WHITE} />
				) : (
					<Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>Recuperar Senha</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonRegister} onPress={handleBackToLogin}>
				<Text style={[styles.registerText, { color: theme.COLORS.TEXT }]}>Voltar para o login</Text>
			</TouchableOpacity>
		</Animatable.View>
	)
}

export default ResetPasswordForm
