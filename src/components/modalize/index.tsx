import React, { useState } from "react"
import {
	TextInput,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	View,
	Alert,
} from "react-native"

import { styles } from "./styles"
import ModalizeProps from "../../types/ModalizeProps"
import { useTheme } from "../../hooks/ThemeProvider"

const ModalizeContent: React.FC<ModalizeProps> = ({ createNewPost, loading }) => {
	const [newTitle, setNewTitle] = useState("")
	const [newContent, setNewContent] = useState("")

	const { theme } = useTheme()

	function validateAndCreatePost() {
		if (newTitle.trim() === "" || newContent.trim() === "") {
			Alert.alert("Erro", "Por favor, preencha todos os campos.")
		} else {
			createNewPost(newTitle, newContent)
		}
	}
	return (
		<View style={[styles.container , {backgroundColor:theme.COLORS.BACKGROUND}]}>
			<TextInput
				placeholder="Título"
				style={[styles.input , {borderColor: theme.COLORS.PRIMARY}]}
				value={newTitle}
				onChangeText={(text) => setNewTitle(text)}
			/>
			<TextInput
				placeholder="Comentário"
				style={[styles.input , {borderColor: theme.COLORS.PRIMARY}]}
				value={newContent}
				onChangeText={(text) => setNewContent(text)}
			/>

			<TouchableOpacity
				style={[styles.actionButton , {backgroundColor: theme.COLORS.BUTTON}]}
				onPress={validateAndCreatePost}
				disabled={loading}>
				{loading ? (
					<ActivityIndicator size="small" color={theme.COLORS.WHITE} />
				) : (
					<Text style={styles.buttonText}>CRIAR POSTAGEM</Text>
				)}
			</TouchableOpacity>
		</View>
	)
}

export default ModalizeContent
