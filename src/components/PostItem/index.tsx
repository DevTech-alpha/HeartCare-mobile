import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles as feedStyles } from './styles';
import * as Animatable from 'react-native-animatable';
import PostItemProps from '../../props/PostItemProps';

const PostItem: React.FC<PostItemProps> = ({ item, toggleLike, userUid, deletePost }) => (
    <Animatable.View animation="fadeInUp" style={feedStyles.postContainer}>
      <View style={feedStyles.postHeader}>
        <Image source={{ uri: item.userPhoto }} style={feedStyles.userPhoto} />
        <Text style={feedStyles.username}>{item.username}</Text>
      </View>
  
      <Text style={feedStyles.postTitle}>{item.title}</Text>
      <Text style={feedStyles.postContent}>{item.content}</Text>
  
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={feedStyles.actionIconContainer} onPress={() => toggleLike(item.id)}>
          <FontAwesome name="heart" size={30} color="#333" />
        </TouchableOpacity>
  
        <TouchableOpacity style={feedStyles.actionIconContainer}>
          <FontAwesome name="comment" size={30} color="#333" />
        </TouchableOpacity>
  
        <TouchableOpacity style={feedStyles.actionIconContainer}>
          <FontAwesome name="send" size={30} color="#333" />
        </TouchableOpacity>
      </View>
  
      {userUid === item.idpub && (
        <TouchableOpacity style={feedStyles.saveIconContainer} onPress={() => deletePost(item.id)}>
          <FontAwesome name="trash" size={30} color={'#333'} />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
  
  

export default PostItem;


