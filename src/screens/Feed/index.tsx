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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
  const [newPost, setNewPost] = useState<Post>({
    id: '',
    idpub: '',
    username: '',
    title: '',
    content: '',
    image: '',
  });

  const postsCollection = collection(db, 'posts');

  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const renderItem = ({ item }: { item: Post }) => (
    <Animatable.View animation="fadeInUp" style={styles.postContainer}>
      <View style={styles.postHeader}>
       
        <Image source={{ uri: item.image }} style={styles.userPhoto} />
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


  const createNewPost = async () => {
    if (
      newPost.username.trim() !== '' &&
      newPost.title.trim() !== '' &&
      newPost.content.trim() !== ''
    ) {
      try {
        const postWithUserId = { ...newPost, idpub: user?.uid || '' };

        const docRef = await addDoc(postsCollection, postWithUserId);
        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts);
        setModalVisible(false);
        setNewPost({
          id: '',
          idpub: '',
          username: '',
          title: '',
          content: '',
          image: '',
        });
      } catch (error) {
        console.error('Error adding post:', error);
        alert('Error adding post. Check the console for more details.');
      }
    }
  };


  const deletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Check the console for more details.');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>𝓒𝓸𝓻𝓪𝓬𝓪𝓸 𝓣𝓮𝓬𝓱</Text>
      </Animatable.View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
            value={newPost.username}
            onChangeText={(text) =>
              setNewPost({ ...newPost, username: text })
            }
          />
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
          />
          <TextInput
            placeholder="Content"
            style={styles.input}
            value={newPost.content}
            onChangeText={(text) => setNewPost({ ...newPost, content: text })}
          />
          <Button title="Create Post" onPress={createNewPost} />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
