import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, getAuth } from 'firebase/auth';
import Post from '../../model/Post';
import * as Animatable from 'react-native-animatable';
import PostItem from '../../components/PostItem';
import BottomSheetContent from '../../components/bottomSheet';
import { styles as feedStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { propsStack } from '../../routes/Models';
import { Header } from '../../components/Header';
import theme from '../../theme';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const { navigate, canGoBack } = useNavigation<propsStack>();
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [posts, setPosts] = useState<Post[]>([]);
  const [bottomSheetActive, setBottomSheetActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      const postsQuery = query(collection(db, 'posts'));
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      const postsWithUserData = await Promise.all(
        postsData.map(async (post) => {
          const userDoc = await getDoc(doc(db, 'users', post.idpub));
          const userData = userDoc.data() as { username: string; photo: string };

          return {
            ...post,
            username: userData.username,
            userPhoto: userData.photo,
          };
        })
      );

      setPosts(postsWithUserData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const toggleLike = (postId: string) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.includes(postId)
        ? prevLikedPosts.filter((id) => id !== postId)
        : [...prevLikedPosts, postId]
    );
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

  const createNewPost = async (title: string, content: string) => {
    try {
      if (title.trim() !== '' && content.trim() !== '') {
        setLoading(true);

        const userDoc = await getDoc(doc(db, 'users', user?.uid || ''));
        const userData = userDoc.data();

        if (!userData || Object.keys(userData).length === 0) {
          alert('Complete seu cadastro antes de fazer a publicação.');
          navigate('Perfil');
          return;
        }

        const postWithUserId = {
          title,
          content,
          idpub: user?.uid || '',
        };

        const docRef = await addDoc(collection(db, 'posts'), postWithUserId);
        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts as any);
        setBottomSheetActive(false);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Error adding post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async (title: string, content: string) => {
    try {
      const shareMessage = `${title}\n\n${content}`;

      const fileUri = FileSystem.cacheDirectory + 'post.txt';
      await FileSystem.writeAsStringAsync(fileUri, shareMessage);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Erro ao compartilhar a publicação:', error);
    }
  };

  const closeBottomSheet = () => {
    setBottomSheetActive(false);
  };

  return (
    <>
      <View>
        <Header title='𝓗𝓮𝓪𝓻𝓽𝓒𝓪𝓻𝓮' />
      </View>
      <GestureHandlerRootView style={feedStyles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              item={item}
              toggleLike={toggleLike}
              userUid={user?.uid || ''}
              deletePost={deletePost}
              sharePost={sharePost}
            />
          )}
          ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#fff" />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
          }
        />
        <TouchableOpacity style={feedStyles.addButton} onPress={() => setBottomSheetActive(true)}>
          <Text style={feedStyles.addButtonText}>+</Text>
        </TouchableOpacity>
        {bottomSheetActive && (
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            backgroundComponent={() => <View style={{ flex: 1, backgroundColor: theme.COLORS.OVERLEY }} />}
            snapPoints={['50%', '80%']}
            onChange={(index) => {
              if (index === 0) {
                setBottomSheetActive(true);
              }
            }}
          >
            <BottomSheetContent
              createNewPost={createNewPost}
              closeBottomSheet={closeBottomSheet}
              loading={loading}
            />
          </BottomSheet>
        )}
      </GestureHandlerRootView>
    </>
  );
};

export default Feed;
