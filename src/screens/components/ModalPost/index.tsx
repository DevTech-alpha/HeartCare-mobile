import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { styles } from "./styles";
import ModalPostProps from "../../../props/ModalPostProps";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import shadow from '../../../utils/styles/index';

export default function ModalPost({
  createNewPost,
  loading,
  fecharModal,
  visivel,
}: ModalPostProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { theme } = useTheme();

  const validateAndCreatePost = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      Alert.alert("Erro", "Preencha todos os campos.");
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
            { backgroundColor: theme.COLORS.BACKGROUND ,
              ...shadow.shadowOverlay
            },
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
            Nova Publicação
          </Text>
          <TextInput
            placeholder="Título"
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.POST_CONTENT,
              },
            ]}            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />
          <TextInput
            placeholder="Conteúdo"
            placeholderTextColor={theme.COLORS.POST_CONTENT}
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.POST_CONTENT,
              },
            ]}            value={newContent}
            onChangeText={(text) => setNewContent(text)}
          />
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: theme.COLORS.PRIMARY },
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
                style={[styles.textoBotao, { color: theme.COLORS.TEXT }]}
              >
                Postar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
