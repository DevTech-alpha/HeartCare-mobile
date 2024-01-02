// ProfileImage.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface ProfileImageProps {
  photo: string | null;
  onPress: () => void;
}

// ProfileImage.tsx
const ProfileImage: React.FC<ProfileImageProps> = ({ photo, onPress }) => (
  <TouchableOpacity style={styles.profileImageContainer} onPress={onPress}>
    {photo && photo !== '' ? (
      <Image source={{ uri: photo }} style={styles.profileImage} />
    ) : (
      <Text style={styles.choosePhotoText}>Escolha uma foto</Text>
    )}
  </TouchableOpacity>
);



export default ProfileImage;
