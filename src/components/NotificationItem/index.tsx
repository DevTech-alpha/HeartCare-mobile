import React from "react";
import { View, Text, Image } from "react-native";
import { styles as feedStyles } from "./styles";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../hooks/ThemeProvider";
import NotificationItemProps from "../../props/NotificationItemProps";

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        feedStyles.postContainer,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <View style={feedStyles.postHeader}>
        <Image
          source={{ uri: item.userPhoto || "../../assets/user.png" }}
          style={feedStyles.userPhoto}
        />
      </View>
      <Text style={[feedStyles.postTitle, { color: theme.COLORS.POST_TITLE }]}>
        {item.type === "new_post"
          ? `Nova publicação: ${item.username}`
          : `Nova curtida: ${item.username}`}
      </Text>
    </Animatable.View>
  );
};

export default NotificationItem;
