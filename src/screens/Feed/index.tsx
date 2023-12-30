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
} from 'firebase/firestore';
import { db } from '../../components/firebase';
import { styles } from './styles';
import Post from '../../model/Post';
import { User, getAuth } from 'firebase/auth';

interface FeedProps { }

const Feed: React.FC<FeedProps> = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const postsCollection = collection(db, 'posts');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
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

  const renderPostItem = ({ item }: { item: Post }) => (
    <Animatable.View animation="fadeInUp" style={styles.postContainer}>
      <View style={styles.postHeader}>
        {item.image && <Image source={{ uri: item.image }} style={styles.userPhoto} />}
        <Text style={styles.username}>{item.username}</Text>
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postActions}>
        <Text>ID do Postador: {item.idpub}</Text>
      </View>

      <TouchableOpacity
        style={styles.actionIconContainer}
        onPress={() => toggleLike(item.id)}
      >
        <FontAwesome
          name="heart"
          size={20}
          color={likedPosts.includes(item.id) ? 'red' : '#333'}
        />
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

      <TouchableOpacity
        style={styles.saveIconContainer}
        onPress={() => deletePost(item.id)}
      >
        <FontAwesome name="trash" size={20} color={'#333'} />
      </TouchableOpacity>
    </Animatable.View>
  );

  const deletePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);

      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  };


  const createNewPost = async () => {
    try {
      if (newUsername.trim() !== '' && newTitle.trim() !== '' && newContent.trim() !== '') {
        setLoading(true);

        const postWithUserId = {
          username: newUsername,
          title: newTitle,
          content: newContent,
          image: '',
          idpub: user?.uid || '',
        };

        const docRef = await addDoc(postsCollection, postWithUserId);
        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts);
        setModalVisible(false);
        setNewUsername('');
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

  const mensage = () => {
    alert('clicou em mim');
  }
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>
        <Feather onPress={() => mensage()}
         name="menu" size={30} color="#fff" /> 𝓒𝓸𝓻𝓪𝓬𝓪𝓸 𝓣𝓮𝓬𝓱
        </Text>
      </Animatable.View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderPostItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={newUsername}
            onChangeText={(text) => setNewUsername(text)}
          />
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
          <Button title="Create Post" onPress={createNewPost} />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.addButtonText}>+</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
