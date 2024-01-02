import React, { useRef, useState, useEffect } from 'react';
import { Text, TouchableOpacity, FlatList, View, Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { collection, getDocs, addDoc, doc, deleteDoc, query, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, getAuth } from 'firebase/auth';
import Post from '../../model/Post';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import PostItem from '../../components/PostItem';
import BottomSheetContent from '../../components/bottomSheet';
import { styles as feedStyles } from './styles';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [posts, setPosts] = useState<Post[]>([]);
  const [bottomSheetActive, setBottomSheetActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
      }
    };

    fetchPosts();
  }, []);

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
  
  const createNewPost = async (title: string, content: string) => {
    try {
      if (title.trim() !== '' && content.trim() !== '') {
        setLoading(true);

        const postWithUserId = {
          title,
          content,
          idpub: user?.uid || '',
        };

        const docRef = await addDoc(collection(db, 'posts'), postWithUserId);
        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts);
        setBottomSheetActive(false);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Error adding post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeBottomSheet = () => {
    setBottomSheetActive(false);
  };

  return (
    <GestureHandlerRootView style={feedStyles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={feedStyles.containerHeader}>
        <Text style={feedStyles.message}>
          𝓒𝓸𝓻𝓪𝓬𝓪𝓸 𝓣𝓮𝓬𝓱
        </Text>
      </Animatable.View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            item={item}
            toggleLike={toggleLike}
            userUid={user?.uid || ''}
            deletePost={deletePost}
          />
        )}
      />

      {bottomSheetActive && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={['50%', '80%']}
          backgroundComponent={() => <View style={{ flex: 1, backgroundColor: '#fff' }} />}
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

      <TouchableOpacity style={feedStyles.addButton} onPress={() => setBottomSheetActive(true)}>
        <Text style={feedStyles.addButtonText}><Feather name="pen-tool" size={25} color="#fff" /></Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};












export default Feed;
