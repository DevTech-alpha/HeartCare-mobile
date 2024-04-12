import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getAuth, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  DocumentData,
  query,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "../../utils/firebase";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import UserProfileForm from "../../components/UserProfileForm";
import PostItem from "../../components/PostItemProfile";
import Post from "../../models/Post";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import ProfileImage from "../../components/ProfileImage";

function Profile() {
  const { signOut } = useAuth();
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const { theme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);

  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [hasMedicalCondition, setHasMedicalCondition] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);

  const storage = getStorage();

  const onRefresh = useCallback(() => {
    fetchUserPosts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        if (user) {
          const uid = user.uid;
          const userRef = doc(collection(db, "users"), uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as DocumentData;
            setUsername(userData.username || "");
            setName(userData.name || "");
            setLastName(userData.lastName || "");
            setDob(userData.dob || "");
            setPhoto(userData.photo);
            setBloodType(userData.bloodType || "");
            setNumber(userData.number || "");
            setGenero(userData.genero || "");
            setHasMedicalCondition(userData.hasMedicalCondition || "");
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      if (user) {
        const uid = user.uid;
        const postsQuery = query(
          collection(db, "posts"),
          where("idpub", "==", uid)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const userPostsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setUserPosts(userPostsData);
      }

      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permissão negada");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (
        result.canceled === false &&
        result.assets &&
        result.assets.length > 0
      ) {
        const supportedFormats = ["jpeg", "png", "jpg"];
        const uriParts = result.assets[0].uri.split(".");
        const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

        if (supportedFormats.includes(fileExtension)) {
          setPhoto(result.assets[0].uri);
        } else {
          Alert.alert("Formato de imagem inválido");
        }
      }
    } catch (error) {}
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        setLoading(false);
        return;
      }

      const uid = user.uid;

      if (
        !username ||
        !name ||
        !lastName ||
        !dob ||
        !email ||
        !bloodType ||
        !hasMedicalCondition ||
        !number ||
        !genero
      ) {
        Alert.alert("Erro", "Preencha todos os campos");
        setLoading(false);
        return;
      }

      if (!photo) {
        Alert.alert("Erro", "Adicione uma foto");
        setLoading(false);
        return;
      }

      let photoUrl = photo;

      if (!photo.startsWith("gs://fir-auth-9f9f7.appspot.com")) {
        const storageRef = ref(storage, `profile_photos/${uid}`);
        const response = await fetch(photo);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        photoUrl = await getDownloadURL(storageRef);
      }

      const userRef = doc(collection(db, "users"), uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          username,
          name,
          lastName,
          dob,
          number,
          email,
          photo: photoUrl,
          bloodType,
          hasMedicalCondition,
          genero,
        });
      } else {
        await setDoc(userRef, {
          uid,
          username,
          name,
          lastName,
          dob,
          number,
          email,
          photo: photoUrl,
          bloodType,
          hasMedicalCondition,
          genero,
        });
      }

      setLoading(false);
      setEditMode(false);
      Alert.alert("Alterado com sucesso");
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Erro",
        "Houve um erro ao salvar o perfil. Tente novamente mais tarde."
      );
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists() && postDoc.data()?.idpub === user?.uid) {
        Alert.alert(
          "Confirmação",
          "Deseja apagar esta publicação?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Apagar",
              onPress: async () => {
                await deleteDoc(postRef);
                const updatedPosts = posts.filter((post) => post.id !== postId);
                setPosts(updatedPosts);
                Alert.alert("Apagado com sucesso");
                fetchUserPosts();
              },
            },
          ],
          { cancelable: true }
        );
      } else {
      }
    } catch (error) {}
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDayMode(!isDayMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View>
        <Header title="Perfil" />
      </View>

      <ProfileImage photo={photo} onPress={handleChoosePhoto} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.PRIMARY }]}
        onPress={handleEditClick}
      >
        <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
          {editMode ? "Cancelar" : "Editar usuário"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.themeToggleButton,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
        onPress={handleToggleTheme}
      >
        <FontAwesome
          name={isDayMode ? "moon-o" : "sun-o"}
          size={25}
          color={theme.COLORS.ICON}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {editMode && (
          <UserProfileForm
            username={username}
            name={name}
            lastName={lastName}
            dob={dob}
            number={number}
            email={email}
            bloodType={bloodType}
            hasMedicalCondition={hasMedicalCondition}
            genero={genero}
            setUsername={setUsername}
            setName={setName}
            setLastName={setLastName}
            setDob={setDob}
            setNumber={setNumber}
            setBloodType={setBloodType}
            setHasMedicalCondition={setHasMedicalCondition}
            setGenero={setGenero}
            setEmail={setEmail}
            handleSaveProfile={handleSaveProfile}
            loading={loading}
          />
        )}

        <View
          style={[
            styles.userPostsContainer,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
        >
          <View style={styles.botoes}>
            <TouchableOpacity onPress={signOut}>
              <FontAwesome
                name="sign-out"
                size={30}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          </View>
          {userPosts.map((post) => (
            <PostItem
              key={post.id}
              item={post}
              toggleLike={() => {}}
              userUid={user?.uid || ""}
              deletePost={deletePost}
            />
          ))}
          {userPosts.length === 0 && (
            <Text style={[styles.messageNop, { color: theme.COLORS.TEXT }]}>
              Nenhuma publicação
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
