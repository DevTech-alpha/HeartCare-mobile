import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
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
import { styles } from './styles';
import Post from '../../model/Post';
import { User, getAuth } from 'firebase/auth';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

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

  const renderPostItem = ({ item }: { item: Post & { username: string; userPhoto: string } }) => (
    <Animatable.View animation="fadeInUp" style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />
        <Text style={styles.username}>{item.username}</Text>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>

      <TouchableOpacity style={styles.actionIconContainer} onPress={() => toggleLike(item.id)}>
        <FontAwesome name="heart" size={20} color={likedPosts.includes(item.id) ? 'red' : '#333'} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionIconContainer}>
        <FontAwesome name="comment" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionIconContainer}>
        <FontAwesome name="send" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveIconContainer}>
        <FontAwesome name="bookmark" size={20} color="#333" />
      </TouchableOpacity>

      {user?.uid === item.idpub && (
      <TouchableOpacity style={styles.saveIconContainer} onPress={() => deletePost(item.id)}>
        <FontAwesome name="trash" size={20} color={'#333'} />
      </TouchableOpacity>
    )}
    </Animatable.View>
  );

  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
  
      if (postDoc.exists() && postDoc.data()?.idpub === user?.uid) {
        await deleteDoc(postRef);
  
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      } else {
        console.warn('User does not have permission to delete this post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  };

  const createNewPost = async () => {
    try {
      if (newTitle.trim() !== '' && newContent.trim() !== '') {
        setLoading(true);

        const postWithUserId = {
          title: newTitle,
          content: newContent,
          idpub: user?.uid || '',
        };

        const docRef = await addDoc(collection(db, 'posts'), postWithUserId);
        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts);
        setModalVisible(false);
        setNewTitle('');
        setNewContent('');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Error adding post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>
          <Feather name="menu" size={30} color="#fff" /> 𝓒𝓸𝓻𝓪𝓬𝓪𝓸 𝓣𝓮𝓬𝓱
        </Text>
      </Animatable.View>

      <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={renderPostItem} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
            />
            <TextInput
              placeholder="Content"
              style={styles.input}
              value={newContent}
              onChangeText={(text) => setNewContent(text)}
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={createNewPost}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Criar Post</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
