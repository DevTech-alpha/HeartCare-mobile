import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles as feedStyles } from "./styles";
import * as Animatable from "react-native-animatable";
import PostItemProps from "../../props/PostItemProfileProps";
import { useTheme } from "../../hooks/ThemeProvider";

const PostItem: React.FC<PostItemProps> = ({ item, userUid, deletePost }) => {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        feedStyles.postContainer,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <Text style={[feedStyles.postTitle, { color: theme.COLORS.POST_TITLE }]}>
        {item.title}
      </Text>
      <Text
        style={[feedStyles.postContent, { color: theme.COLORS.POST_CONTENT }]}
      >
        {item.content}
      </Text>

      {userUid === item.idpub && (
        <TouchableOpacity
          style={feedStyles.saveIconContainer}
          onPress={() => deletePost(item.id)}
        >
          <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default PostItem;
