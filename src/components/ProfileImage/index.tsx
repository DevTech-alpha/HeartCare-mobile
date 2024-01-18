import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import ProfileImageProps from '../../@types/ProfileImageProps';

import { useTheme } from '../../hooks/ThemeProvider';

const { theme } = useTheme();

const ProfileImage: React.FC<ProfileImageProps> = ({ photo, onPress }) => (
  <TouchableOpacity style={styles.profileImageContainer} onPress={onPress}>
    {photo && photo !== '' ? (
      <Image source={{ uri: photo }} style={styles.profileImage} />
    ) : (
      <Image source={require('../../assets/user.png')}style={styles.profileImage} />

    )}
  </TouchableOpacity>
);

export default ProfileImage;
