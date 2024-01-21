import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Alert,
  Modal,
} from "react-native";

import { styles } from "./styles";
import { useTheme } from "../../hooks/ThemeProvider";
import ModalPostProps from "../../props/ModalPostProps";

const PublishModalContent: React.FC<ModalPostProps> = ({
  createNewPost,
  loading,
  fecharModal,
  visivel,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const { theme } = useTheme();

  const validateAndCreatePost = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    } else {
      createNewPost(newTitle, newContent);
      fecharModal();
    }
  };

  useEffect(() => {
    if (!loading) {
      setNewTitle("");
      setNewContent("");
    }
  }, [loading]);

  return (
    <Modal visible={visivel} transparent animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.COLORS.OVERLAY }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}>
          <Text style={[styles.textoModal, { color: theme.COLORS.POST_TITLE }]}>
            Nova Publicação
          </Text>
          <TextInput
            placeholder="Título"
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TextInput
            placeholder="Conteúdo"
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
          />

          <TouchableOpacity
            style={[styles.botaoSalvar, { backgroundColor: theme.COLORS.BUTTON }]}
            onPress={validateAndCreatePost}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.COLORS.BUTTON_TEXT} />
            ) : (
              <Text style={[styles.textoBotao , {color: theme.COLORS.BUTTON_TEXT}]}>Postar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoFechar, { backgroundColor: theme.COLORS.BUTTON }]}
            onPress={fecharModal}
          >
            <Text style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PublishModalContent;
