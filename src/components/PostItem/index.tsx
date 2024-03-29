import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles as feedStyles } from "./styles";
import * as Animatable from "react-native-animatable";
import PostItemProps from "../../props/PostItemProps";
import { db } from "../../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useTheme } from "../../context/ThemeContext";

export default function PostItem({
  item,
  sharePost,
  onLikePress,
  user,
}: PostItemProps) {
  const { theme } = useTheme();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes.length);
  const [likers, setLikers] = useState<string[]>([]);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const isIPhone = Platform.OS === 'ios';

  useEffect(() => {
    setIsLiked(item.likes.includes(user?.uid || ""));
    setLikeCount(item.likes.length);
  }, [item.likes, user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setUserPhoto(userData?.photo || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchLikersData = async () => {
      try {
        const likersArray: string[] = [];
        const reversedLikes = item.likes.slice().reverse();
        const latestThreeLikes = reversedLikes.slice(0, 3);
        for (const userId of latestThreeLikes) {
          const userDoc = await getDoc(doc(db, "users", userId));
          const userData = userDoc.data();
          if (userData) {
            likersArray.push(userData.photo);
          }
        }
        setLikers(likersArray);
      } catch (error) {
        console.error("Error fetching likers data:", error);
      }
    };

    fetchUserData();
    fetchLikersData();
  }, [item.likes, user]);

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    onLikePress(item.id);
  };

  const renderLiker = ({ item }) => (
    <Image
      key={item.id}
      source={item ? { uri: item } : require("../../assets/user.png")}
      style={{ width: 30, height: 30, borderRadius: 15, marginRight: -5 }}
      {...(Platform.OS === "ios" && {
        defaultSource: require("../../assets/user.png"),
      })}
    />
  );

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        feedStyles.postContainer,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD },
      ]}
    >
      <View style={feedStyles.postHeader}>
        // Verifica se está no iPhone

// Renderiza o componente de imagem com base na plataforma
<Image
  source={
    userPhoto
      ? { uri: item.userPhoto }
      : isIPhone
        ? require("../../assets/user.png")
        : item.userPhoto
  }
  style={feedStyles.userPhoto}
/>
        <Text style={[feedStyles.username, { color: theme.COLORS.POST_TITLE }]}>
          {item.username}
        </Text>
      </View>

      <Text style={[feedStyles.postTitle, { color: theme.COLORS.POST_TITLE }]}>
        {item.title}
      </Text>
      <Text
        style={[feedStyles.postContent, { color: theme.COLORS.POST_CONTENT }]}
      >
        {item.content}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={feedStyles.actionIconContainer}
          onPress={toggleLike}
        >
          <FontAwesome
            name={isLiked ? "heart" : "heart-o"}
            size={30}
            color={isLiked ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
          />
          {likeCount > 0 && (
            <Text style={{ marginLeft: 10, color: theme.COLORS.ICON }}>
              {likeCount}
            </Text>
          )}
        </TouchableOpacity>

        {likers.length > 0 && (
          <FlatList
            data={likers}
            renderItem={renderLiker}
            keyExtractor={(item, index) => `liker_${index}`}
            horizontal
          />
        )}
      </View>

      <TouchableOpacity
        style={feedStyles.saveIconContainer}
        onPress={() => sharePost(item.title, item.content)}
      >
        <FontAwesome name="send-o" size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>
    </Animatable.View>
  );
}
