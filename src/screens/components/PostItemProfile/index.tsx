import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import PostItemProfileProps from "../../../props/PostItemProfileProps";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import shadow from '../../../utils/styles/index';

export default function PostItemProfile({
  item,
  userUid,
  deletePost,
}: PostItemProfileProps) {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.postContainer,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD ,
          ...shadow.shadowOverlay
        },
      ]}
    >
      <Text style={[styles.postTitle, { color: theme.COLORS.POST_TITLE }]}>
        {item.title}
      </Text>
      <Text style={[styles.postContent, { color: theme.COLORS.POST_CONTENT }]}>
        {item.content}
      </Text>

      {userUid === item.idpub && (
        <TouchableOpacity
          style={styles.saveIconContainer}
          onPress={() => deletePost(item.id)}
        >
          <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}
