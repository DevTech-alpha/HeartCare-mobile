import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles as feedStyles } from './styles';
import * as Animatable from 'react-native-animatable';
import PostItemProps from '../../@types/PostItemProfileProps';
import { useTheme } from '../../hooks/ThemeProvider';

const { theme } = useTheme();

const PostItem: React.FC<PostItemProps> = ({ item, userUid, deletePost }) => (
  <Animatable.View animation="fadeInUp" style={feedStyles.postContainer}>

    <Text style={feedStyles.postTitle}>{item.title}</Text>
    <Text style={feedStyles.postContent}>{item.content}</Text>


    {userUid === item.idpub && (
      <TouchableOpacity style={feedStyles.saveIconContainer} onPress={() => deletePost(item.id)}>
        <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>
    )}
  </Animatable.View>
);

export default PostItem;
