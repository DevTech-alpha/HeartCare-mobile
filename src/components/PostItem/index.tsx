import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles as feedStyles } from './styles';
import * as Animatable from 'react-native-animatable';
import PostItemProps from '../../@types/PostItemProps';
import theme from '../../theme';

const PostItem: React.FC<PostItemProps> = ({ item, toggleLike, userUid, deletePost, sharePost }) => (
  <Animatable.View animation="fadeInUp" style={feedStyles.postContainer}>
    <View style={feedStyles.postHeader}>
      <Image
        source={item.userPhoto ? { uri: item.userPhoto } : require('../../assets/user.png')}
        style={feedStyles.userPhoto}
        defaultSource={require('../../assets/user.png')}
      />
      <Text style={feedStyles.username}>{item.username}</Text>
    </View>

    <Text style={feedStyles.postTitle}>{item.title}</Text>
    <Text style={feedStyles.postContent}>{item.content}</Text>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={feedStyles.actionIconContainer} onPress={() => toggleLike(item.id)}>
        <FontAwesome name="heart" size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>

      <TouchableOpacity style={feedStyles.actionIconContainer}>
        <FontAwesome name="send" size={30} color={theme.COLORS.ICON} onPress={() => sharePost(item.title, item.content)} />
      </TouchableOpacity>
    </View>

    {userUid === item.idpub && (
      <TouchableOpacity style={feedStyles.saveIconContainer} onPress={() => deletePost(item.id)}>
        <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>
    )}
  </Animatable.View>
);

export default PostItem;
