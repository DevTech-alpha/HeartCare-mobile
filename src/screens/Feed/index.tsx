import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ListRenderItem } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { styles } from './styles';
import Post, { data } from '../../model/Post';

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <Animatable.View animation="fadeInUp" style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.image }} style={styles.userPhoto} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postActions}>
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
      </View>

      <TouchableOpacity style={styles.saveIconContainer}>
        <FontAwesome name="bookmark" size={20} color="#333" />
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>𝓒𝓸𝓻𝓪𝓬𝓪𝓸 𝓣𝓮𝓬𝓱</Text>
        
      </Animatable.View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Feed;
