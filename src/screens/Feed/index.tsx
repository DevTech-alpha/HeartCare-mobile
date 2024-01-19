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
import { db } from '../../firebase/firebase';
import { User, getAuth } from 'firebase/auth';
import Post from '../../model/Post';
import PostItem from '../../components/PostItem';
import { styles as feedStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { propsStack } from '../../routes/Models';
import { Header } from '../../components/Header';
import { useTheme } from '../../hooks/ThemeProvider';

 
import { Modalize } from 'react-native-modalize';
import ModalizeContent from '../../components/modalize';

interface FeedProps { }

const Feed: React.FC<FeedProps> = () => {
  const { navigate } = useNavigation<propsStack>();
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const { theme } = useTheme();

  const [posts, setPosts] = useState<Post[]>([]);
  const [bottomSheetActive, setBottomSheetActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const modalizeRef = useRef<Modalize | null>(null);
  function onOpen() {
    modalizeRef.current?.open();
  }

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


  return (
    <>
      <GestureHandlerRootView style={[feedStyles.container,{backgroundColor:theme.COLORS.BACKGROUND}]}>
        <View>
          <Header title='𝓗𝓮𝓪𝓻𝓽𝓒𝓪𝓻𝓮' />
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              item={item}
              toggleLike={toggleLike}
              sharePost={sharePost}
            />
          )}
          ListFooterComponent={() => loading && <ActivityIndicator size="large" color={theme.COLORS.PRIMARY} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
          }
        />
        <TouchableOpacity style={[feedStyles.addButton,{backgroundColor: theme.COLORS.BUTTON}]} onPress={onOpen}>
          <Text style={[feedStyles.addButtonText, {color: theme.COLORS.BUTTON_TEXT}]}>+</Text>
        </TouchableOpacity>

       
        <Modalize
          ref={modalizeRef}
          snapPoint={220}
          modalHeight={220}
        >
          <ModalizeContent
            createNewPost={createNewPost}
            loading={loading}
          />
        </Modalize>

      </GestureHandlerRootView>
    </>
  );
};

export default Feed;
