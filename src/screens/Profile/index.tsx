import React, { useState, useEffect } from 'react';
import { Text, View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, updateDoc, DocumentData, query, getDocs, where, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db } from '../../config/firebase';
import * as ImagePicker from 'expo-image-picker'; // Import Expo's ImagePicker
import { styles } from './styles';
import ProfileImage from '../../components/ProfileImage';
import UserProfileForm from '../../components/UserProfileForm';
import PostItem from '../../components/PostItemProfile';
import Post from '../../model/Post';

const UserProfileScreen = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);

  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        if (user) {
          const uid = user.uid;
          const userRef = doc(collection(db, 'users'), uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as DocumentData;
            setUsername(userData.username || '');
            setName(userData.name || '');
            setLastName(userData.lastName || '');
            setDob(userData.dob || '');
            setPhoto(userData.photo);
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching user data:', error);
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
        const postsQuery = query(collection(db, 'posts'), where('idpub', '==', uid));
        const postsSnapshot = await getDocs(postsQuery);
        const userPostsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setUserPosts(userPostsData);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching user posts:', error);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert('Permissão negada para acessar a biblioteca de mídia.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.uri) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false);
        return;
      }

      const uid = user.uid;

      if (!username || !name || !lastName || !dob || !email) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
        setLoading(false);
        return;
      }

      let photoUrl = photo;

      if (photo && !photo.startsWith('gs://fir-auth-9f9f7.appspot.com')) {
        const storageRef = ref(storage, `profile_photos/${uid}`);
        await uploadString(storageRef, photo, 'data_url');
        photoUrl = await getDownloadURL(storageRef);
      }

      const userRef = doc(collection(db, 'users'), uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          username,
          name,
          lastName,
          dob,
          email,
          photo: photoUrl,
        });
      } else {
        await setDoc(userRef, {
          uid,
          username,
          name,
          lastName,
          dob,
          email,
          photo: photoUrl,
        });
      }

      setLoading(false);
      setEditMode(false);
      Alert.alert('Atualizado com sucesso');
    } catch (error) {
      setLoading(false);
      console.error('Erro ao salvar o perfil:', error);
      Alert.alert(
        'Erro',
        'Houve um erro ao salvar o perfil. Tente novamente mais tarde.'
      );
    }
  };


  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists() && postDoc.data()?.idpub === user?.uid) {
        Alert.alert(
          'Confirmação',
          'Tem certeza de que deseja apagar esta publicação?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Apagar',
              onPress: async () => {
                await deleteDoc(postRef);

                const updatedPosts = posts.filter((post) => post.id !== postId);
                setPosts(updatedPosts);
                fetchUserPosts();
              },
            },
          ],
          { cancelable: true }
        );
      } else {
        console.warn('User does not have permission to delete this post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={600} style={styles.containerHeader}>
        <Text style={styles.message}>Perfil</Text>
      </Animatable.View>

      <ProfileImage photo={photo} onPress={handleChoosePhoto} />

      <TouchableOpacity style={styles.button} onPress={handleEditClick}>
        <Text style={styles.buttonText}>{editMode ? 'Cancelar' : 'Editar Usuário'}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {editMode && (
          <UserProfileForm
            username={username}
            name={name}
            lastName={lastName}
            dob={dob}
            email={email}
            setUsername={setUsername}
            setName={setName}
            setLastName={setLastName}
            setDob={setDob}
            setEmail={setEmail}
            handleSaveProfile={handleSaveProfile}
            loading={loading}
          />
        )}

        <View style={styles.userPostsContainer}>
          <Text style={styles.message}>Publicações</Text>
          {userPosts.length === 0 ? (
            <Text style={styles.messageNop}>Não há publicações.</Text>
          ) : (
            userPosts.map((post) => (
              <PostItem
                key={post.id}
                item={{
                  ...post,
                }}
                toggleLike={() => { }}
                userUid={user?.uid || ''}
                deletePost={deletePost}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;
