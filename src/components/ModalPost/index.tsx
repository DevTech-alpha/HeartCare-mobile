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
import ModalPostProps from "../../props/ModalPostProps";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const PublishModalContent: React.FC<ModalPostProps> = ({
  createNewPost,
  loading,
  fecharModal,
  visivel,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const { theme } = useTheme();
  const { language } = useLanguage();

  const validateAndCreatePost = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      Alert.alert(language.TEXTO.ERRO, language.TEXTO.PRENCHA_CAMPOS);
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
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme.COLORS.OVERLAY },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.COLORS.BACKGROUND_CARD },
          ]}
        >
          <View style={{ alignItems: "flex-end" }}>
            <AntDesign
              onPress={fecharModal}
              name="close"
              size={25}
              color={theme.COLORS.ICON}
            />
          </View>
          <Text style={[styles.textoModal, { color: theme.COLORS.POST_TITLE }]}>
            {language.TEXTO.NOVA_PUBLICACAO}
          </Text>
          <TextInput
            placeholder={language.TEXTO.TITULO}
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TextInput
            placeholder={language.TEXTO.CONTEUDO}
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[styles.input, { color: theme.COLORS.POST_CONTENT }]}
            value={newContent}
            onChangeText={(text) => setNewContent(text)}
          />

          <TouchableOpacity
            style={[
              styles.botaoSalvar,
              { backgroundColor: theme.COLORS.BUTTON },
            ]}
            onPress={validateAndCreatePost}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                color={theme.COLORS.BUTTON_TEXT}
              />
            ) : (
              <Text
                style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}
              >
                {language.TEXTO.POSTAR}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PublishModalContent;
