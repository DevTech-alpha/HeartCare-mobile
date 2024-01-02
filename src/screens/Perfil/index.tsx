import React, { useState, useEffect } from 'react';
import { Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, updateDoc, DocumentData, query, getDocs, where, deleteDoc } from 'firebase/firestore';
import { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { db } from '../../config/firebase';
import { styles } from './styles';
import ProfileImage from '../../components/ProfileImage';
import UserProfileForm from '../../components/UserProfileForm';
import PostItem from '../../components/PostItem';
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

    fetchUserData();
    fetchUserPosts();
  }, [user]);

  const handleChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response) {
        setPhoto(response);
      }
    });
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

      const userRef = doc(collection(db, 'users'), uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          username,
          name,
          lastName,
          dob,
          email,
          photo,
        });
      } else {
        await setDoc(userRef, {
          uid,
          username,
          name,
          lastName,
          dob,
          email,
          photo,
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
        // Confirm if the user wants to delete the post
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
                // User pressed the "Apagar" button
                await deleteDoc(postRef);

                const updatedPosts = posts.filter((post) => post.id !== postId);
                setPosts(updatedPosts);
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
          <Text style={styles.message}>Publicacoes</Text>
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
