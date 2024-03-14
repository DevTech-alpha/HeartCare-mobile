import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { User, getAuth } from "firebase/auth";
import Post from "../../model/Post";
import PostItem from "../../components/PostItem";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { propsStack } from "../../routes/Models";
import { Header } from "../../components/Header";
import { useTheme } from "../../hooks/ThemeProvider";
import PublishModalContent from "../../components/ModalPost";
import { AntDesign } from "@expo/vector-icons";
import NotificationItem from "../../components/NotificationItem";
import Notification from "../../model/Notification";

const Feed = () => {
  const { navigate } = useNavigation<propsStack>();
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mostrar, setMostrar] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const col = collection(db, "notifications");
      const queryNotifs = query(col, where("userId", "==", user.uid));
      const snapshotNotifs = await getDocs(queryNotifs);
      const dataNotifs = snapshotNotifs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      const notifsWithUserData = await Promise.all(
        dataNotifs.map(async (notif) => {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data() as {
            username: string;
            photo: string;
          };

          return {
            ...notif,
            username: userData.username,
            userPhoto: userData.photo,
          };
        })
      );

      setNotifications(notifsWithUserData);
    } finally {
      setRefreshing(false);
    }
  }, [user]);

  const fetchPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      const postsQuery = collection(db, "posts");
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      const postsWithUserData = await Promise.all(
        postsData.map(async (post) => {
          const userDoc = await getDoc(doc(db, "users", post.idpub));
          const userData = userDoc.data() as {
            username: string;
            photo: string;
          };

          return {
            ...post,
            username: userData.username,
            userPhoto: userData.photo,
          };
        })
      );

      setPosts(postsWithUserData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchNotifications();
  }, [fetchPosts, fetchNotifications]);

  const createNewPost = async (title: string, content: string) => {
    try {
      if (title.trim() !== "" && content.trim() !== "") {
        setLoading(true);

        const userDoc = await getDoc(doc(db, "users", user?.uid || ""));
        const userData = userDoc.data();

        if (!userData || Object.keys(userData).length === 0) {
          alert("Complete seu cadastro antes de fazer a publicação.");
          navigate("Perfil");
          return;
        }

        const postWithUserId = {
          title: title,
          content: content,
          idpub: user?.uid || "",
          likes: [] as string[],
        };

        const docRef = await addDoc(collection(db, "posts"), postWithUserId);

        // Adicione uma notificação ao Firestore
        await addDoc(collection(db, "notifications"), {
          type: "new_post",
          userId: user?.uid || "",
          postId: docRef.id,
        });

        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts as any);
        Alert.alert("Criado com sucesso seu Post!");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error adding post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async (title: string, content: string) => {
    try {
      const shareMessage = `${title}\n\n${content}`;

      const fileUri = FileSystem.cacheDirectory + "post.txt";
      await FileSystem.writeAsStringAsync(fileUri, shareMessage);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Erro ao compartilhar a publicação:", error);
    }
  };

  const onLikePress = async (postId: string) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        console.error("Post not found");
        return;
      }

      const postData = postDoc.data() as Post;

      const currentUserLiked = postData.likes?.includes(user?.uid || "");
      let updatedLikes: string[] = [];

      if (currentUserLiked) {
        updatedLikes =
          postData.likes?.filter((userId) => userId !== user?.uid) || [];
      } else {
        updatedLikes = [...(postData.likes || []), user?.uid || ""];
      }

      await updateDoc(postRef, { likes: updatedLikes });

      await addDoc(collection(db, "notifications"), {
        type: "new_like",
        userId: user?.uid || "",
        postId: postId,
      });

      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: updatedLikes };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const toggleChatVisibility = () => {
    setMostrar(!mostrar);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title={mostrar ? "HeartCare" : "Notificações"} />
      {mostrar ? (
        <TouchableOpacity
          style={styles.themeToggleButton}
          onPress={toggleChatVisibility}
        >
          <AntDesign name="notification" size={30} color={theme.COLORS.WHITE} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleChatVisibility}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
      {mostrar && (
        <>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostItem
                item={item}
                onLikePress={onLikePress}
                sharePost={sharePost}
                user={user}
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
            }
          />
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.COLORS.BUTTON }]}
            onPress={abrirModal}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <PublishModalContent
            fecharModal={fecharModal}
            visivel={modalVisivel}
            createNewPost={createNewPost}
            loading={loading}
          />
        </>
      )}
      {!mostrar && (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
          }
        />
      )}
    </View>
  );
};

export default Feed;
